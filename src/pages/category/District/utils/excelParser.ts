import ExcelJS from 'exceljs';
import type { IDistrict } from '@/types/category';

export const parseDistrictExcel = async (file: File, provinceName: string): Promise<IDistrict[]> => {
  const buffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const worksheet = workbook.getWorksheet(1);

  const result: IDistrict[] = [];
  const timestamp = Date.now();

  // Hàm lấy giá trị ô an toàn (chống lỗi báo null hoặc undefined khi ô Excel trống)
  const getSafeValue = (row: any, colIndex: number) => {
    const cell = row.getCell(colIndex);
    if (!cell || cell.value === null || cell.value === undefined) return "";
    if (typeof cell.value === 'object' && 'result' in cell.value) {
      return cell.value.result?.toString().trim() || "";
    }
    return cell.value.toString().trim();
  };

  worksheet?.eachRow((row, rowNumber) => {
    // Bỏ qua dòng số 1 (dòng tiêu đề cột trong Excel)
    if (rowNumber > 1) { 
      const code = getSafeValue(row, 1);
      const name = getSafeValue(row, 2);

      // Chỉ lấy những dòng có cả mã và tên
      if (code !== "" && name !== "") {
        result.push({
          id: `dist-${timestamp}-${rowNumber}`,
          provinceName,
          code,
          name,
        });
      }
    }
  });

  return result;
};