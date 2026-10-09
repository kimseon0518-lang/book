import React from 'react';
import { Seat, Reservation, FontSizeLevel } from '../types';
import { DoorClosed, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  seat: Seat | null;
  reservation: Reservation | null;
  onConfirm: () => void;
  isSubmitting: boolean;
  fontSize: FontSizeLevel;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  seat,
  reservation,
  onConfirm,
  isSubmitting,
  fontSize,
}) => {
  if (!isOpen) return null;

  const seatId = seat?.id || reservation?.seatId || 'S002';
  const zoneName = seat?.zoneName || '1층 일반 열람실';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-rose-500 text-slate-900">
        <div className="text-center pb-4 border-b border-slate-200">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-3">
            <DoorClosed className="w-10 h-10" />
          </div>
          <h2 id="checkout-modal-title" className="text-2xl sm:text-3xl font-black text-slate-900">
            퇴실 처리 확인
          </h2>
          <p className="text-slate-600 font-medium text-base mt-1">
            이용 중인 자리를 반납하시겠습니까?
          </p>
        </div>

        <div className="py-5 space-y-4">
          <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-200 text-center">
            <span className="text-xs font-bold text-rose-700">반납할 좌석</span>
            <div className="text-3xl font-black text-rose-950 mt-0.5">
              {seatId}번 좌석
            </div>
            <div className="text-sm font-semibold text-rose-800 mt-1">
              {zoneName}
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-3.5 bg-slate-100 rounded-xl text-slate-700 text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              퇴실 처리 시 좌석은 즉시 <strong>'이용 가능'</strong> 상태로 바뀌어 다른 분들이 예약할 수 있게 됩니다. 소지품을 모두 챙기셨는지 확인해주세요.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="sm:w-1/3 py-4 px-5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-lg transition-all border border-slate-300"
          >
            계속 이용하기
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="sm:w-2/3 py-4 px-6 bg-rose-600 hover:bg-rose-700 active:scale-98 text-white rounded-2xl font-black text-xl shadow-lg transition-all flex items-center justify-center gap-2 ring-2 ring-rose-300 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>처리 중...</span>
            ) : (
              <>
                <CheckCircle2 className="w-6 h-6" />
                <span>네, 퇴실할게요</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
