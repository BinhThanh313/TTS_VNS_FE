import { Input, Select, DatePicker, Collapse } from "antd";
import { Search, Eye, ChevronDown } from "lucide-react";
import { DataTable } from "@/components/common";

const { RangePicker } = DatePicker;

interface Props {
  onSelectRecord: (id: string) => void;
}

export const LichSuList = ({ onSelectRecord }: Props) => {
  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: 60, align: "center" as const },
    { title: "Tên khám", dataIndex: "tenKham", key: "tenKham", align: "left" as const },
    { title: "Nơi KCB", dataIndex: "noiKCB", key: "noiKCB", align: "left" as const },
    { title: "Ngày vào viện", dataIndex: "ngayVao", key: "ngayVao", align: "center" as const },
    { title: "Ngày ra viện", dataIndex: "ngayRa", key: "ngayRa", align: "center" as const },
    { title: "Loại KCB", dataIndex: "loaiKCB", key: "loaiKCB", align: "center" as const },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      align: "center" as const,
      render: (_: unknown, record: any) => (
        <button
          onClick={() => onSelectRecord(record.key)}
          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-[#0008b0] bg-transparent border border-[#0008b0] rounded transition-colors hover:bg-[#f0f5ff]"
        >
          <Eye size={14} /> Xem
        </button>
      ),
    },
  ];

  const data = [
    { key: "1", stt: 1, tenKham: "Viêm họng cấp", noiKCB: "Bệnh xá CA Hà Nam", ngayVao: "01/01/2026", ngayRa: "01/01/2026", loaiKCB: "Ngoại trú" },
    { key: "2", stt: 2, tenKham: "Viêm dạ dày", noiKCB: "Bệnh viện 19-8", ngayVao: "15/01/2026", ngayRa: "18/01/2026", loaiKCB: "Nội trú" },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Bộ lọc */}
      <div className="flex gap-4 p-4 border border-gray-200 rounded-lg items-center flex-wrap">
        <Input prefix={<Search size={16} className="text-gray-400" />} placeholder="Nhập Tên khám hoặc Nơi KCB" className="flex-1 min-w-[200px]" />
        <Select placeholder="Chọn loại KCB" className="w-[150px]" options={[{ value: "ngoaitru", label: "Ngoại trú" }, { value: "noitru", label: "Nội trú" }]} />
        <RangePicker format="DD/MM/YYYY" placeholder={["Từ ngày", "Đến ngày"]} className="w-[250px]" />
        <button className="h-[32px] px-4 bg-[#0008b0] text-white rounded flex items-center justify-center hover:bg-[#1d39c4]">
          <Search size={16} />
        </button>
      </div>

      <Collapse
        defaultActiveKey={["1"]}
        expandIcon={({ isActive }) => <ChevronDown size={18} className={`text-[#0008b0] transition-transform ${isActive ? "rotate-180" : ""}`} />}
        className="border border-gray-300 rounded-lg bg-white overflow-hidden"
        items={[
          {
            key: "1",
            label: <span className="text-[#0008b0] font-bold uppercase">Lịch sử khám chữa bệnh theo từng đợt khám</span>,
            className: "[&>.ant-collapse-header]:bg-[#f0f5ff] [&>.ant-collapse-header]:border-b [&>.ant-collapse-header]:border-gray-300",
            children: <div className="p-4 bg-white"><DataTable columns={columns} dataSource={data} pagination={false} /></div>,
          },
        ]}
      />
    </div>
  );
};