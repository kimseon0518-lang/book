import { Seat, Reservation } from '../types';

export const DEFAULT_GAS_URL = "https://script.google.com/macros/s/AKfycbwz3yh1owo5zUj_GM4n9m8AkNeaNS3Zx0PzNrrYw5EJITr8y7eLoNMAfcQV85s7Pldw/exec";
export const GAS_URL = DEFAULT_GAS_URL;
export const GOOGLE_SHEET_ID = "1I1L2-3oJp9M6gO_1NE9c9fG1uM47nYgqyUY4meVkQlQ";
export const GOOGLE_SHEET_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit`;

const STORAGE_KEY_GAS_URL = 'library_gas_url';
const STORAGE_KEY_SEATS = 'library_seats_v1';

/**
 * Get active GAS Web App URL from localStorage or default
 */
export function getActiveGasUrl(): string {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_GAS_URL);
    if (saved && saved.trim().startsWith('http')) {
      return saved.trim();
    }
  } catch (e) {
    console.warn('Failed to read gas url from storage', e);
  }
  return DEFAULT_GAS_URL;
}

/**
 * Save active GAS Web App URL to localStorage
 */
export function setActiveGasUrl(url: string): void {
  try {
    const cleanUrl = url.trim();
    localStorage.setItem(STORAGE_KEY_GAS_URL, cleanUrl);
  } catch (e) {
    console.warn('Failed to save gas url to storage', e);
  }
}

// Default initial seats matching the Google Sheet structure
export const INITIAL_SEATS: Seat[] = [
  // 1층 일반 열람실 (S001 ~ S012)
  { id: 'S001', seatNumber: 1, zoneId: 'floor1', zoneName: '1층 일반 열람실', hasPower: true, hasWindow: true, status: 'available' },
  { 
    id: 'S002', 
    seatNumber: 2, 
    zoneId: 'floor1', 
    zoneName: '1층 일반 열람실', 
    hasPower: true, 
    hasWindow: true, 
    status: 'occupied',
    currentUserId: 'U001',
    currentUserName: '김선희',
    reservationId: 'R001',
    startTime: '2026-10-09 09:00',
    endTime: '2026-10-09 13:00'
  },
  { id: 'S003', seatNumber: 3, zoneId: 'floor1', zoneName: '1층 일반 열람실', hasPower: false, hasWindow: true, status: 'available' },
  { id: 'S004', seatNumber: 4, zoneId: 'floor1', zoneName: '1층 일반 열람실', hasPower: false, hasWindow: false, status: 'available' },
  { 
    id: 'S005', 
    seatNumber: 5, 
    zoneId: 'floor1', 
    zoneName: '1층 일반 열람실', 
    hasPower: true, 
    hasWindow: false, 
    status: 'occupied',
    currentUserId: 'U002',
    currentUserName: '이정순',
    reservationId: 'R5496',
    startTime: '2026-10-09 16:19',
    endTime: '2026-10-09 20:19'
  },
  { id: 'S006', seatNumber: 6, zoneId: 'floor1', zoneName: '1층 일반 열람실', hasPower: true, hasWindow: false, status: 'available' },
  { id: 'S007', seatNumber: 7, zoneId: 'floor1', zoneName: '1층 일반 열람실', hasPower: false, hasWindow: false, status: 'available' },
  { id: 'S008', seatNumber: 8, zoneId: 'floor1', zoneName: '1층 일반 열람실', hasPower: false, hasWindow: false, status: 'available' },
  { id: 'S009', seatNumber: 9, zoneId: 'floor1', zoneName: '1층 일반 열람실', hasPower: true, hasWindow: true, status: 'available' },
  { id: 'S010', seatNumber: 10, zoneId: 'floor1', zoneName: '1층 일반 열람실', hasPower: true, hasWindow: true, status: 'available' },
  { id: 'S011', seatNumber: 11, zoneId: 'floor1', zoneName: '1층 일반 열람실', hasPower: false, hasWindow: true, status: 'available' },
  { id: 'S012', seatNumber: 12, zoneId: 'floor1', zoneName: '1층 일반 열람실', hasPower: false, hasWindow: false, status: 'available' },

  // 2층 노트북/디지털실 (S013 ~ S024)
  { id: 'S013', seatNumber: 13, zoneId: 'floor2', zoneName: '2층 디지털/노트북실', hasPower: true, hasWindow: true, status: 'available' },
  { id: 'S014', seatNumber: 14, zoneId: 'floor2', zoneName: '2층 디지털/노트북실', hasPower: true, hasWindow: true, status: 'available' },
  { id: 'S015', seatNumber: 15, zoneId: 'floor2', zoneName: '2층 디지털/노트북실', hasPower: true, hasWindow: false, status: 'available' },
  { id: 'S016', seatNumber: 16, zoneId: 'floor2', zoneName: '2층 디지털/노트북실', hasPower: true, hasWindow: false, status: 'available' },
  { id: 'S017', seatNumber: 17, zoneId: 'floor2', zoneName: '2층 디지털/노트북실', hasPower: true, hasWindow: false, status: 'available' },
  { id: 'S018', seatNumber: 18, zoneId: 'floor2', zoneName: '2층 디지털/노트북실', hasPower: true, hasWindow: false, status: 'available' },
  { id: 'S019', seatNumber: 19, zoneId: 'floor2', zoneName: '2층 디지털/노트북실', hasPower: true, hasWindow: true, status: 'available' },
  { id: 'S020', seatNumber: 20, zoneId: 'floor2', zoneName: '2층 디지털/노트북실', hasPower: true, hasWindow: true, status: 'available' },
  { id: 'S021', seatNumber: 21, zoneId: 'floor2', zoneName: '2층 디지털/노트북실', hasPower: true, hasWindow: false, status: 'available' },
  { id: 'S022', seatNumber: 22, zoneId: 'floor2', zoneName: '2층 디지털/노트북실', hasPower: true, hasWindow: false, status: 'available' },
  { id: 'S023', seatNumber: 23, zoneId: 'floor2', zoneName: '2층 디지털/노트북실', hasPower: true, hasWindow: false, status: 'available' },
  { id: 'S024', seatNumber: 24, zoneId: 'floor2', zoneName: '2층 디지털/노트북실', hasPower: true, hasWindow: false, status: 'available' },

  // 3층 집중 스터디존 (S025 ~ S036)
  { id: 'S025', seatNumber: 25, zoneId: 'floor3', zoneName: '3층 집중 스터디존', hasPower: true, hasWindow: false, status: 'available' },
  { id: 'S026', seatNumber: 26, zoneId: 'floor3', zoneName: '3층 집중 스터디존', hasPower: true, hasWindow: false, status: 'available' },
  { id: 'S027', seatNumber: 27, zoneId: 'floor3', zoneName: '3층 집중 스터디존', hasPower: true, hasWindow: false, status: 'available' },
  { id: 'S028', seatNumber: 28, zoneId: 'floor3', zoneName: '3층 집중 스터디존', hasPower: true, hasWindow: false, status: 'available' },
  { id: 'S029', seatNumber: 29, zoneId: 'floor3', zoneName: '3층 집중 스터디존', hasPower: true, hasWindow: true, status: 'available' },
  { id: 'S030', seatNumber: 30, zoneId: 'floor3', zoneName: '3층 집중 스터디존', hasPower: true, hasWindow: true, status: 'available' },
  { id: 'S031', seatNumber: 31, zoneId: 'floor3', zoneName: '3층 집중 스터디존', hasPower: false, hasWindow: false, status: 'available' },
  { id: 'S032', seatNumber: 32, zoneId: 'floor3', zoneName: '3층 집중 스터디존', hasPower: false, hasWindow: false, status: 'available' },
  { id: 'S033', seatNumber: 33, zoneId: 'floor3', zoneName: '3층 집중 스터디존', hasPower: true, hasWindow: false, status: 'available' },
  { id: 'S034', seatNumber: 34, zoneId: 'floor3', zoneName: '3층 집중 스터디존', hasPower: true, hasWindow: false, status: 'available' },
  { id: 'S035', seatNumber: 35, zoneId: 'floor3', zoneName: '3층 집중 스터디존', hasPower: false, hasWindow: true, status: 'available' },
  { id: 'S036', seatNumber: 36, zoneId: 'floor3', zoneName: '3층 집중 스터디존', hasPower: false, hasWindow: true, status: 'available' },
];

// Helper to get local stored seats
export function getLocalSeats(): Seat[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SEATS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to read localStorage seats', e);
  }
  return INITIAL_SEATS;
}

export function saveLocalSeats(seats: Seat[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_SEATS, JSON.stringify(seats));
  } catch (e) {
    console.error('Failed to save seats to localStorage', e);
  }
}

// Format current date/time to YYYY-MM-DD HH:mm
export function formatKoreanDateTime(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${d} ${h}:${min}`;
}

