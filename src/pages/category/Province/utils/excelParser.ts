import ExcelJS from 'exceljs';
import type { IProvince } from '@/types/category';

export const parseProvinceExcel = async (file: File): Promise<IProvince[]> => {
  const buffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const worksheet = workbook.getWorksheet(1);

  const result: IProvince[] = [];
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
    if (rowNumber > 1) { 
      const maTinh = getSafeValue(row, 1);
      const tenTinh = getSafeValue(row, 2);

      if (maTinh && tenTinh) {
        result.push({
          id: `prov-${timestamp}-${rowNumber}`,
          maTinh,
          tenTinh,
        });
      }
    }
  });

  return result;
};