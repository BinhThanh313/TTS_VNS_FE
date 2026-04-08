import React from 'react';

export interface TabItem {
  key: string;
  label: React.ReactNode;
}

export const menuMap: Record<string, string> = {
  '/revenue': 'Doanh thu theo ngày',
  '/province': 'Tỉnh/Thành phố',
  '/district': 'Huyện/thị xã',
  '/ward': 'Xã/phường',
  '/clinic-service': 'Dịch vụ phòng khám',
  '/queue/test-all': 'Hàng đợi khám bệnh',
  '/dashboard': 'Dashboard',
  '/system': 'Quản trị hệ thống',
  '/accounts': 'Quản lý tài khoản',
  '/categories': 'Danh mục dùng chung',
  '/reports': 'Báo cáo',
  '/health-records': 'Hồ sơ sức khỏe',
  '/authorization': 'Quản lý ủy quyền',
};