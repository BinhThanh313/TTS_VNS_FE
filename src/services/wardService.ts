import { safeApiClient } from "./apiClient";
import type { 
  IWard, 
  IWardRequest, 
  IWardSearchParams, 
  IListResponse 
} from "@/types";

export const wardService = {
  getList: (params?: IWardSearchParams) =>
    safeApiClient.get("/v1/wards", { params }) as Promise<IListResponse<IWard>>,

  getById: (id: string | number) =>
    safeApiClient.get(`/v1/wards/${id}`) as Promise<IWard>,

  // Mặc dù UI không có nút Thêm mới, nhưng vẫn khai báo để dự phòng API hoặc dùng cho Import ngầm
  createNew: (data: IWardRequest) =>
    safeApiClient.post("/v1/wards", data) as Promise<IWard>,

  updateNew: (id: string | number, data: IWardRequest) =>
    safeApiClient.put(`/v1/wards/${id}`, data) as Promise<IWard>,

  deleteNew: (id: string | number) =>
    safeApiClient.delete(`/v1/wards/${id}`) as Promise<any>,
};