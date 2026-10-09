import React, { useState, useEffect, useCallback } from 'react';
import { User, Seat, Reservation, FontSizeLevel } from './types';
import { 
  fetchSeatsFromGAS, 
  fetchMyReservationFromGAS, 
  reserveSeatAPI, 
  cancelSeatAPI,
  getLocalSeats,
  getActiveGasUrl,
  setActiveGasUrl,
  testGasConnection
} from './services/gasApi';
import { Header } from './components/Header';
import { GoogleSheetConfigBar } from './components/GoogleSheetConfigBar';
import { Legend } from './components/Legend';
import { MyReservationCard } from './components/MyReservationCard';
import { SeatMap } from './components/SeatMap';
import { ReservationModal } from './components/ReservationModal';
import { CheckoutModal } from './components/CheckoutModal';
import { LoginView } from './components/LoginView';
import { HtmlExportModal } from './components/HtmlExportModal';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export default function App() {
  // User Session
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('library_active_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Active GAS URL state
  const [gasUrl, setGasUrl] = useState<string>(getActiveGasUrl);

  // Font size level for seniors: 'normal' (18px) | 'large' (21px) | 'xlarge' (24px)
  const [fontSize, setFontSize] = useState<FontSizeLevel>(() => {
    return (localStorage.getItem('library_font_size') as FontSizeLevel) || 'normal';
  });

  // TTS audio guidance
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(() => {
    return localStorage.getItem('library_tts_enabled') === 'true';
  });

  // Seats & Reservation data
  const [seats, setSeats] = useState<Seat[]>(getLocalSeats);
  const [myReservation, setMyReservation] = useState<Reservation | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

  // Status flags
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Modals
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isHtmlModalOpen, setIsHtmlModalOpen] = useState(false);

  // Speech synthesizer helper for accessibility
  const speakText = useCallback((text: string) => {
    if (!ttsEnabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.95; // slightly relaxed pace for clarity
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
    }
  }, [ttsEnabled]);

  const showToast = useCallback((text: string, type: 'success' | 'info' | 'error' = 'info', speak: boolean = true) => {
    setToastMessage({ text, type });
    if (speak) speakText(text);
    setTimeout(() => {
      setToastMessage(prev => (prev?.text === text ? null : prev));
    }, 4500);
  }, [speakText]);

  // Handle font size change
  const handleFontSizeChange = (size: FontSizeLevel) => {
    setFontSize(size);
    localStorage.setItem('library_font_size', size);
  };

  const handleTtsToggle = (enabled: boolean) => {
    setTtsEnabled(enabled);
    localStorage.setItem('library_tts_enabled', String(enabled));
    if (enabled) {
      showToast('음성 안내 기능이 켜졌습니다.', 'info', true);
    }
  };

  // Sync data from GAS
  const loadData = useCallback(async (isInitial = false, customUrl?: string) => {
    setIsRefreshing(true);
    try {
      const targetUrl = customUrl || gasUrl;
      const res = await fetchSeatsFromGAS(targetUrl);
      setSeats(res.seats);
      setIsLive(res.isLive);

      if (user) {
        const myRes = await fetchMyReservationFromGAS(user.userId, targetUrl);
        setMyReservation(myRes.reservation);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRefreshing(false);
    }
  }, [user, gasUrl]);

  // Handle URL change from top deployment link input bar
  const handleUpdateGasUrl = async (newUrl: string) => {
    setActiveGasUrl(newUrl);
    setGasUrl(newUrl);
    
    const testResult = await testGasConnection(newUrl);
    if (testResult.success) {
      showToast(testResult.message, 'success', true);
    } else {
      showToast(testResult.message, 'error', true);
    }

    await loadData(false, newUrl);
  };

  // Initial load & poll every 30s
  useEffect(() => {
    loadData(true);
    const interval = setInterval(() => {
      loadData(false);
    }, 30000);
    return () => clearInterval(interval);
  }, [loadData]);

  // Check user's reservation whenever user or seats change
  useEffect(() => {
    if (!user) {
      setMyReservation(null);
      setSelectedSeat(null);
      return;
    }
    const currentMySeat = seats.find(s => s.currentUserId === user.userId && s.status === 'occupied');
    if (currentMySeat) {
      setMyReservation({
        reservationId: currentMySeat.reservationId || 'R001',
        seatId: currentMySeat.id,
        userId: user.userId,
        userName: user.userName,
        startTime: currentMySeat.startTime || '2026-10-09 09:00',
        endTime: currentMySeat.endTime || '2026-10-09 13:00',
        status: '이용중',
      });
    } else {
      setMyReservation(null);
    }
  }, [user, seats]);

  // Login handler
  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('library_active_user', JSON.stringify(newUser));
    showToast(`${newUser.userName} 님, 환영합니다!`, 'success', true);
  };

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    setSelectedSeat(null);
    setMyReservation(null);
    localStorage.removeItem('library_active_user');
    showToast('로그아웃 되었습니다.', 'info', false);
  };

  // Seat selection
  const handleSelectSeat = (seat: Seat) => {
    // If user already has a reservation
    if (myReservation) {
      showToast(`이미 ${myReservation.seatId}번 좌석을 이용 중입니다. 먼저 퇴실 후 예약해주세요.`, 'error', true);
      return;
    }

    if (seat.status === 'occupied') {
      showToast('이 좌석은 현재 다른 분이 이용 중입니다. 초록색 좌석을 선택해주세요.', 'info', true);
      return;
    }

    if (selectedSeat?.id === seat.id) {
      setSelectedSeat(null);
      showToast('좌석 선택이 취소되었습니다.', 'info', false);
    } else {
      setSelectedSeat(seat);
      showToast(`${seat.id}번 (${seat.zoneName})을 선택하셨습니다. 아래 '예약하기' 버튼을 눌러주세요.`, 'info', true);
    }
  };

  // Confirm reservation
  const handleConfirmReservation = async () => {
    if (!selectedSeat || !user) return;
    setIsSubmitting(true);
    try {
      const res = await reserveSeatAPI(selectedSeat.id, user.userId, user.userName, gasUrl);
      if (res.success) {
        setIsReserveModalOpen(false);
        setSelectedSeat(null);
        await loadData(false);
        showToast(res.message, 'success', true);
      } else {
        showToast(res.message, 'error', true);
      }
    } catch (e: any) {
      showToast(e.message || '예약 중 오류가 발생했습니다.', 'error', true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Confirm checkout
  const handleConfirmCheckout = async () => {
    if (!myReservation) return;
    setIsSubmitting(true);
    try {
      const res = await cancelSeatAPI(myReservation.reservationId, myReservation.seatId, gasUrl);
      if (res.success) {
        setIsCheckoutModalOpen(false);
        await loadData(false);
        showToast(res.message, 'success', true);
      } else {
        showToast(res.message, 'error', true);
      }
    } catch (e: any) {
      showToast(e.message || '퇴실 처리 중 오류가 발생했습니다.', 'error', true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Counts for legend
  const availableCount = seats.filter(s => s.status === 'available').length;
  const occupiedCount = seats.filter(s => s.status === 'occupied').length;
  const mySeat = seats.find(s => user && s.currentUserId === user.userId && s.status === 'occupied') || null;

  // Root font size class
  const getRootFontClass = () => {
    if (fontSize === 'xlarge') return 'text-[22px] leading-relaxed';
    if (fontSize === 'large') return 'text-[20px] leading-relaxed';
    return 'text-[18px] leading-normal';
  };

  return (
    <div className={`min-h-screen bg-slate-100 text-slate-900 ${getRootFontClass()} transition-all`}>
      {/* 1. Top Header */}
      <Header
        user={user}
        onLogout={handleLogout}
        fontSize={fontSize}
        setFontSize={handleFontSizeChange}
        ttsEnabled={ttsEnabled}
        setTtsEnabled={handleTtsToggle}
        onRefresh={() => {
          loadData(false);
          showToast('좌석 현황을 새로고침했습니다.', 'info', false);
        }}
        isRefreshing={isRefreshing}
        isLive={isLive}
        onOpenHtmlModal={() => setIsHtmlModalOpen(true)}
      />

      {/* 2. Top Deployment Link Input & Google Sheet Integration Bar */}
      <GoogleSheetConfigBar
        gasUrl={gasUrl}
        onUpdateGasUrl={handleUpdateGasUrl}
        isLive={isLive}
        fontSize={fontSize}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div 
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-lg w-[92%] animate-bounce shadow-2xl"
          role="status"
          aria-live="polite"
        >
          <div className={`p-4 rounded-2xl border-2 flex items-center gap-3 text-white font-bold text-lg ${
            toastMessage.type === 'success'
              ? 'bg-emerald-700 border-emerald-400'
              : toastMessage.type === 'error'
              ? 'bg-rose-700 border-rose-400'
              : 'bg-blue-800 border-blue-400'
          }`}>
            {toastMessage.type === 'success' ? (
              <CheckCircle2 className="w-7 h-7 text-emerald-200 shrink-0" />
            ) : (
              <AlertCircle className="w-7 h-7 text-amber-200 shrink-0" />
            )}
            <span className="flex-1">{toastMessage.text}</span>
            <button 
              type="button" 
              onClick={() => setToastMessage(null)}
              className="text-white/80 hover:text-white px-2 py-1 text-sm font-black"
            >
              닫기
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {!user ? (
          <LoginView onLogin={handleLogin} fontSize={fontSize} />
        ) : (
          <div className="space-y-6">
            {/* 1. My Current Reservation Card */}
            <MyReservationCard
              mySeat={mySeat}
              reservation={myReservation}
              onOpenCheckoutModal={() => setIsCheckoutModalOpen(true)}
              fontSize={fontSize}
            />

            {/* 2. Legend Section at top of seat map */}
            <Legend
              availableCount={availableCount}
              occupiedCount={occupiedCount}
              totalCount={seats.length}
              hasSelectedSeat={!!selectedSeat}
              hasMySeat={!!myReservation}
              fontSize={fontSize}
            />

            {/* 3. Seat Map with Floor Tabs & Grid/List View */}
            <SeatMap
              seats={seats}
              selectedSeatId={selectedSeat?.id || null}
              onSelectSeat={handleSelectSeat}
              mySeatId={myReservation?.seatId || null}
              currentUserId={user.userId}
              onOpenReservationModal={() => setIsReserveModalOpen(true)}
              onClearSelectedSeat={() => setSelectedSeat(null)}
              fontSize={fontSize}
            />
          </div>
        )}
      </main>

      {/* Modals */}
      <ReservationModal
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        seat={selectedSeat}
        user={user}
        onConfirm={handleConfirmReservation}
        isSubmitting={isSubmitting}
        fontSize={fontSize}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        seat={mySeat}
        reservation={myReservation}
        onConfirm={handleConfirmCheckout}
        isSubmitting={isSubmitting}
        fontSize={fontSize}
      />

      <HtmlExportModal
        isOpen={isHtmlModalOpen}
        onClose={() => setIsHtmlModalOpen(false)}
      />
    </div>
  );
}
