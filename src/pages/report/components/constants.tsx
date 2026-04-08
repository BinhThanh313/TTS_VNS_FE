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
  { id: '3', stt: 3, ngay: '08/09/2025', doiTuong: 'BHYT', tongTien: 1384148095.91 },
];

export const mockTableHTTT = [
  { id: '1', stt: 1, ngay: '04/08/2025', tienMat: 0, qrDong: 683990494.04, qrTinh: 16752600, pos: 0, khac: 219521392, tongTien: 920264486.04 },
  { id: 'total', stt: '', ngay: 'Tổng', tienMat: 0, qrDong: 683990494.04, qrTinh: 16752600, pos: 0, khac: 219521392, tongTien: 920264486.04 },
];

const formatMoney = (val: any) => typeof val === 'number' ? new Intl.NumberFormat('vi-VN').format(val) : val;

export const columnsDoiTuong = [
  { title: 'STT', dataIndex: 'stt', align: 'center' as const, width: 80, onHeaderCell: () => ({ style: { backgroundColor: '#e6f7ff' } }) },
  { title: 'Ngày', dataIndex: 'ngay', align: 'center' as const, onHeaderCell: () => ({ style: { backgroundColor: '#e6f7ff' } }) },
  { title: 'Đối tượng', dataIndex: 'doiTuong', align: 'center' as const, onHeaderCell: () => ({ style: { backgroundColor: '#ffd8a8' } }) }, // Cam nhạt
  { title: 'Tổng tiền', dataIndex: 'tongTien', align: 'right' as const, onHeaderCell: () => ({ style: { backgroundColor: '#e6f7ff', textAlign: 'center' as const } }), render: formatMoney },
];

const pinkHeader = () => ({ style: { backgroundColor: '#ffadd2', textAlign: 'center' as const } }); // Hồng nhạt cho các cột con

export const columnsHTTT = [
  { 
    title: 'STT', dataIndex: 'stt', align: 'center' as const, width: 80, 
    onHeaderCell: () => ({ style: { backgroundColor: '#e6f7ff' } }),
    render: (val: any, record: any) => record.id === 'total' ? <strong>{val}</strong> : val 
  },
  { 
    title: 'Ngày', dataIndex: 'ngay', align: 'center' as const, 
    onHeaderCell: () => ({ style: { backgroundColor: '#e6f7ff' } }),
    render: (val: any, record: any) => record.id === 'total' ? <strong>{val}</strong> : val 
  },
  {
    title: 'Hình thức thanh toán', 
    onHeaderCell: () => ({ style: { backgroundColor: '#b7eb8f', textAlign: 'center' as const } }), // Xanh lá cây
    children: [
      { title: 'Tiền mặt', dataIndex: 'tienMat', align: 'right' as const, onHeaderCell: pinkHeader, render: (val: any, record: any) => record.id === 'total' ? <strong>{formatMoney(val)}</strong> : formatMoney(val) },
      { title: 'QRMB Động', dataIndex: 'qrDong', align: 'right' as const, onHeaderCell: pinkHeader, render: (val: any, record: any) => record.id === 'total' ? <strong>{formatMoney(val)}</strong> : formatMoney(val) },
      { title: 'QRMB Tĩnh', dataIndex: 'qrTinh', align: 'right' as const, onHeaderCell: pinkHeader, render: (val: any, record: any) => record.id === 'total' ? <strong>{formatMoney(val)}</strong> : formatMoney(val) },
      { title: 'POS MB', dataIndex: 'pos', align: 'right' as const, onHeaderCell: pinkHeader, render: (val: any, record: any) => record.id === 'total' ? <strong>{formatMoney(val)}</strong> : formatMoney(val) },
      { title: 'Chuyển khoản khác', dataIndex: 'khac', align: 'right' as const, onHeaderCell: pinkHeader, render: (val: any, record: any) => record.id === 'total' ? <strong>{formatMoney(val)}</strong> : formatMoney(val) },
    ],
  },
  { 
    title: 'Tổng tiền', 
    dataIndex: 'tongTien', 
    align: 'right' as const, 
    onHeaderCell: () => ({ style: { backgroundColor: '#e6f7ff', textAlign: 'center' as const } }), // Tiêu đề ép căn giữa
    render: (val: any) => <strong>{formatMoney(val)}</strong> 
  },
];