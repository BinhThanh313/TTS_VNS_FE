import { safeApiClient } from "./apiClient";
import type { 
  IDistrict, 
  IDistrictRequest, 
  IDistrictSearchParams, 
  IListResponse 
} from "@/types";

export const districtService = {
  getList: (params?: IDistrictSearchParams) =>
    safeApiClient.get("/v1/districts", { params }) as Promise<IListResponse<IDistrict>>,

  getById: (id: string | number) =>
    safeApiClient.get(`/v1/districts/${id}`) as Promise<IDistrict>,

  createNew: (data: IDistrictRequest) =>
    safeApiClient.post("/v1/districts", data) as Promise<IDistrict>,

  updateNew: (id: string | number, data: IDistrictRequest) =>
    safeApiClient.put(`/v1/districts/${id}`, data) as Promise<IDistrict>,

  deleteNew: (id: string | number) =>
    safeApiClient.delete(`/v1/districts/${id}`) as Promise<any>,
};