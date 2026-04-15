import type { IRevenueSearchParams, IRevenueReportResponse } from "@/types";

// Di chuyển toàn bộ Mock Data vào đây (Đóng vai trò như Database)
const MOCK_CHART_DATA = [
  { ngay: '13/03', baoHiem: 15000000, dichVu: 10000000, tienMat: 20000000, qrDong: 30000000, qrTinh: 5000000, pos: 2000000, khac: 1000000 },
  { ngay: '14/03', baoHiem: 20000000, dichVu: 9000000, tienMat: 25000000, qrDong: 20000000, qrTinh: 6000000, pos: 3000000, khac: 1500000 },
  { ngay: '15/03', baoHiem: 14000000, dichVu: 23000000, tienMat: 15000000, qrDong: 35000000, qrTinh: 4000000, pos: 1000000, khac: 500000 },
  { ngay: '16/03', baoHiem: 18000000, dichVu: 15000000, tienMat: 22000000, qrDong: 28000000, qrTinh: 5500000, pos: 2500000, khac: 1200000 },
];

const MOCK_PIE_DATA = [
  { name: 'Tiền mặt', value: 60000000, color: '#3ba0e9' },
  { name: 'QRMB Động', value: 85000000, color: '#1d39c4' },
  { name: 'QRMB Tĩnh', value: 15000000, color: '#ff7f50' },
  { name: 'POS', value: 6000000, color: '#52c41a' },
  { name: 'Chuyển khoản khác', value: 3000000, color: '#722ed1' },
];

const MOCK_TABLE_DOI_TUONG = [
  { id: '1', stt: 1, ngay: '13/03/2025', doiTuong: 'Bảo hiểm (BHYT)', tongTien: 15000000 },
  { id: '2', stt: 2, ngay: '13/03/2025', doiTuong: 'Dịch vụ', tongTien: 10000000 },
  { id: '3', stt: 3, ngay: '14/03/2025', doiTuong: 'Bảo hiểm (BHYT)', tongTien: 20000000 },
  { id: '4', stt: 4, ngay: '14/03/2025', doiTuong: 'Dịch vụ', tongTien: 9000000 },
];

const MOCK_TABLE_HTTT = [
  { id: '1', stt: 1, ngay: '13/03/2025', tienMat: 20000000, qrDong: 30000000, qrTinh: 5000000, pos: 2000000, khac: 1000000, tongTien: 58000000 },
  { id: '2', stt: 2, ngay: '14/03/2025', tienMat: 25000000, qrDong: 20000000, qrTinh: 6000000, pos: 3000000, khac: 1500000, tongTien: 55500000 },
  { id: 'total', stt: '', ngay: 'Tổng', tienMat: 45000000, qrDong: 50000000, qrTinh: 11000000, pos: 5000000, khac: 2500000, tongTien: 113500000 },
];

export const revenueService = {
  getReportData: async (params: IRevenueSearchParams): Promise<IRevenueReportResponse> => {
    // Giả lập call API mất 500ms
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("Fetching data with params:", params); // Sau này thay bằng axios call
    
    return {
      chartData: MOCK_CHART_DATA,
      pieData: MOCK_PIE_DATA,
      tableDoiTuong: MOCK_TABLE_DOI_TUONG,
      tableHTTT: MOCK_TABLE_HTTT
    };
  }
};