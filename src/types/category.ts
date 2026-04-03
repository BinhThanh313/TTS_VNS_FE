export interface IProvince {
  id: string | number;
  maTinh: string;
  tenTinh: string;
}

export interface IDistrict {
  id: string | number;
  provinceName: string;
  code: string;
  name: string;
}

export interface IWard {
  id: string | number;
  districtName: string;
  code: string;
  name: string;
}

export interface IBHYTPriceHistory {
  id?: string;
  giaDV: number;
  giaBHYT: number;
  tuNgay: any; // dayjs object
  denNgay: any;
  bhytChiTra: number;
  tiLeBHYTChiTra: number;
}

export interface IClinicService {
  id: string | number;
  maDichVu: string;
  tenDichVu: string;
  coSo: string;
  loaiDichVu: string;
  nhomDichVu: string;
  chiTietNhomDichVu?: string;
  maDVBHYT?: string;
  tenDVBHYT?: string;
  donViTinh: string;
  loaiPTTT?: string;
  nhomDVBHYT?: string;
  // Các checkbox
  chiDinhTrung?: boolean;
  ngungSuDung?: boolean;
  kyThuatCao?: boolean;
  batBuocNhapTT?: boolean;
  ngoaiTru?: boolean;
  noiTru?: boolean;
  // BHYT Info
  maTheoTT: string;
  tenTheoTT: string;
  moGiaBHYT?: boolean;
  giaDV: number;
  giaBHYT?: number;
  bhytChiTra?: number;
  tiLeBHYTChiTra?: number;
  lichSuGia?: IBHYTPriceHistory[];
}