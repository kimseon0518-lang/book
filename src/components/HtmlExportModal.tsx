import React, { useState } from 'react';
import { Copy, Check, Download, X, Code, FileText, CheckCircle2 } from 'lucide-react';
import { GAS_URL } from '../services/gasApi';

interface HtmlExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HtmlExportModal: React.FC<HtmlExportModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'gas'>('html');
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedGas, setCopiedGas] = useState(false);

  if (!isOpen) return null;

  const gasScriptCode = `// ========================================================
// [도서관 좌석 예약] Google Apps Script - Code.gs
// (어떤 시트 탭 이름이든 오류 없이 100% 자동 탐색)
// ========================================================

// 제공해주신 스프레드시트 ID
var SPREADSHEET_ID = "1I1L2-3oJp9M6gO_1NE9c9fG1uM47nYgqyUY4meVkQlQ";

function getSeatSheet() {
  var ss;
  try {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch(e) {
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  if (!ss) {
    throw new Error("스프레드시트를 열 수 없습니다. 시트 ID를 확인해주세요.");
  }

  return ss.getSheetByName("도서관 좌석 예약") || 
         ss.getSheetByName("시트1") || 
         ss.getSheetByName("Sheet1") || 
         ss.getSheets()[0];
}

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "";
  
  if (action === "getSeats") {
    return handleGetSeats();
  } else if (action === "getMyReservation") {
    var userId = (e && e.parameter) ? e.parameter.userId : "";
    return handleGetMyReservation(userId);
  } else if (action === "reserveSeat") {
    return handleReserveSeat(e.parameter);
  } else if (action === "cancelSeat") {
    return handleCancelSeat(e.parameter);
  }
  
  // 브라우저에서 직접 URL 접속 시 친절한 안내 메시지 반환
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: "도서관 좌석 예약 API 서버가 정상 작동 중입니다. (action=getSeats 사용 가능)"
  })).setMimeType(ContentService.MimeType.JSON);
}

// POST 요청 처리: reserveSeat 또는 cancelSeat
function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }
    
    var action = data.action || "";
    if (action === "reserveSeat") {
      return handleReserveSeat(data);
    } else if (action === "cancelSeat") {
      return handleCancelSeat(data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: "지원하지 않는 action 입니다."
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// 전체 좌석 현황 조회
function handleGetSeats() {
  var sheet = getSeatSheet();
  var rows = sheet.getDataRange().getValues();
  var seats = [];
  
  // 헤더 행(2행) 이후 데이터 읽기
  for (var i = 2; i < rows.length; i++) {
    var row = rows[i];
    if (!row[1]) continue; // seatId 없는 행 스킵
    seats.push({
      reservationId: String(row[0] || ""),
      seatId: String(row[1] || ""),
      userId: String(row[2] || ""),
      userName: String(row[3] || ""),
      startTime: String(row[4] || ""),
      endTime: String(row[5] || ""),
      status: String(row[6] || "이용가능")
    });
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    seats: seats
  })).setMimeType(ContentService.MimeType.JSON);
}

// 내 예약 정보 조회
function handleGetMyReservation(userId) {
  var sheet = getSeatSheet();
  var rows = sheet.getDataRange().getValues();
  
  for (var i = 2; i < rows.length; i++) {
    var row = rows[i];
    if (String(row[2]) === String(userId) && String(row[6]) === "이용중") {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        reservationId: String(row[0]),
        seatId: String(row[1]),
        userId: String(row[2]),
        userName: String(row[3]),
        startTime: String(row[4]),
        endTime: String(row[5]),
        status: "이용중"
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    reservation: null
  })).setMimeType(ContentService.MimeType.JSON);
}

// 좌석 예약 처리
function handleReserveSeat(data) {
  var sheet = getSeatSheet();
  var rows = sheet.getDataRange().getValues();
  var now = new Date();
  var startTime = Utilities.formatDate(now, "Asia/Seoul", "yyyy-MM-dd HH:mm");
  var endTime = Utilities.formatDate(new Date(now.getTime() + 4 * 3600 * 1000), "Asia/Seoul", "yyyy-MM-dd HH:mm");
  var resId = "R" + String(now.getTime()).slice(-4);
  
  // 기존 행 업데이트 또는 신규 행 추가
  var found = false;
  for (var i = 2; i < rows.length; i++) {
    if (String(rows[i][1]) === String(data.seatId)) {
      sheet.getRange(i + 1, 1).setValue(resId);
      sheet.getRange(i + 1, 3).setValue(data.userId);
      sheet.getRange(i + 1, 4).setValue(data.userName);
      sheet.getRange(i + 1, 5).setValue(startTime);
      sheet.getRange(i + 1, 6).setValue(endTime);
      sheet.getRange(i + 1, 7).setValue("이용중");
      found = true;
      break;
    }
  }
  
  if (!found) {
    sheet.appendRow([resId, data.seatId, data.userId, data.userName, startTime, endTime, "이용중"]);
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: data.seatId + "번 좌석 예약이 완료되었습니다.",
    reservationId: resId
  })).setMimeType(ContentService.MimeType.JSON);
}

// 퇴실(예약 취소) 처리
function handleCancelSeat(data) {
  var sheet = getSeatSheet();
  var rows = sheet.getDataRange().getValues();
  
  for (var i = 2; i < rows.length; i++) {
    if (String(rows[i][1]) === String(data.seatId)) {
      sheet.getRange(i + 1, 3).setValue("");
      sheet.getRange(i + 1, 4).setValue("");
      sheet.getRange(i + 1, 5).setValue("");
      sheet.getRange(i + 1, 6).setValue("");
      sheet.getRange(i + 1, 7).setValue("이용가능");
      break;
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify({
    status: "success",
    message: data.seatId + "번 좌석 퇴실 처리가 완료되었습니다."
  })).setMimeType(ContentService.MimeType.JSON);
}`;

  const standaloneHtmlCode = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>행복 도서관 좌석 예약 시스템</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css">
  <style>
    body { font-family: "Pretendard Variable", Pretendard, system-ui, sans-serif; font-size: 18px; }
  </style>
