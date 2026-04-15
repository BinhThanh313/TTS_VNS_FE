import type { IPaginationParams } from "./common.types";

export interface IClinicService {
  id: string | number;
  maDichVu: string;
  maDVBHYT: string;
  coSo: string;
  tenDichVu: string;
  tenDVBHYT: string;
  loaiDichVu: string;
  nhomDichVu: string;
  chiTietNhomDichVu: string;
  donViTinh: string;
  giaDV: number;
  giaBHYT: number;
  maTheoTT: string;
  tenTheoTT: string;
  moGiaBHYT: boolean;
  loaiPTTT?: string;
  nhomDVBHYT?: string;
  chiDinhTrung?: boolean;
  ngungSuDung?: boolean;
  kyThuatCao?: boolean;
  batBuocNhapTT?: boolean;
  ngoaiTru?: boolean;
  noiTru?: boolean;
  bhytChiTra?: number;
  tiLeBHYTChiTra?: number;
  lichSuGia?: any[]; 
}

// Kế thừa phân trang giống hệt Province, District
export interface IClinicServiceSearchParams extends IPaginationParams {
  coSo?: string;
  loaiDichVu?: string;
  nhomDichVu?: string;
  tenDichVu?: string;
}