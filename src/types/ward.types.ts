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

export interface IWardSearchParams {
  districtId?: string;
  code?: string;
  name?: string;
}