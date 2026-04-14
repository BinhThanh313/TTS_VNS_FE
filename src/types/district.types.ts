export interface IDistrict {
  id: string | number;
  provinceName: string;
  provinceId?: string; // Tùy chọn nếu backend cần ID tỉnh để map
  code: string;
  name: string;
}

export interface IDistrictRequest {
  provinceId: string; // Bắt buộc khi tạo mới/cập nhật
  code: string;
  name: string;
}

export interface IDistrictSearchParams {
  name?: string;
  provinceId?: string; // Dùng khi filter theo tỉnh
}