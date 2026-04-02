export const mockChartData = [
  { ngay: '13/03/2025', baoHiem: 15000000, dichVu: 10000000, tienMat: 20000000, qrDong: 30000000, qrTinh: 5000000, pos: 2000000, khac: 1000000 },
  { ngay: '14/03/2025', baoHiem: 20000000, dichVu: 9000000, tienMat: 25000000, qrDong: 20000000, qrTinh: 6000000, pos: 3000000, khac: 1500000 },
  { ngay: '15/03/2025', baoHiem: 14000000, dichVu: 23000000, tienMat: 15000000, qrDong: 35000000, qrTinh: 4000000, pos: 1000000, khac: 500000 },
];

export const mockPieData = [
  { name: 'Tiền mặt', value: 60000000, color: '#3ba0e9' },
  { name: 'QRMB Động', value: 85000000, color: '#1d39c4' },
  { name: 'QRMB Tĩnh', value: 15000000, color: '#ff7f50' },
  { name: 'POS', value: 6000000, color: '#52c41a' },
  { name: 'Chuyển khoản khác', value: 3000000, color: '#722ed1' },
];

export const mockTableDoiTuong = [
  { id: '1', stt: 1, ngay: '08/09/2025', doiTuong: 'Khám sức khỏe xuất khẩu lao động', tongTien: 75086000 },
  { id: '2', stt: 2, ngay: '08/09/2025', doiTuong: 'Nước ngoài', tongTien: 1850000 },
  { id: '3', stt: 3, ngay: '08/09/2025', doiTuong: 'BHYT', tongTien: 1384148095 },
];

export const mockTableHTTT = [
  { id: '1', stt: 1, ngay: '04/08/2025', tienMat: 0, qrDong: 683990494, qrTinh: 16752600, pos: 0, khac: 219521392, tongTien: 920264486 },
];

// Định nghĩa cột cho bảng Đối tượng
export const columnsDoiTuong = [
  { title: 'STT', dataIndex: 'stt', align: 'center' as const, width: 80 },
  { title: 'Ngày', dataIndex: 'ngay', align: 'center' as const },
  { title: 'Đối tượng', dataIndex: 'doiTuong' },
  { title: 'Tổng tiền', dataIndex: 'tongTien', align: 'right' as const, render: (val: number) => val.toLocaleString('vi-VN') },
];

// Định nghĩa cột cho bảng Hình thức thanh toán
export const columnsHTTT = [
  { title: 'STT', dataIndex: 'stt', align: 'center' as const, width: 80 },
  { title: 'Ngày', dataIndex: 'ngay', align: 'center' as const },
  {
    title: 'Hình thức thanh toán', 
    children: [
      { title: 'Tiền mặt', dataIndex: 'tienMat', align: 'right' as const, render: (val: number) => val.toLocaleString('vi-VN') },
      { title: 'QRMB Động', dataIndex: 'qrDong', align: 'right' as const, render: (val: number) => val.toLocaleString('vi-VN') },
      { title: 'QRMB Tĩnh', dataIndex: 'qrTinh', align: 'right' as const, render: (val: number) => val.toLocaleString('vi-VN') },
      { title: 'POS MB', dataIndex: 'pos', align: 'right' as const, render: (val: number) => val.toLocaleString('vi-VN') },
      { title: 'Chuyển khoản khác', dataIndex: 'khac', align: 'right' as const, render: (val: number) => val.toLocaleString('vi-VN') },
    ],
  },
  { title: 'Tổng tiền', dataIndex: 'tongTien', align: 'right' as const, render: (val: number) => val.toLocaleString('vi-VN'), className: 'font-bold' },
];