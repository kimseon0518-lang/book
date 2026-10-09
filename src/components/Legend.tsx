import React from 'react';
import { CheckCircle2, UserCheck, Hand, BookmarkCheck } from 'lucide-react';
import { FontSizeLevel } from '../types';

interface LegendProps {
  availableCount: number;
  occupiedCount: number;
  totalCount: number;
  hasSelectedSeat: boolean;
  hasMySeat: boolean;
  fontSize: FontSizeLevel;
}

export const Legend: React.FC<LegendProps> = ({
  availableCount,
  occupiedCount,
  totalCount,
  hasSelectedSeat,
  hasMySeat,
  fontSize,
}) => {
  const getSubtextSize = () => {
    if (fontSize === 'xlarge') return 'text-lg';
    if (fontSize === 'large') return 'text-base';
    return 'text-sm';
  };

  const getLabelSize = () => {
    if (fontSize === 'xlarge') return 'text-xl font-bold';
    if (fontSize === 'large') return 'text-lg font-bold';
    return 'text-base font-bold';
  };

  return (
    <div 
      className="bg-white rounded-2xl border-2 border-slate-300 p-5 shadow-sm mb-6"
      role="region"
      aria-label="좌석 상태 범례 안내"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3.5 h-3.5 rounded-full bg-blue-600"></span>
          <h3 className={`${getLabelSize()} text-slate-900 tracking-tight`}>
            좌석 색상 안내 (범례)
          </h3>
        </div>
        <div className={`${getSubtextSize()} font-semibold text-slate-700 bg-slate-100 px-3.5 py-1.5 rounded-full flex items-center gap-2`}>
          <span>총 좌석 <strong className="text-slate-900">{totalCount}</strong>석</span>
          <span className="text-slate-300">|</span>
          <span className="text-emerald-700">이용가능 <strong className="text-emerald-800">{availableCount}</strong>석</span>
          <span className="text-slate-300">|</span>
          <span className="text-rose-700">이용중 <strong className="text-rose-800">{occupiedCount}</strong>석</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-4">
        {/* 1. 이용 가능 */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border-2 border-emerald-400">
          <div className="w-11 h-11 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-sm shrink-0">
            <CheckCircle2 className="w-7 h-7" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className={`font-black text-emerald-900 ${fontSize === 'xlarge' ? 'text-lg' : 'text-base'}`}>
              이용 가능
            </div>
            <div className={`text-emerald-700 font-medium ${getSubtextSize()}`}>
              눌러서 예약
            </div>
          </div>
        </div>

        {/* 2. 이용 중 */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 border-2 border-slate-300">
          <div className="w-11 h-11 rounded-xl bg-slate-400 text-white flex items-center justify-center shadow-sm shrink-0">
            <UserCheck className="w-6 h-6" strokeWidth={2.2} />
          </div>
          <div className="min-w-0">
            <div className={`font-black text-slate-800 ${fontSize === 'xlarge' ? 'text-lg' : 'text-base'}`}>
              이용 중
            </div>
            <div className={`text-slate-600 font-medium ${getSubtextSize()}`}>
              선택 불가
            </div>
          </div>
        </div>

        {/* 3. 내가 선택한 자리 */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border-2 border-blue-500 ring-2 ring-blue-300/60">
          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <Hand className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className={`font-black text-blue-900 ${fontSize === 'xlarge' ? 'text-lg' : 'text-base'}`}>
              선택한 자리
            </div>
            <div className={`text-blue-700 font-medium ${getSubtextSize()}`}>
              {hasSelectedSeat ? '예약 대기 중' : '클릭 시 선택됨'}
            </div>
          </div>
        </div>

        {/* 4. 내 이용 좌석 */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 border-2 border-purple-400">
          <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-sm shrink-0">
            <BookmarkCheck className="w-6 h-6" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className={`font-black text-purple-900 ${fontSize === 'xlarge' ? 'text-lg' : 'text-base'}`}>
              내 좌석
            </div>
            <div className={`text-purple-700 font-medium ${getSubtextSize()}`}>
              {hasMySeat ? '현재 이용 중' : '내가 예약한 자리'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
