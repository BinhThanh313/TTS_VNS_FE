// src/types/queue.types.ts

// Thông tin 1 bệnh nhân trong hàng đợi
export interface IPatient {
  id: number;
  name: string;
  stt: number;
}

// Payload khi lễ tân thêm bệnh nhân
export interface IAddPatientPayload {
  roomId: string;
  patient: IPatient;
}

// Trạng thái màn hình TV
export interface IDisplayState {
  callingPatient: IPatient | null;
  isReady: boolean;
}