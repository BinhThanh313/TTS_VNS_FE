import { safeApiClient } from "./apiClient";
import type { IWard, IWardRequest, IWardSearchParams, IListResponse } from "@/types";

// ==========================================
// MOCK DATA: Database tạm thời trên RAM
// ==========================================
let MOCK_WARD_DATA: IWard[] = [
  { id: "1", districtName: "Ba Đình", districtId: "1", code: "4", name: "Phường Ba Đình" },
  { id: "2", districtName: "Hai Bà Trưng", districtId: "5", code: "277", name: "Phường Bạch Mai" },
  { id: "3", districtName: "Long Biên", districtId: "10", code: "130", name: "Phường Bồ Đề" },
  { id: "4", districtName: "Chương Mỹ", districtId: "3", code: "10015", name: "Phường Chương Mỹ" },
  { id: "5", districtName: "Cầu Giấy", districtId: "11", code: "167", name: "Phường Cầu Giấy" },
  { id: "6", districtName: "Hoàn Kiếm", districtId: "7", code: "73", name: "Phường Cửa Nam" },
  { id: "7", districtName: "Hà Đông", districtId: "9", code: "9886", name: "Phường Dương Nội" },
  { id: "8", districtName: "Ba Đình", districtId: "1", code: "25", name: "Phường Giảng Võ" },
  { id: "9", districtName: "Hai Bà Trưng", districtId: "5", code: "256", name: "Phường Hai Bà Trưng" },
  { id: "10", districtName: "Hoàn Kiếm", districtId: "7", code: "70", name: "Phường Hoàn Kiếm" },
];

export const wardService = {
  getList: async (params?: IWardSearchParams) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    let filtered = [...MOCK_WARD_DATA];

    if (params?.code) filtered = filtered.filter(w => w.code.includes(params.code!));
    if (params?.name) filtered = filtered.filter(w => w.name.toLowerCase().includes(params.name!.toLowerCase()));
    if (params?.districtId) filtered = filtered.filter(w => w.districtId === params.districtId);

    const page = params?.page || 1;
    const pageSize = params?.pageSize || 10;
    const startIndex = (page - 1) * pageSize;
    const paginatedData = filtered.slice(startIndex, startIndex + pageSize);

    return { data: paginatedData, total: filtered.length } as IListResponse<IWard>;
  },

  updateNew: async (id: string | number, data: IWardRequest) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const index = MOCK_WARD_DATA.findIndex(w => w.id === id);
    if (index !== -1) {
      MOCK_WARD_DATA[index] = { ...MOCK_WARD_DATA[index], ...data };
      return MOCK_WARD_DATA[index];
    }
    throw new Error("Not found");
  },

  deleteNew: async (id: string | number) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    MOCK_WARD_DATA = MOCK_WARD_DATA.filter(w => w.id !== id);
    return true;
  },

  importData: async (data: IWard[]) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    MOCK_WARD_DATA = [...data, ...MOCK_WARD_DATA];
    return true;
  },

  getById: (id: string | number) => safeApiClient.get(`/v1/wards/${id}`) as Promise<IWard>,
  createNew: (data: IWardRequest) => safeApiClient.post("/v1/wards", data) as Promise<IWard>,
};