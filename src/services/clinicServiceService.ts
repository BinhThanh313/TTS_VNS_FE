import type { IClinicService, IClinicServiceSearchParams, IListResponse } from "@/types";

// Đưa Mock Data vào đây làm DB ảo
let MOCK_CLINIC_DATA: IClinicService[] = [
  { id: 1, maDichVu: 'LAB.1000107', maDVBHYT: '579A7A6', coSo: 'Bệnh viện Thống Nhất', tenDichVu: 'Đo hoạt độ ALT (GPT)', tenDVBHYT: 'Đo hoạt độ ALT (GPT)', loaiDichVu: 'Cận lâm sàng', nhomDichVu: 'Xét nghiệm', chiTietNhomDichVu: 'Xét nghiệm hóa sinh', donViTinh: 'Lần', giaDV: 150000, giaBHYT: 120000, maTheoTT: 'TT.ALT', tenTheoTT: 'Đo hoạt độ ALT', moGiaBHYT: true },
  { id: 2, maDichVu: 'TT13_4545', maDVBHYT: '9B94E49', coSo: 'Bệnh viện Thống Nhất', tenDichVu: 'Virus test nhanh', tenDVBHYT: 'Test nhanh Virus', loaiDichVu: 'Cận lâm sàng', nhomDichVu: 'Xét nghiệm', chiTietNhomDichVu: 'Xét nghiệm vi sinh', donViTinh: 'Lần', giaDV: 238000, giaBHYT: 238000, maTheoTT: 'TT.TEST_NHANH', tenTheoTT: 'Test nhanh Virus', moGiaBHYT: true },
];

export const clinicServiceApi = {
  getList: async (params?: IClinicServiceSearchParams): Promise<IListResponse<IClinicService>> => {
    await new Promise((res) => setTimeout(res, 300));
    let filtered = [...MOCK_CLINIC_DATA];
    if (params?.tenDichVu) filtered = filtered.filter(x => x.tenDichVu.toLowerCase().includes(params.tenDichVu!.toLowerCase()));
    
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 15;
    const startIndex = (page - 1) * pageSize;
    return { data: filtered.slice(startIndex, startIndex + pageSize), total: filtered.length };
  },
  create: async (data: IClinicService) => {
    await new Promise((res) => setTimeout(res, 300));
    const newData = { ...data, id: Date.now() };
    MOCK_CLINIC_DATA = [newData, ...MOCK_CLINIC_DATA];
    return newData;
  },
  update: async (id: string | number, data: Partial<IClinicService>) => {
    await new Promise((res) => setTimeout(res, 300));
    const index = MOCK_CLINIC_DATA.findIndex(x => x.id === id);
    if (index !== -1) MOCK_CLINIC_DATA[index] = { ...MOCK_CLINIC_DATA[index], ...data };
    return MOCK_CLINIC_DATA[index];
  },
  delete: async (id: string | number) => {
    await new Promise((res) => setTimeout(res, 300));
    MOCK_CLINIC_DATA = MOCK_CLINIC_DATA.filter(x => x.id !== id);
    return true;
  }
};