</head>
<body class="bg-slate-100 text-slate-900 min-h-screen">
  <!-- 전체 단일 HTML 코드는 public/library_seat_reservation.html 참조 -->
</body>
</html>`;

  const handleCopyGas = () => {
    navigator.clipboard.writeText(gasScriptCode);
    setCopiedGas(true);
    setTimeout(() => setCopiedGas(false), 2000);
  };

  const handleDownloadHtml = () => {
    window.open('/library_seat_reservation.html', '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border-4 border-slate-300 text-slate-900 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div>
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>📚 도서관 좌석 예약 배포 & GAS 연동 가이드</span>
            </h3>
            <p className="text-sm text-slate-500 mt-0.5">
              단일 HTML 파일 다운로드 및 Google Apps Script 'getDataRange' 에러 해결 코드
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 font-bold"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex gap-2 pt-4 pb-2">
          <button
            type="button"
            onClick={() => setActiveTab('html')}
            className={`py-2.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center gap-1.5 ${
              activeTab === 'html'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>단일 HTML 파일 받기</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gas')}
            className={`py-2.5 px-4 rounded-xl font-bold text-sm transition-all flex items-center gap-1.5 ${
              activeTab === 'gas'
                ? 'bg-blue-600 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Google Apps Script (Code.gs) 수정 코드</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-3 space-y-3 overflow-y-auto flex-1 text-slate-700">
          {activeTab === 'html' ? (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-900 text-sm leading-relaxed">
                ✅ <strong>단일 HTML 파일 준비 완료:</strong><br />
                HTML, CSS, JavaScript 및 구글 시트 연동 로직이 <code>/library_seat_reservation.html</code> 파일 하나에 모두 통합되어 있습니다. 브라우저에서 바로 더블클릭으로 실행할 수 있습니다.
              </div>

              <div className="p-6 bg-slate-50 rounded-2xl border-2 border-slate-200 text-center space-y-3">
                <div className="text-lg font-black text-slate-800">
                  단일 index.html 파일 다운로드 및 열기
                </div>
                <p className="text-sm text-slate-500">
                  아래 버튼을 누르면 브라우저에서 단일 파일로 바로 열리거나 저장할 수 있습니다.
                </p>
                <button
                  type="button"
                  onClick={handleDownloadHtml}
                  className="py-4 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xl rounded-2xl shadow-lg transition-all inline-flex items-center gap-2 active:scale-95"
                >
                  <Download className="w-6 h-6" />
                  <span>단일 HTML 파일 열기 / 다운로드</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl text-amber-950 text-sm leading-relaxed">
                <strong>💡 에러 원인 해결:</strong><br />
                구글 스프레드시트에서 <code>Cannot read properties of null (reading 'getDataRange')</code> 오류가 발생한 이유는 스크립트가 시트 탭 이름('좌석' 등)을 찾지 못했기 때문입니다.<br />
                아래 코드를 복사하여 Google Apps Script <code>Code.gs</code>에 붙여넣으시면 시트 탭 이름과 무관하게 첫 번째 시트를 자동 인식하여 정상 작동합니다!
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="font-bold text-sm text-slate-800">Code.gs 붙여넣기용 소스 코드:</span>
                <button
                  type="button"
                  onClick={handleCopyGas}
                  className="py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1"
                >
                  {copiedGas ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedGas ? '복사 완료!' : 'Code.gs 코드 복사'}</span>
                </button>
              </div>

              <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs overflow-x-auto max-h-72 leading-relaxed">
                {gasScriptCode}
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="py-3 px-6 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-base transition-all"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
