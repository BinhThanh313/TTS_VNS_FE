import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import dayjs from 'dayjs';

// Định dạng Header dùng chung
const headerStyle = {
  font: { bold: true, color: { argb: 'FFFFFFFF' } },
  fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1890FF' } },
  alignment: { vertical: 'middle', horizontal: 'center' },
  border: { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
} as const;

// ==========================================
// HÀM XUẤT EXCEL CHO BÁO CÁO DOANH THU
// ==========================================
export const exportRevenueReportExcel = async (type: 'doi-tuong' | 'httt', data: any[]) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Báo cáo');

  if (type === 'doi-tuong') {
    worksheet.columns = [
      { header: 'STT', key: 'stt', width: 10 },
      { header: 'Ngày', key: 'ngay', width: 20 },
      { header: 'Đối tượng', key: 'doiTuong', width: 35 },
      { header: 'Tổng tiền', key: 'tongTien', width: 25 },
    ];
  } else {
    worksheet.columns = [
      { header: 'STT', key: 'stt', width: 10 },
      { header: 'Ngày', key: 'ngay', width: 20 },
      { header: 'Tiền mặt', key: 'tienMat', width: 20 },
      { header: 'QRMB Động', key: 'qrDong', width: 20 },
      { header: 'QRMB Tĩnh', key: 'qrTinh', width: 20 },
      { header: 'POS', key: 'pos', width: 20 },
      { header: 'Chuyển khoản khác', key: 'khac', width: 25 },
      { header: 'Tổng tiền', key: 'tongTien', width: 25 },
    ];
  }

  // Đổ dữ liệu vào bảng
  data.forEach((row) => worksheet.addRow(row));

  // Trang trí Header
  worksheet.getRow(1).eachCell((cell) => {
    Object.assign(cell, headerStyle);
  });

  // Format số tiền (thêm dấu phẩy nghìn)
  const startMoneyCol = type === 'doi-tuong' ? 4 : 3;
  const endMoneyCol = type === 'doi-tuong' ? 4 : 8;
  
  for (let i = 2; i <= worksheet.rowCount; i++) {
    for (let j = startMoneyCol; j <= endMoneyCol; j++) {
       const cell = worksheet.getRow(i).getCell(j);
       cell.numFmt = '#,##0'; 
    }
  }

  // Lưu file
  const buffer = await workbook.xlsx.writeBuffer();
  const fileName = `BC_DoanhThu_${type === 'doi-tuong' ? 'DoiTuong' : 'HTTT'}_${dayjs().format('DDMMYYYY')}.xlsx`;
  saveAs(new Blob([buffer]), fileName);
};