export function formatTimeAfterHours(hours: number = 4, date: Date = new Date()): string {
  const target = new Date(date.getTime() + hours * 60 * 60 * 1000);
  return formatKoreanDateTime(target);
}

/**
 * Test connectivity with GAS Web App URL
 */
export async function testGasConnection(targetUrl?: string): Promise<{
  success: boolean;
  message: string;
  seatsCount?: number;
}> {
  const url = (targetUrl || getActiveGasUrl()).trim();
  if (!url || !url.startsWith('http')) {
    return { success: false, message: '올바른 URL 형식이 아닙니다 (https://script.google.com/macros/s/.../exec)' };
  }

  try {
    const testUrl = `${url}${url.includes('?') ? '&' : '?'}action=getSeats&t=${Date.now()}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(testUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && (data.status === 'success' || Array.isArray(data) || data.seats)) {
        const count = Array.isArray(data.seats) ? data.seats.length : (Array.isArray(data) ? data.length : 0);
        return {
          success: true,
          message: `구글 시트 연동 성공! (현재 ${count}건 좌석 동기화)`,
          seatsCount: count,
        };
      }
    }

    // Try root URL ping
    const rootController = new AbortController();
    const rootTimeout = setTimeout(() => rootController.abort(), 6000);
    const rootRes = await fetch(url, { signal: rootController.signal });
    clearTimeout(rootTimeout);
    if (rootRes.ok) {
      const rootData = await rootRes.json();
      if (rootData && rootData.status === 'success') {
        return {
          success: true,
          message: `구글 시트 API 서버가 정상 응답했습니다: "${rootData.message}"`,
        };
      }
    }
  } catch (err: any) {
    console.warn('testGasConnection warning:', err);
    return {
      success: false,
      message: `연결 확인 중 오류가 발생했습니다: ${err.message || '네트워크 응답 없음'}`,
    };
  }

  return { success: false, message: '서버 응답을 확인하지 못했습니다. 배포 URL 설정을 다시 확인해주세요.' };
}

/**
 * Fetch seat statuses from GAS
 * GET {GAS_URL}?action=getSeats
 */
export async function fetchSeatsFromGAS(customUrl?: string): Promise<{ seats: Seat[]; isLive: boolean; error?: string }> {
  const activeUrl = (customUrl || getActiveGasUrl()).trim();
  try {
    const url = `${activeUrl}${activeUrl.includes('?') ? '&' : '?'}action=getSeats&t=${Date.now()}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      let rawList: any[] = [];
      if (Array.isArray(data)) {
        rawList = data;
      } else if (data && Array.isArray(data.seats)) {
        rawList = data.seats;
      } else if (data && Array.isArray(data.data)) {
        rawList = data.data;
      }

      if (rawList.length >= 0) {
        // Map raw data onto our Seat model
        const localList = getLocalSeats();
        const mergedSeats = localList.map(localSeat => {
          const remote = rawList.find((r: any) => 
            (r.seatId && String(r.seatId).trim().toUpperCase() === localSeat.id.toUpperCase()) || 
            (r.id && String(r.id).trim().toUpperCase() === localSeat.id.toUpperCase()) ||
            (r.seatNumber && Number(r.seatNumber) === localSeat.seatNumber)
          );

          if (remote) {
            const isOccupied = remote.status === '이용중' || remote.status === 'occupied';
            return {
              ...localSeat,
              status: isOccupied ? 'occupied' : 'available',
              currentUserId: remote.userId || (isOccupied ? localSeat.currentUserId : undefined),
              currentUserName: remote.userName || (isOccupied ? localSeat.currentUserName : undefined),
              reservationId: remote.reservationId || localSeat.reservationId,
              startTime: remote.startTime || localSeat.startTime,
              endTime: remote.endTime || localSeat.endTime,
            } as Seat;
          }
          return localSeat;
        });

        saveLocalSeats(mergedSeats);
        return { seats: mergedSeats, isLive: true };
      }
    }
  } catch (err: any) {
    console.warn('GAS fetch seats note:', err.message || err);
  }

  // Fallback to local persistent seats
  return { seats: getLocalSeats(), isLive: false, error: '구글 시트 연동 대기 중' };
}

