export interface IProvince {
  id: string | number;
  maTinh: string;
  tenTinh: string;
}
export interface IProvinceRequest {
  maTinh: string;
  tenTinh: string;
}
export interface IProvinceSearchParams {
  tenTinh?: string;
  maTinh?: string;
}