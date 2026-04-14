import ExcelJS from "exceljs";
import type { IProvince, IDistrict, IWard } from "@/types";

const getSafeValue = (row: ExcelJS.Row, colIndex: number): string => {
  const cell = row.getCell(colIndex);
  if (!cell || cell.value === null || cell.value === undefined) return "";
  if (typeof cell.value === "object" && "result" in cell.value) return String(cell.value.result ?? "").trim();
  return String(cell.value).trim();
};

// ==========================================
// 1. ĐỌC FILE EXCEL TỈNH/THÀNH PHỐ
// ==========================================
export const parseProvinceExcel = async (file: File): Promise<IProvince[]> => {
  const buffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const worksheet = workbook.getWorksheet(1);
  const result: IProvince[] = [];
  const timestamp = Date.now();

  worksheet?.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const maTinh = getSafeValue(row, 1);
      const tenTinh = getSafeValue(row, 2);
      if (maTinh && tenTinh) result.push({ id: `prov-${timestamp}-${rowNumber}`, maTinh, tenTinh });
    }
  });
  return result;
};

// ==========================================
// 2. ĐỌC FILE EXCEL QUẬN/HUYỆN
// ==========================================
export const parseDistrictExcel = async (file: File, provinceName: string): Promise<IDistrict[]> => {
  const buffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const worksheet = workbook.getWorksheet(1);
  const result: IDistrict[] = [];
  const timestamp = Date.now();

  worksheet?.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const code = getSafeValue(row, 1);
      const name = getSafeValue(row, 2);
      if (code && name) {
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

// ==========================================
// 3. ĐỌC FILE EXCEL XÃ/PHƯỜNG (Dùng cho module Ward)
// ==========================================
export const parseWardExcel = async (file: File, districtName: string): Promise<IWard[]> => {
  const buffer = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const worksheet = workbook.getWorksheet(1);
  const result: IWard[] = [];
  const timestamp = Date.now();

  worksheet?.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      const code = getSafeValue(row, 1);
      const name = getSafeValue(row, 2);
      if (code && name) {
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