export interface IRevenueSearchParams {
  fromDate: string;
  toDate: string;
}

export interface IChartRevenue {
  ngay: string;
  baoHiem: number;
  dichVu: number;
  tienMat: number;
  qrDong: number;
  qrTinh: number;
  pos: number;
  khac: number;
}

export interface IPieRevenue {
  name: string;
  value: number;
  color: string;
}

export interface IDoiTuongRevenue {
  id: string;
  stt: number | string;
  ngay: string;
  doiTuong: string;
  tongTien: number;
}

export interface IHTTTRevenue {
  id: string;
  stt: number | string;
  ngay: string;
  tienMat: number;
  qrDong: number;
  qrTinh: number;
  pos: number;
  khac: number;
  tongTien: number;
}

export interface IRevenueReportResponse {
  chartData: IChartRevenue[];
  pieData: IPieRevenue[];
  tableDoiTuong: IDoiTuongRevenue[];
  tableHTTT: IHTTTRevenue[];
}