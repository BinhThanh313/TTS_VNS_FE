import { safeApiClient } from "./apiClient";
import type { IProvince, IProvinceRequest, IProvinceSearchParams, IListResponse } from "@/types";

// ==========================================
// MOCK DATA: Database tạm thời trên RAM
// ==========================================
let MOCK_PROVINCE_DATA: IProvince[] = [
  { id: "1", maTinh: "01", tenTinh: "Thành phố Hà Nội" },
  { id: "2", maTinh: "79", tenTinh: "Thành phố Hồ Chí Minh" },
  { id: "3", maTinh: "48", tenTinh: "Thành phố Đà Nẵng" },
  { id: "4", maTinh: "31", tenTinh: "Thành phố Hải Phòng" },
  { id: "5", maTinh: "92", tenTinh: "Thành phố Cần Thơ" },
  { id: "6", maTinh: "02", tenTinh: "Tỉnh Hà Giang" },
  { id: "7", maTinh: "20", tenTinh: "Tỉnh Lạng Sơn" },
  { id: "8", maTinh: "14", tenTinh: "Tỉnh Sơn La" },
  { id: "9", maTinh: "38", tenTinh: "Tỉnh Thanh Hóa" },
  { id: "10", maTinh: "40", tenTinh: "Tỉnh Nghệ An" },
];

export const provinceService = {
  getList: async (params?: IProvinceSearchParams) => {
    await new Promise((resolve) => setTimeout(resolve, 400)); // Giả lập mạng chậm 400ms
    let filtered = [...MOCK_PROVINCE_DATA];

    // Xử lý Tìm kiếm
    if (params?.maTinh) filtered = filtered.filter(p => p.maTinh.includes(params.maTinh!));
    if (params?.tenTinh) filtered = filtered.filter(p => p.tenTinh.toLowerCase().includes(params.tenTinh!.toLowerCase()));

    // Xử lý Phân trang
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

    return { data: paginatedData, total: filtered.length } as IListResponse<IProvince>;
  },

  updateNew: async (id: string | number, data: IProvinceRequest) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const index = MOCK_PROVINCE_DATA.findIndex(p => p.id === id);
    if (index !== -1) {
      MOCK_PROVINCE_DATA[index] = { ...MOCK_PROVINCE_DATA[index], ...data };
      return MOCK_PROVINCE_DATA[index];
    }
    throw new Error("Not found");
  },

  deleteNew: async (id: string | number) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    MOCK_PROVINCE_DATA = MOCK_PROVINCE_DATA.filter(p => p.id !== id);
    return true;
  },

  // Hàm Import dữ liệu từ Excel vào Mock Database
  importData: async (data: IProvince[]) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    // Thêm dữ liệu import vào đầu danh sách
    MOCK_PROVINCE_DATA = [...data, ...MOCK_PROVINCE_DATA];
    return true;
  },

  // Giữ lại khai báo cũ cho getById và createNew để không bị lỗi type
  getById: (id: string | number) => safeApiClient.get(`/v1/provinces/${id}`) as Promise<IProvince>,
  createNew: (data: IProvinceRequest) => safeApiClient.post("/v1/provinces", data) as Promise<IProvince>,
};