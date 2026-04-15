import { safeApiClient } from "./apiClient";
import type { IDistrict, IDistrictRequest, IDistrictSearchParams, IListResponse } from "@/types";

// ==========================================
// MOCK DATA: Database tạm thời trên RAM
// ==========================================
let MOCK_DISTRICT_DATA: IDistrict[] = [
  { id: "1", provinceName: "Hà Nội", provinceId: "1", code: "271", name: "Ba Vì" },
  { id: "2", provinceName: "Hà Nội", provinceId: "1", code: "1", name: "Ba Đình" },
  { id: "3", provinceName: "Hà Nội", provinceId: "1", code: "277", name: "Chương Mỹ" },
  { id: "4", provinceName: "Hà Nội", provinceId: "1", code: "18", name: "Gia Lâm" },
  { id: "5", provinceName: "Hà Nội", provinceId: "1", code: "7", name: "Hai Bà Trưng" },
  { id: "6", provinceName: "Hà Nội", provinceId: "1", code: "274", name: "Hoài Đức" },
  { id: "7", provinceName: "Hà Nội", provinceId: "1", code: "2", name: "Hoàn Kiếm" },
  { id: "8", provinceName: "Hà Nội", provinceId: "1", code: "8", name: "Hoàng Mai" },
  { id: "9", provinceName: "Hà Nội", provinceId: "1", code: "268", name: "Hà Đông" },
  { id: "10", provinceName: "Hà Nội", provinceId: "1", code: "4", name: "Long Biên" },
];

export const districtService = {
  getList: async (params?: IDistrictSearchParams) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    let filtered = [...MOCK_DISTRICT_DATA];

    if (params?.name) filtered = filtered.filter(d => d.name.toLowerCase().includes(params.name!.toLowerCase()));
    if (params?.provinceId) filtered = filtered.filter(d => d.provinceId === params.provinceId);

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

    return { data: paginatedData, total: filtered.length } as IListResponse<IDistrict>;
  },

  updateNew: async (id: string | number, data: IDistrictRequest) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const index = MOCK_DISTRICT_DATA.findIndex(d => d.id === id);
    if (index !== -1) {
      MOCK_DISTRICT_DATA[index] = { ...MOCK_DISTRICT_DATA[index], ...data };
      return MOCK_DISTRICT_DATA[index];
    }
    throw new Error("Not found");
  },

  deleteNew: async (id: string | number) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    MOCK_DISTRICT_DATA = MOCK_DISTRICT_DATA.filter(d => d.id !== id);
    return true;
  },

  importData: async (data: IDistrict[]) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    MOCK_DISTRICT_DATA = [...data, ...MOCK_DISTRICT_DATA];
    return true;
  },

  getById: (id: string | number) => safeApiClient.get(`/v1/districts/${id}`) as Promise<IDistrict>,
  createNew: (data: IDistrictRequest) => safeApiClient.post("/v1/districts", data) as Promise<IDistrict>,
};