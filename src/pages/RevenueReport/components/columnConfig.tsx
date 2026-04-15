import type { IDoiTuongRevenue, IHTTTRevenue } from "@/types";

const formatMoney = (val: number | string) => typeof val === 'number' ? new Intl.NumberFormat('vi-VN').format(val) : val;
const pinkHeader = () => ({ className: "bg-[#ffadd2] text-center" });

export const columnsDoiTuong = [
  { title: 'STT', dataIndex: 'stt', align: 'center' as const, width: 80, onHeaderCell: () => ({ className: "bg-[#e6f7ff]" }) },
  { title: 'Ngày', dataIndex: 'ngay', align: 'center' as const, onHeaderCell: () => ({ className: "bg-[#e6f7ff]" }) },
  { title: 'Đối tượng', dataIndex: 'doiTuong', align: 'left' as const, onHeaderCell: () => ({ className: "bg-[#ffd8a8]" }) }, 
  { title: 'Tổng tiền', dataIndex: 'tongTien', align: 'right' as const, onHeaderCell: () => ({ className: "bg-[#e6f7ff] text-center" }), render: formatMoney },
];

export const columnsHTTT = [
  { 
    title: 'STT', dataIndex: 'stt', align: 'center' as const, width: 80, 
    onHeaderCell: () => ({ className: "bg-[#e6f7ff]" }),
    render: (val: number | string, record: IHTTTRevenue) => record.id === 'total' ? <strong>{val}</strong> : val 
  },
  { 
    title: 'Ngày', dataIndex: 'ngay', align: 'center' as const, 
    onHeaderCell: () => ({ className: "bg-[#e6f7ff]" }),
    render: (val: string, record: IHTTTRevenue) => record.id === 'total' ? <strong>{val}</strong> : val 
  },
  {
    title: 'Hình thức thanh toán', 
    onHeaderCell: () => ({ className: "bg-[#b7eb8f] text-center" }), 
    children: [
      { title: 'Tiền mặt', dataIndex: 'tienMat', align: 'right' as const, onHeaderCell: pinkHeader, render: (val: number, record: IHTTTRevenue) => record.id === 'total' ? <strong>{formatMoney(val)}</strong> : formatMoney(val) },
      { title: 'QRMB Động', dataIndex: 'qrDong', align: 'right' as const, onHeaderCell: pinkHeader, render: (val: number, record: IHTTTRevenue) => record.id === 'total' ? <strong>{formatMoney(val)}</strong> : formatMoney(val) },
      { title: 'QRMB Tĩnh', dataIndex: 'qrTinh', align: 'right' as const, onHeaderCell: pinkHeader, render: (val: number, record: IHTTTRevenue) => record.id === 'total' ? <strong>{formatMoney(val)}</strong> : formatMoney(val) },
      { title: 'POS', dataIndex: 'pos', align: 'right' as const, onHeaderCell: pinkHeader, render: (val: number, record: IHTTTRevenue) => record.id === 'total' ? <strong>{formatMoney(val)}</strong> : formatMoney(val) },
      { title: 'Chuyển khoản khác', dataIndex: 'khac', align: 'right' as const, onHeaderCell: pinkHeader, render: (val: number, record: IHTTTRevenue) => record.id === 'total' ? <strong>{formatMoney(val)}</strong> : formatMoney(val) },
    ],
  },
  { 
    title: 'Tổng tiền', dataIndex: 'tongTien', align: 'right' as const, 
    onHeaderCell: () => ({ className: "bg-[#e6f7ff] text-center" }), 
    render: (val: number) => <strong>{formatMoney(val)}</strong> 
  },
];