/**
 * Fetch user reservation from GAS
 * GET {GAS_URL}?action=getMyReservation&userId=...
 */
export async function fetchMyReservationFromGAS(userId: string, customUrl?: string): Promise<{ reservation: Reservation | null; isLive: boolean }> {
  const activeUrl = (customUrl || getActiveGasUrl()).trim();
  try {
    const url = `${activeUrl}${activeUrl.includes('?') ? '&' : '?'}action=getMyReservation&userId=${encodeURIComponent(userId)}&t=${Date.now()}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: controller.signal
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.reservationId) {
        return { reservation: data, isLive: true };
      } else if (data && data.data && data.data.reservationId) {
        return { reservation: data.data, isLive: true };
      } else if (data && data.reservation) {
        return { reservation: data.reservation, isLive: true };
      }
    }
  } catch (err) {
    // Proceed to local lookup
  }

  // Check local seats for this user
  const seats = getLocalSeats();
  const mySeat = seats.find(s => s.currentUserId === userId && s.status === 'occupied');
  if (mySeat) {
    return {
      reservation: {
        reservationId: mySeat.reservationId || `R-${Date.now().toString().slice(-4)}`,
        seatId: mySeat.id,
        userId: mySeat.currentUserId!,
        userName: mySeat.currentUserName || '이용자',
        startTime: mySeat.startTime || formatKoreanDateTime(),
        endTime: mySeat.endTime || formatTimeAfterHours(4),
        status: '이용중',
      },
      isLive: false,
    };
  }

  return { reservation: null, isLive: false };
}

/**
 * Reserve seat via GAS (Supports both GET query params & POST for 100% browser compatibility)
 */
export async function reserveSeatAPI(
  seatId: string, 
  userId: string, 
  userName: string,
  customUrl?: string
): Promise<{ success: boolean; message: string; reservation?: Reservation; isLive: boolean }> {
  const newReservationId = `R${Date.now().toString().slice(-4)}`;
  const startTime = formatKoreanDateTime();
  const endTime = formatTimeAfterHours(4);
  const activeUrl = (customUrl || getActiveGasUrl()).trim();

  // Optimistically & locally update seat state first
  const currentSeats = getLocalSeats();
  const targetSeat = currentSeats.find(s => s.id === seatId);

  if (!targetSeat) {
    return { success: false, message: '존재하지 않는 좌석입니다.', isLive: false };
  }

  if (targetSeat.status === 'occupied' && targetSeat.currentUserId !== userId) {
    return { success: false, message: '이미 다른 분이 이용 중인 좌석입니다.', isLive: false };
  }

  // Check if user already holds another seat
  const existingUserSeat = currentSeats.find(s => s.currentUserId === userId && s.id !== seatId && s.status === 'occupied');
  if (existingUserSeat) {
    return { 
      success: false, 
      message: `이미 ${existingUserSeat.zoneName} ${existingUserSeat.id}번 좌석을 이용 중입니다. 먼저 퇴실 후 다시 예약해주세요.`, 
      isLive: false 
    };
  }

  let liveSuccess = false;

  // 1. Send via URL-encoded GET to GAS (proven to execute and write to Google Sheet directly)
  try {
    const getUrl = `${activeUrl}${activeUrl.includes('?') ? '&' : '?'}action=reserveSeat` +
      `&seatId=${encodeURIComponent(seatId)}` +
      `&userId=${encodeURIComponent(userId)}` +
      `&userName=${encodeURIComponent(userName)}` +
      `&reservationId=${encodeURIComponent(newReservationId)}` +
      `&startTime=${encodeURIComponent(startTime)}` +
      `&endTime=${encodeURIComponent(endTime)}` +
      `&t=${Date.now()}`;

    const res = await fetch(getUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (res.ok) {
      const json = await res.json();
      if (json && (json.status === 'success' || json.reservationId)) {
        liveSuccess = true;
      }
    }
  } catch (err: any) {
    console.warn('GET reserve error:', err);
  }

  // 2. Backup POST with text/plain (avoids CORS preflight)
  if (!liveSuccess) {
    try {
      const payload = {
        action: 'reserveSeat',
        seatId,
        userId,
        userName,
        reservationId: newReservationId,
        startTime,
        endTime,
      };
      const response = await fetch(activeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        liveSuccess = true;
      }
    } catch (postErr) {
      console.warn('POST reserve fallback:', postErr);
    }
  }

  // Update local storage
  const updatedSeats = currentSeats.map(s => {
    if (s.id === seatId) {
      return {
        ...s,
        status: 'occupied' as const,
        currentUserId: userId,
        currentUserName: userName,
        reservationId: newReservationId,
        startTime,
        endTime,
      };
    }
    return s;
  });
  saveLocalSeats(updatedSeats);

  const newReservation: Reservation = {
    reservationId: newReservationId,
    seatId,
    userId,
    userName,
    startTime,
    endTime,
    status: '이용중',
  };

  return {
    success: true,
    message: `${targetSeat.zoneName} ${seatId}번 좌석 예약이 완료되었습니다. ${liveSuccess ? '(구글 시트에 즉시 반영됨)' : ''}`,
    reservation: newReservation,
    isLive: liveSuccess,
  };
}

/**
 * Cancel seat (Check-out) via GAS
 */
export async function cancelSeatAPI(
  reservationId: string, 
  seatId: string,
  customUrl?: string
): Promise<{ success: boolean; message: string; isLive: boolean }> {
  const activeUrl = (customUrl || getActiveGasUrl()).trim();
  let liveSuccess = false;

  // 1. Send via URL-encoded GET to GAS
  try {
    const getUrl = `${activeUrl}${activeUrl.includes('?') ? '&' : '?'}action=cancelSeat` +
      `&seatId=${encodeURIComponent(seatId)}` +
      `&reservationId=${encodeURIComponent(reservationId)}` +
      `&t=${Date.now()}`;

    const res = await fetch(getUrl, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });
    if (res.ok) {
      const json = await res.json();
      if (json && json.status === 'success') {
        liveSuccess = true;
      }
    }
  } catch (err: any) {
    console.warn('GET cancel error:', err);
  }

  // 2. Backup POST
  if (!liveSuccess) {
    try {
      const payload = { action: 'cancelSeat', reservationId, seatId };
      const response = await fetch(activeUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        liveSuccess = true;
      }
    } catch (err) {
      console.warn('POST cancel fallback:', err);
    }
  }

  // Free seat in local storage
  const currentSeats = getLocalSeats();
  const updatedSeats = currentSeats.map(s => {
    if (s.id === seatId || s.reservationId === reservationId) {
      return {
        ...s,
        status: 'available' as const,
        currentUserId: undefined,
        currentUserName: undefined,
        reservationId: undefined,
        startTime: undefined,
        endTime: undefined,
      };
    }
    return s;
  });
  saveLocalSeats(updatedSeats);

  return {
    success: true,
    message: `${seatId}번 좌석 퇴실 처리가 완료되었습니다. ${liveSuccess ? '(구글 시트에 즉시 반영됨)' : ''}`,
    isLive: liveSuccess,
  };
}
