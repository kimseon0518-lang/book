export interface Seat {
  id: string; // e.g., 'S001', 'S002'
  seatNumber: number; // 1, 2, ...
  zoneId: 'floor1' | 'floor2' | 'floor3';
  zoneName: string; // '1층 일반 열람실', '2층 디지털/노트북실', '3층 집중 스터디존'
  hasPower: boolean; // 전원 콘센트
  hasWindow: boolean; // 창가 자리
  status: 'available' | 'occupied' | 'maintenance'; // '이용가능' | '이용중'
  currentUserId?: string;
  currentUserName?: string;
  reservationId?: string;
  startTime?: string;
  endTime?: string;
}

export interface Reservation {
  reservationId: string;
  seatId: string;
  userId: string;
  userName: string;
  startTime: string;
  endTime: string;
  status: '이용중' | '이용완료' | '취소';
}

export interface User {
  userId: string;
  userName: string;
}

export type FontSizeLevel = 'normal' | 'large' | 'xlarge';
