import React, { useState } from 'react';
import { BookOpen, UserCheck, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { User, FontSizeLevel } from '../types';

interface LoginViewProps {
  onLogin: (user: User) => void;
  fontSize: FontSizeLevel;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, fontSize }) => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setError('이름(성함)을 입력해주세요.');
      return;
    }
    if (!userId.trim()) {
      setError('회원번호(또는 전화번호 뒷자리)를 입력해주세요.');
      return;
    }

    setError('');
    onLogin({
      userName: userName.trim(),
      userId: userId.trim(),
    });
  };

  const handleQuickSelect = (name: string, id: string) => {
    setUserName(name);
    setUserId(id);
    onLogin({ userName: name, userId: id });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-8 px-4">
      <div className="bg-white rounded-3xl border-4 border-slate-300 shadow-2xl p-6 sm:p-10 max-w-xl w-full">
        {/* Banner */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl text-white flex items-center justify-center mx-auto mb-4 shadow-md">
            <BookOpen className="w-12 h-12" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            도서관 자리 예약
          </h2>
          <p className="text-slate-600 text-lg sm:text-xl font-medium mt-2">
            이름과 회원번호를 입력하고 시작해주세요
          </p>
        </div>

        {/* Quick Demo Selector for Seniors and Testers */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-50 border-2 border-slate-200">
          <div className="text-sm font-bold text-slate-600 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>빠른 간편 체험 (버튼을 누르면 바로 시작됩니다)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickSelect('김선희', 'U001')}
              className="p-3 bg-white hover:bg-purple-50 active:scale-98 border-2 border-purple-300 rounded-xl text-left transition-all group"
            >
              <div className="font-bold text-purple-950 flex items-center justify-between text-base">
                <span>김선희 (U001)</span>
                <span className="text-xs bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full font-bold">이용 중</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                구글시트에 등록된 S002번 좌석 이용자
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleQuickSelect('이정순', 'U002')}
              className="p-3 bg-white hover:bg-emerald-50 active:scale-98 border-2 border-emerald-300 rounded-xl text-left transition-all group"
            >
              <div className="font-bold text-emerald-950 flex items-center justify-between text-base">
                <span>이정순 (U002)</span>
                <span className="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">신규 예약</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                새 좌석 예약 바로 체험하기
              </div>
            </button>
          </div>
        </div>

        {/* Manual Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3.5 bg-rose-50 border-2 border-rose-400 rounded-xl text-rose-900 font-bold text-base">
              ⚠️ {error}
            </div>
          )}

          <div>
            <label htmlFor="user-name" className="block text-xl font-black text-slate-800 mb-2">
              1. 성함 (이름)
            </label>
            <input
              id="user-name"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="예: 홍길동"
              className="w-full h-16 px-5 rounded-2xl border-2 border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 text-xl font-bold text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label htmlFor="user-id" className="block text-xl font-black text-slate-800 mb-2">
              2. 회원번호 (또는 휴대폰 뒷자리)
            </label>
            <input
              id="user-id"
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="예: U001 또는 1234"
              className="w-full h-16 px-5 rounded-2xl border-2 border-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 text-xl font-bold text-slate-900 placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            className="w-full h-16 bg-blue-600 hover:bg-blue-700 active:scale-98 text-white rounded-2xl font-black text-2xl shadow-xl transition-all flex items-center justify-center gap-3 ring-4 ring-blue-200"
          >
            <span>도서관 들어가기</span>
            <ArrowRight className="w-7 h-7" />
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-200 text-center text-sm text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>입력하신 정보는 좌석 예약 확인 목적으로만 사용됩니다.</span>
        </div>
      </div>
    </div>
  );
};
