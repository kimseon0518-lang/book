import React from 'react';
import { 
  BookOpen, 
  User as UserIcon, 
  LogOut, 
  Volume2, 
  VolumeX, 
  RefreshCw, 
  FileCode,
  Sparkles
} from 'lucide-react';
import { User, FontSizeLevel } from '../types';

interface HeaderProps {
  user: User | null;
  onLogout: () => void;
  fontSize: FontSizeLevel;
  setFontSize: (size: FontSizeLevel) => void;
  ttsEnabled: boolean;
  setTtsEnabled: (enabled: boolean) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  isLive: boolean;
  onOpenHtmlModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  fontSize,
  setFontSize,
  ttsEnabled,
  setTtsEnabled,
  onRefresh,
  isRefreshing,
  isLive,
  onOpenHtmlModal,
}) => {
  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4">
        {/* Top line: Logo & Utility Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Logo & System Name */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm shrink-0">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  행복 도서관 좌석 예약
                </h1>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                  isLive ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                }`}>
                  {isLive ? '구글시트 실시간' : '로컬 안전모드'}
                </span>
              </div>
              <p className="text-slate-300 text-sm font-medium">
                누구나 누르기 쉬운 큰 글씨 좌석 예약 서비스
              </p>
            </div>
          </div>

          {/* Accessibility & Action controls */}
          <div className="flex flex-wrap items-center gap-2 pt-2 sm:pt-0 border-t border-slate-800 sm:border-0">
            {/* Font Size Adjuster for seniors */}
            <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700">
              <span className="text-xs text-slate-300 px-2 font-semibold hidden md:inline">글자크기:</span>
              <button
                type="button"
                onClick={() => setFontSize('normal')}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  fontSize === 'normal' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
                aria-pressed={fontSize === 'normal'}
                title="기본 글자 크기 (18px)"
              >
                보통
              </button>
              <button
                type="button"
                onClick={() => setFontSize('large')}
                className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  fontSize === 'large' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
                aria-pressed={fontSize === 'large'}
                title="큰 글자 크기 (21px)"
              >
                크게
              </button>
              <button
                type="button"
                onClick={() => setFontSize('xlarge')}
                className={`px-3 py-1.5 rounded-lg text-sm font-black transition-all ${
                  fontSize === 'xlarge' 
                    ? 'bg-blue-600 text-white shadow-sm ring-1 ring-white/50' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
                aria-pressed={fontSize === 'xlarge'}
                title="아주 큰 글자 크기 (24px)"
              >
                더 크게
              </button>
            </div>

            {/* TTS Voice Guidance toggle */}
            <button
              type="button"
              onClick={() => setTtsEnabled(!ttsEnabled)}
              className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all ${
                ttsEnabled 
                  ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm' 
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
              title={ttsEnabled ? '음성 안내 켜짐' : '음성 안내 꺼짐'}
              aria-label="음성 안내 켜고 끄기"
            >
              {ttsEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              <span className="hidden lg:inline">{ttsEnabled ? '소리 안내 On' : '소리 안내'}</span>
            </button>

            {/* Refresh button */}
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold disabled:opacity-50"
              title="최신 좌석 현황 새로고침"
              aria-label="최신 좌석 현황 새로고침"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
              <span className="hidden sm:inline">새로고침</span>
            </button>

            {/* Standalone HTML File Button */}
            <button
              type="button"
              onClick={onOpenHtmlModal}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 text-xs font-semibold"
              title="단일 HTML 파일 다운로드 및 GAS 가이드"
            >
              <FileCode className="w-4 h-4 text-emerald-400" />
              <span>단일 HTML / GAS 가이드</span>
            </button>

            {/* User Session card & Logout */}
            {user && (
              <div className="flex items-center gap-2 pl-1 border-l border-slate-800">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/80 rounded-xl border border-slate-700 text-sm">
                  <UserIcon className="w-4 h-4 text-blue-400" />
                  <span className="font-bold text-white">{user.userName}</span>
                  <span className="text-slate-400 text-xs">({user.userId})</span>
                </div>
                <button
                  type="button"
                  onClick={onLogout}
                  className="px-2.5 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 rounded-xl border border-rose-800/50 text-xs font-bold transition-all flex items-center gap-1"
                  title="로그아웃 또는 다른 사용자로 변경"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>변경</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
