import ExcelJS from 'exceljs';
import type { IWard } from '@/types/category';

export const parseWardExcel = async (file: File, districtName: string): Promise<IWard[]> => {
  const buffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const worksheet = workbook.getWorksheet(1);

  const result: IWard[] = [];
  const timestamp = Date.now();

  const getSafeValue = (row: any, colIndex: number) => {
    const cell = row.getCell(colIndex);
    if (!cell || cell.value === null || cell.value === undefined) return "";
    if (typeof cell.value === 'object' && 'result' in cell.value) {
      return cell.value.result?.toString().trim() || "";
    }
    return cell.value.toString().trim();
  };

  worksheet?.eachRow((row, rowNumber) => {
    if (rowNumber > 1) { // Bỏ qua tiêu đề
      const code = getSafeValue(row, 1);
      const name = getSafeValue(row, 2);

      if (code !== "" && name !== "") {
        result.push({
          id: `ward-${timestamp}-${rowNumber}`,
          districtName,
          code,
          name,
        });
      }
    }
  });

  return result;
};