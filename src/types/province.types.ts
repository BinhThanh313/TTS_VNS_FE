import type { IPaginationParams } from "./common.types";
export interface IProvince {
  id: string | number;
  maTinh: string;
  tenTinh: string;
}
export interface IProvinceRequest {
  maTinh: string;
  tenTinh: string;
}
export interface IProvinceSearchParams extends IPaginationParams {
  tenTinh?: string;
  maTinh?: string;
}