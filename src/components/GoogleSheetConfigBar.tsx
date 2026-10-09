import React, { useState } from 'react';
import { 
  Link2, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  RefreshCw, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp,
  FileSpreadsheet,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { FontSizeLevel } from '../types';
import { DEFAULT_GAS_URL, GOOGLE_SHEET_ID, GOOGLE_SHEET_URL } from '../services/gasApi';

interface GoogleSheetConfigBarProps {
  gasUrl: string;
  onUpdateGasUrl: (newUrl: string) => Promise<void>;
  isLive: boolean;
  fontSize: FontSizeLevel;
}

export const GoogleSheetConfigBar: React.FC<GoogleSheetConfigBarProps> = ({
  gasUrl,
  onUpdateGasUrl,
  isLive,
  fontSize,
}) => {
  const [inputUrl, setInputUrl] = useState(gasUrl);
  const [isTesting, setIsTesting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | 'info' | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showHelp, setShowHelp] = useState(false);

  // Sync state if prop changes
  React.useEffect(() => {
    setInputUrl(gasUrl);
  }, [gasUrl]);

  const handleSaveAndTest = async () => {
    if (!inputUrl.trim()) {
      setStatusType('error');
      setStatusMessage('배포 링크 URL을 입력해주세요.');
      return;
    }

    setIsTesting(true);
    setStatusType('info');
    setStatusMessage('구글 앱스 스크립트 서버와 연결 테스트 중...');

    try {
      await onUpdateGasUrl(inputUrl.trim());
      setStatusType('success');
      setStatusMessage('구글 시트 연동 성공! 이제 좌석 예약/퇴실 시 내 구글 시트에 실시간 기록됩니다.');
    } catch (err: any) {
      setStatusType('error');
      setStatusMessage(err?.message || '연결에 실패했습니다. 배포 URL을 다시 확인해주세요.');
    } finally {
      setIsTesting(false);
    }
  };

  const handleResetDefault = () => {
    setInputUrl(DEFAULT_GAS_URL);
    onUpdateGasUrl(DEFAULT_GAS_URL);
    setStatusType('info');
    setStatusMessage('기본 배포 링크로 복원되었습니다.');
  };

  // Font adjustments
  const isXlarge = fontSize === 'xlarge';

  return (
    <aside aria-label="구글 시트 연동 설정" className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-indigo-800/40 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5">
        {/* Compact summary bar with toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 shrink-0">
              <Link2 className="w-4 h-4" />
            </span>
            <div className="flex items-center flex-wrap gap-2">
              <span className="font-black text-sm sm:text-base text-white tracking-tight flex items-center gap-1.5">
                구글 시트 배포 링크 연동
              </span>
              <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-bold transition-colors ${
                isLive 
                  ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/40' 
                  : 'bg-amber-500/25 text-amber-300 border border-amber-400/40'
              }`}>
                {isLive ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>실시간 연동 중</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                    <span>연동 대기 / 로컬 보관</span>
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Google Sheet Button */}
            <a
              href={GOOGLE_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow transition-all active:scale-95"
              title="새 창에서 내 구글 시트(1I1L2...) 열기"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>내 구글 시트 열기</span>
              <ExternalLink className="w-3 h-3 opacity-75" />
            </a>

            {/* Collapse/Expand Toggle */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-colors"
              aria-label={isExpanded ? '설정창 접기' : '설정창 펼치기'}
            >
              <span>{isExpanded ? '접기' : '링크 설정'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Expanded Controls Area */}
        {isExpanded && (
          <div className="mt-3 pt-3 border-t border-slate-800/80">
            <div className="flex flex-col md:flex-row gap-2.5 items-stretch md:items-center">
              {/* Input field */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/AKfycb.../exec (배포 링크를 붙여넣으세요)"
                  className="w-full bg-slate-950/90 text-white placeholder-slate-400 border-2 border-indigo-500/50 focus:border-indigo-400 rounded-xl px-3.5 py-2 text-sm sm:text-base font-mono focus:outline-none focus:ring-2 focus:ring-indigo-400/40 transition-all shadow-inner"
                  aria-label="Google Apps Script 배포 URL"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleSaveAndTest}
                  disabled={isTesting}
                  className="flex-1 md:flex-none px-4 py-2 bg-blue-600 hover:bg-blue-500 active:scale-95 disabled:opacity-50 text-white rounded-xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  title="입력한 배포 링크로 즉시 연결 및 구글 시트 동기화"
                >
                  <RefreshCw className={`w-4 h-4 ${isTesting ? 'animate-spin' : ''}`} />
                  <span>{isTesting ? '연결 확인 중...' : '연동 적용 및 테스트'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  title="기본 배포 링크로 복원"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="hidden sm:inline">기본값</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowHelp(!showHelp)}
                  className="p-2 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  title="연동 방법 안내"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Status Message feedback */}
            {statusMessage && (
              <div className={`mt-2.5 p-2.5 rounded-xl border flex items-center gap-2 text-xs sm:text-sm font-semibold animate-fadeIn ${
                statusType === 'success' 
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200' 
                  : statusType === 'error'
                  ? 'bg-rose-950/60 border-rose-500/50 text-rose-200'
                  : 'bg-blue-950/60 border-blue-500/50 text-blue-200'
              }`}>
                {statusType === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <span className="flex-1">{statusMessage}</span>
                <button
                  type="button"
                  onClick={() => setStatusMessage(null)}
                  className="text-white/60 hover:text-white text-xs px-1"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Help & Details toggle */}
            {showHelp && (
              <div className="mt-2.5 p-3 rounded-xl bg-slate-950/80 border border-slate-700/80 text-xs sm:text-sm text-slate-300 space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-white text-sm">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>구글 시트 연동 작동 원리 안내</span>
                </div>
                <ul className="list-disc list-inside space-y-1 text-slate-300 pl-1">
                  <li>
                    현재 연동 대상 스프레드시트 ID: <span className="font-mono text-emerald-300 font-bold bg-slate-900 px-1 py-0.5 rounded">{GOOGLE_SHEET_ID}</span>
                  </li>
                  <li>
                    Apps Script에서 <strong>[배포] → [새 배포] → 웹 앱</strong>으로 생성하신 <strong>웹 앱 URL (`.../exec`)</strong>을 위 입력창에 넣고 <strong>[연동 적용 및 테스트]</strong>를 누르시면 됩니다.
                  </li>
                  <li>
                    여기 AI Studio에서 <strong>자리 예약</strong>을 하거나 <strong>퇴실</strong>을 누르면, 이 배포 링크를 통해 사용자 이름과 회원번호, 예약시간이 <strong>내 구글 시트로 즉시 전송되어 저장</strong>됩니다.
                  </li>
                  <li>
                    우측 상단 <strong>[내 구글 시트 열기]</strong>를 누르시면 시트에 예약 내역이 실시간으로 들어오는 것을 바로 확인하실 수 있습니다.
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
