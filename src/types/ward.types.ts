import type { IPaginationParams } from "./common.types";
export interface IWard {
  id: string | number;
  districtName: string;
  districtId?: string; 
  code: string;
  name: string;
}

export interface IWardRequest {
  districtId: string; // ID của Quận/Huyện chứa Xã này
  code: string;
  name: string;
}

export interface IWardSearchParams extends IPaginationParams {
  districtId?: string;
  code?: string;
  name?: string;
}