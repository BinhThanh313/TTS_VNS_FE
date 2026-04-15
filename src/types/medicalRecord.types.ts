export interface IMedicalRecord {
  id?: string | number; // Thêm id để gọi API
  cccd: string;
  fullName: string;
  dob: string;
  gender: string;
  profession: string;
  unit: string;
}

export interface IMedicalRecordParams {
  searchText?: string;
  unit?: string;
  profession?: string;
  page?: number;
  pageSize?: number;
}

export interface IMedicalRecordResponse {
  data: IMedicalRecord[];
  total: number;
}