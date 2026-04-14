import { safeApiClient } from "./apiClient";
// 🔥 THÊM: Import IListResponse và IProvince để báo kiểu dữ liệu cho TypeScript
import type { 
  IProvince, 
  IProvinceRequest, 
  IProvinceSearchParams, 
  IListResponse 
} from "@/types";

export const provinceService = {
  // Báo cho TypeScript biết hàm này trả về Promise chứa danh sách và tổng số (IListResponse)
  getList: (params?: IProvinceSearchParams) =>
    safeApiClient.get("/v1/provinces", { params }) as Promise<IListResponse<IProvince>>,

  // Báo cho TypeScript biết hàm này trả về 1 object Tỉnh (IProvince)
  getById: (id: string | number) =>
    safeApiClient.get(`/v1/provinces/${id}`) as Promise<IProvince>,

  createNew: (data: IProvinceRequest) =>
    safeApiClient.post("/v1/provinces", data) as Promise<IProvince>,

  updateNew: (id: string | number, data: IProvinceRequest) =>
    safeApiClient.put(`/v1/provinces/${id}`, data) as Promise<IProvince>,

  deleteNew: (id: string | number) =>
    safeApiClient.delete(`/v1/provinces/${id}`) as Promise<any>,
};