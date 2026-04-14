// 1. Dùng const object để có thể truy cập bằng dấu chấm (ActionMode.CREATE)
export const ActionMode = {
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  VIEW: "VIEW",
} as const;

// 2. Định nghĩa Type để tái sử dụng làm kiểu dữ liệu
export type ActionMode = (typeof ActionMode)[keyof typeof ActionMode];

// Các interface bên dưới là kiểu dữ liệu "thuần" nên không bị lỗi
export interface IPaginationParams {
  page?: number;
  pageSize?: number;
}

export interface IListResponse<T> {
  data: T[];
  total: number;
}