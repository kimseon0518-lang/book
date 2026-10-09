import React from 'react';
import { Seat, User, FontSizeLevel } from '../types';
import { CheckCircle2, X, Clock, MapPin, User as UserIcon, AlertCircle } from 'lucide-react';
import { formatKoreanDateTime, formatTimeAfterHours } from '../services/gasApi';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  seat: Seat | null;
  user: User | null;
  onConfirm: () => void;
  isSubmitting: boolean;
  fontSize: FontSizeLevel;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  seat,
  user,
  onConfirm,
  isSubmitting,
  fontSize,
}) => {
  if (!isOpen || !seat || !user) return null;

  const startTime = formatKoreanDateTime();
  const endTime = formatTimeAfterHours(4);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-blue-600 text-slate-900">
        {/* Header */}
        <div className="text-center pb-4 border-b border-slate-200">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 id="modal-title" className="text-2xl sm:text-3xl font-black text-slate-900">
            좌석 예약 확인
          </h2>
          <p className="text-slate-600 font-medium text-base mt-1">
            선택하신 좌석 정보를 확인해주세요.
          </p>
        </div>

        {/* Seat details */}
        <div className="py-5 space-y-3.5">
          <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-blue-700">예약 좌석</span>
              <div className="text-2xl font-black text-blue-950">
                {seat.id}번 좌석
              </div>
              <div className="text-sm font-semibold text-blue-800 flex items-center gap-1 mt-0.5">
                <MapPin className="w-4 h-4" />
                {seat.zoneName}
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-emerald-600 text-white rounded-lg text-sm font-bold">
                이용 가능
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-slate-700">
            <div className="flex items-center justify-between text-base">
              <span className="flex items-center gap-1.5 font-semibold text-slate-500">
                <UserIcon className="w-4 h-4 text-slate-600" /> 예약자
              </span>
              <strong className="text-slate-900 font-black">
                {user.userName} ({user.userId})
              </strong>
            </div>

            <div className="flex items-center justify-between text-base">
              <span className="flex items-center gap-1.5 font-semibold text-slate-500">
                <Clock className="w-4 h-4 text-slate-600" /> 기본 이용 시간
              </span>
              <strong className="text-slate-900 font-bold">4시간</strong>
            </div>

            <div className="flex items-center justify-between text-base">
              <span className="text-slate-500 font-semibold">입실 예정</span>
              <span className="text-slate-900 font-medium">{startTime}</span>
            </div>

            <div className="flex items-center justify-between text-base">
              <span className="text-slate-500 font-semibold">퇴실 예정</span>
              <span className="text-slate-900 font-medium">{endTime}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <span>
              1인당 1개 좌석만 예약할 수 있습니다. 이용을 마친 후에는 꼭 <strong>퇴실하기</strong>를 눌러주세요.
            </span>
          </div>
        </div>

        {/* Big Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="sm:w-1/3 py-4 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-lg transition-all border border-slate-300"
          >
            취소하기
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="sm:w-2/3 py-4 px-6 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-2xl font-black text-xl shadow-lg transition-all flex items-center justify-center gap-2 ring-2 ring-blue-300 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>처리 중...</span>
            ) : (
              <>
                <CheckCircle2 className="w-6 h-6" />
                <span>네, 예약할게요!</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
