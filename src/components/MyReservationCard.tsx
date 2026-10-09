import React from 'react';
import { 
  BookmarkCheck, 
  Clock, 
  DoorClosed, 
  MapPin, 
  Zap, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Seat, Reservation, FontSizeLevel } from '../types';

interface MyReservationCardProps {
  mySeat: Seat | null;
  reservation: Reservation | null;
  onOpenCheckoutModal: () => void;
  fontSize: FontSizeLevel;
}

export const MyReservationCard: React.FC<MyReservationCardProps> = ({
  mySeat,
  reservation,
  onOpenCheckoutModal,
  fontSize,
}) => {
  const isLarge = fontSize === 'large' || fontSize === 'xlarge';

  if (!mySeat && !reservation) {
    return (
      <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-5 mb-6 text-center">
        <div className="flex items-center justify-center gap-2 text-slate-600 mb-1">
          <BookmarkCheck className="w-6 h-6 text-slate-400" />
          <h2 className={`${isLarge ? 'text-xl' : 'text-lg'} font-bold`}>
            현재 이용 중인 좌석이 없습니다
          </h2>
        </div>
        <p className={`${isLarge ? 'text-base' : 'text-sm'} text-slate-500`}>
          아래 좌석 배치도에서 초록색 <span className="font-bold text-emerald-700">[이용 가능]</span> 좌석을 누른 후 예약하기를 진행해주세요.
        </p>
      </div>
    );
  }

  const seatId = mySeat?.id || reservation?.seatId || 'S002';
  const zoneName = mySeat?.zoneName || '1층 일반 열람실';
  const startTime = reservation?.startTime || mySeat?.startTime || '2026-10-09 09:00';
  const endTime = reservation?.endTime || mySeat?.endTime || '2026-10-09 13:00';

  return (
    <div 
      className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-2xl p-5 sm:p-6 shadow-lg mb-6 border-2 border-purple-400"
      role="region"
      aria-label="현재 이용 중인 좌석 정보"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        {/* Left: Seat info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-purple-300 text-purple-950 font-black text-sm tracking-wide">
              현재 이용 중인 내 자리
            </span>
            <span className="text-purple-200 text-sm flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              오늘의 이용권
            </span>
          </div>

          <div className="flex items-baseline gap-3 flex-wrap">
            <h2 className={`${fontSize === 'xlarge' ? 'text-4xl' : fontSize === 'large' ? 'text-3xl' : 'text-2xl'} font-black text-amber-300 tracking-tight`}>
              {seatId}번 좌석
            </h2>
            <div className="flex items-center gap-1.5 text-slate-200 text-lg font-bold">
              <MapPin className="w-5 h-5 text-indigo-300" />
              <span>{zoneName}</span>
            </div>
          </div>

          {/* Time metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-slate-200">
            <div className="flex items-center gap-2 bg-purple-950/60 rounded-xl px-3.5 py-2 border border-purple-700/50">
              <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className={`${isLarge ? 'text-base' : 'text-sm'}`}>
                입실 시각: <strong className="text-white font-black">{startTime}</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 bg-purple-950/60 rounded-xl px-3.5 py-2 border border-purple-700/50">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <span className={`${isLarge ? 'text-base' : 'text-sm'}`}>
                퇴실 예정: <strong className="text-white font-black">{endTime}</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Big Checkout button */}
        <div className="lg:min-w-[220px] flex flex-col gap-2 pt-2 lg:pt-0 border-t border-purple-800 lg:border-0">
          <button
            type="button"
            onClick={onOpenCheckoutModal}
            className="w-full py-4 px-6 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 active:scale-98 text-white rounded-xl font-black text-xl shadow-md flex items-center justify-center gap-2 transition-all border-2 border-rose-300/50 hover:shadow-rose-900/40"
            aria-label={`${seatId}번 좌석 퇴실하기`}
          >
            <DoorClosed className="w-7 h-7" />
            <span>퇴실하기 (자리 비우기)</span>
          </button>
          <p className="text-xs text-purple-200 text-center font-medium">
            * 자리를 비우실 때는 꼭 퇴실 버튼을 눌러주세요.
          </p>
        </div>
      </div>
    </div>
  );
};
