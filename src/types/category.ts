export interface IProvince {
  id: string | number;
  maTinh: string;
  tenTinh: string;
}

export interface IDistrict {
  id: string | number;
  provinceName: string;
  code: string;
  name: string;
}

export interface IWard {
  id: string | number;
  districtName: string;
  code: string;
  name: string;
}