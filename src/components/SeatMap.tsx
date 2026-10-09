import React, { useState } from 'react';
import { 
  Zap, 
  Sun, 
  CheckCircle2, 
  UserCheck, 
  BookmarkCheck, 
  Layers, 
  ArrowRight, 
  X,
  Sparkles,
  Info
} from 'lucide-react';
import { Seat, FontSizeLevel } from '../types';

interface SeatMapProps {
  seats: Seat[];
  selectedSeatId: string | null;
  onSelectSeat: (seat: Seat) => void;
  mySeatId: string | null;
  currentUserId?: string;
  onOpenReservationModal: () => void;
  onClearSelectedSeat: () => void;
  fontSize: FontSizeLevel;
}

export const SeatMap: React.FC<SeatMapProps> = ({
  seats,
  selectedSeatId,
  onSelectSeat,
  mySeatId,
  currentUserId,
  onOpenReservationModal,
  onClearSelectedSeat,
  fontSize,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'floor1' | 'floor2' | 'floor3'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredSeats = seats.filter(seat => {
    if (activeTab === 'all') return true;
    return seat.zoneId === activeTab;
  });

  const selectedSeat = seats.find(s => s.id === selectedSeatId);

  // Dynamic font sizing classes
  const getHeaderSize = () => {
    if (fontSize === 'xlarge') return 'text-2xl font-black';
    if (fontSize === 'large') return 'text-xl font-black';
    return 'text-lg font-bold';
  };

  const getSeatNumSize = () => {
    if (fontSize === 'xlarge') return 'text-3xl font-black';
    if (fontSize === 'large') return 'text-2xl font-black';
    return 'text-xl font-black';
  };

  const getStatusTextSize = () => {
    if (fontSize === 'xlarge') return 'text-lg font-bold';
    if (fontSize === 'large') return 'text-base font-bold';
    return 'text-sm font-bold';
  };

  return (
    <div className="space-y-5">
      {/* Zone / Floor Filter Tabs with Big Touchable Buttons */}
      <div className="bg-white rounded-2xl border-2 border-slate-300 p-3 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2 px-1">
          <div className="flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-700" />
            <span className={`${getHeaderSize()} text-slate-900`}>
              층별 구역 선택
            </span>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              배치도 보기
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                viewMode === 'list' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              목록으로 보기
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`py-3 px-4 rounded-xl font-black text-base md:text-lg transition-all flex flex-col items-center justify-center gap-1 border-2 ${
              activeTab === 'all'
                ? 'bg-blue-600 border-blue-700 text-white shadow-md'
                : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>전체 구역</span>
            <span className={`text-xs ${activeTab === 'all' ? 'text-blue-100' : 'text-slate-500'}`}>
              총 {seats.length}석
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('floor1')}
            className={`py-3 px-4 rounded-xl font-black text-base md:text-lg transition-all flex flex-col items-center justify-center gap-1 border-2 ${
              activeTab === 'floor1'
                ? 'bg-blue-600 border-blue-700 text-white shadow-md'
                : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>1층 일반 열람실</span>
            <span className={`text-xs ${activeTab === 'floor1' ? 'text-blue-100' : 'text-slate-500'}`}>
              S001~S012 (12석)
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('floor2')}
            className={`py-3 px-4 rounded-xl font-black text-base md:text-lg transition-all flex flex-col items-center justify-center gap-1 border-2 ${
              activeTab === 'floor2'
                ? 'bg-blue-600 border-blue-700 text-white shadow-md'
                : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>2층 노트북실</span>
            <span className={`text-xs ${activeTab === 'floor2' ? 'text-blue-100' : 'text-slate-500'}`}>
              S013~S024 (12석)
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('floor3')}
            className={`py-3 px-4 rounded-xl font-black text-base md:text-lg transition-all flex flex-col items-center justify-center gap-1 border-2 ${
              activeTab === 'floor3'
                ? 'bg-blue-600 border-blue-700 text-white shadow-md'
                : 'bg-slate-50 border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>3층 집중 스터디존</span>
            <span className={`text-xs ${activeTab === 'floor3' ? 'text-blue-100' : 'text-slate-500'}`}>
              S025~S036 (12석)
            </span>
          </button>
        </div>
      </div>

      {/* Helpful instruction banner for seniors */}
      <div className="flex items-center gap-3 p-3.5 bg-blue-50 border-2 border-blue-200 rounded-xl text-blue-950">
        <Info className="w-6 h-6 text-blue-600 shrink-0" />
        <p className={`font-semibold ${getStatusTextSize()}`}>
          👉 <strong>원하는 자리를 콕 눌러주세요.</strong> 초록색으로 표시된 자리는 즉시 예약 가능합니다.
        </p>
      </div>

      {/* Seat Cards Grid / List View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
          {filteredSeats.map(seat => {
            const isMySeat = seat.id === mySeatId || (currentUserId && seat.currentUserId === currentUserId && seat.status === 'occupied');
            const isSelected = seat.id === selectedSeatId;
            const isAvailable = seat.status === 'available';
            const isOccupied = seat.status === 'occupied' && !isMySeat;

            // Determine styling classes based on senior-friendly contrast
            let cardClasses = '';
            let statusBadge = null;

            if (isMySeat) {
              cardClasses = 'bg-purple-100 border-4 border-purple-600 text-purple-950 shadow-md ring-4 ring-purple-200';
              statusBadge = (
                <div className="flex items-center gap-1 text-purple-800 font-black">
                  <BookmarkCheck className="w-5 h-5 text-purple-700" />
                  <span>내 좌석</span>
                </div>
              );
            } else if (isSelected) {
              cardClasses = 'bg-blue-100 border-4 border-blue-600 text-blue-950 shadow-lg ring-4 ring-blue-300 scale-[1.02] transition-transform';
              statusBadge = (
                <div className="flex items-center gap-1 text-blue-900 font-black">
                  <CheckCircle2 className="w-5 h-5 text-blue-700" />
                  <span>선택됨</span>
                </div>
              );
            } else if (isAvailable) {
              cardClasses = 'bg-emerald-50 hover:bg-emerald-100 active:scale-98 border-2 border-emerald-500 text-emerald-950 cursor-pointer shadow-sm hover:border-emerald-600';
              statusBadge = (
                <div className="flex items-center gap-1 text-emerald-700 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>이용 가능</span>
                </div>
              );
            } else {
              // Occupied
              cardClasses = 'bg-slate-100 border-2 border-slate-300 text-slate-500 cursor-not-allowed opacity-90';
              statusBadge = (
                <div className="flex items-center gap-1 text-slate-600 font-semibold">
                  <UserCheck className="w-5 h-5 text-slate-400" />
                  <span>이용 중</span>
                </div>
              );
            }

            return (
              <button
                key={seat.id}
                type="button"
                onClick={() => onSelectSeat(seat)}
                disabled={isOccupied}
                aria-pressed={isSelected}
                aria-label={`${seat.id}번 좌석 ${seat.zoneName} ${isMySeat ? '현재 내 좌석' : isAvailable ? '이용 가능' : '이용 중'}`}
                className={`relative rounded-2xl p-4 flex flex-col justify-between items-center text-center min-h-[140px] sm:min-h-[155px] transition-all select-none focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 ${cardClasses}`}
              >
                {/* Top: Badges like Power / Window */}
                <div className="w-full flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-500 tracking-tight">
                    {seat.id}
                  </span>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    {seat.hasPower && (
                      <span title="전원 콘센트 제공" className="p-1 rounded bg-amber-100 text-amber-800">
                        <Zap className="w-3.5 h-3.5" />
                      </span>
                    )}
                    {seat.hasWindow && (
                      <span title="창가 좌석" className="p-1 rounded bg-sky-100 text-sky-800">
                        <Sun className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>

                {/* Center: Big Seat Number */}
                <div className="my-auto py-1">
                  <div className={`${getSeatNumSize()} tracking-tight leading-none`}>
                    {seat.seatNumber}번
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {seat.zoneId === 'floor1' ? '1층' : seat.zoneId === 'floor2' ? '2층' : '3층'}
                  </div>
                </div>

                {/* Bottom: Clear Status Badge */}
                <div className={`mt-2 ${getStatusTextSize()}`}>
                  {statusBadge}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* List View Mode for extra readability */
        <div className="space-y-3">
          {filteredSeats.map(seat => {
            const isMySeat = seat.id === mySeatId || (currentUserId && seat.currentUserId === currentUserId && seat.status === 'occupied');
            const isSelected = seat.id === selectedSeatId;
            const isAvailable = seat.status === 'available';
            const isOccupied = seat.status === 'occupied' && !isMySeat;

            return (
              <div
                key={seat.id}
                className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 transition-all ${
                  isMySeat
                    ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-300'
                    : isSelected
                    ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-300'
                    : isAvailable
                    ? 'bg-white border-emerald-400 hover:border-emerald-600'
                    : 'bg-slate-50 border-slate-300 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl shrink-0 ${
                    isMySeat
                      ? 'bg-purple-600 text-white'
                      : isSelected
                      ? 'bg-blue-600 text-white'
                      : isAvailable
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-300 text-slate-700'
                  }`}>
                    {seat.seatNumber}번
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-lg text-slate-900">{seat.id}번 좌석</span>
                      <span className="text-sm font-semibold text-slate-600">({seat.zoneName})</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                      {seat.hasPower && <span className="flex items-center gap-0.5"><Zap className="w-3.5 h-3.5 text-amber-600" /> 콘센트 있음</span>}
                      {seat.hasWindow && <span className="flex items-center gap-0.5"><Sun className="w-3.5 h-3.5 text-sky-600" /> 창가 자리</span>}
                      {isOccupied && <span>이용자: {seat.currentUserName || '이용 중'}</span>}
                    </div>
                  </div>
                </div>

                <div>
                  {isAvailable ? (
                    <button
                      type="button"
                      onClick={() => onSelectSeat(seat)}
                      className={`w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-base transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                      }`}
                    >
                      {isSelected ? '선택 해제하기' : '이 자리 선택하기'}
                    </button>
                  ) : isMySeat ? (
                    <span className="inline-block px-4 py-2 bg-purple-100 text-purple-900 rounded-xl font-bold text-base">
                      내가 이용 중인 좌석
                    </span>
                  ) : (
                    <span className="inline-block px-4 py-2 bg-slate-200 text-slate-600 rounded-xl font-semibold text-base">
                      다른 이용자 사용 중
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Bottom Sticky Action Bar when a seat is selected */}
      {selectedSeat && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t-4 border-blue-600 shadow-2xl p-4 sm:p-5">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-slate-900">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow shrink-0">
                {selectedSeat.seatNumber}
              </div>
              <div>
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                  선택한 좌석
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedSeat.id}번 ({selectedSeat.zoneName})
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClearSelectedSeat}
                className="py-3.5 px-5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 rounded-xl font-bold text-base transition-all border border-slate-300 flex items-center justify-center gap-1.5"
              >
                <X className="w-5 h-5" />
                <span>선택 취소</span>
              </button>

              <button
                type="button"
                onClick={onOpenReservationModal}
                className="flex-1 sm:flex-none py-4 px-8 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white rounded-xl font-black text-xl shadow-lg transition-all flex items-center justify-center gap-2 ring-2 ring-blue-300"
              >
                <span>예약하기</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
