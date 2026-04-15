import { Collapse, Table } from "antd";
import { Users } from "lucide-react";

export const XetNghiemTab = () => {
  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: 60, align: "center" as const },
    { title: "Tên chỉ số", dataIndex: "ten", key: "ten", align: "left" as const },
    { title: "Kết quả", dataIndex: "kq", key: "kq", align: "center" as const },
    { title: "Đơn vị đo", dataIndex: "donvi", key: "donvi", align: "center" as const },
    { title: "Ngày giờ kết quả", dataIndex: "ngay", key: "ngay", align: "center" as const },
    { title: "Bác sĩ thực hiện", dataIndex: "bs", key: "bs", align: "center" as const },
  ];

  const data = [
    { key: "1", stt: 1, ten: "Glucose", kq: "5.4", donvi: "mmol/L", ngay: "...", bs: "..." },
    { key: "2", stt: 2, ten: "Ure", kq: "4.2", donvi: "mmol/L", ngay: "...", bs: "..." },
  ];

  const ChiDinhContent = () => (
    <div className="p-4 bg-white">
      <div className="font-bold mb-3 text-gray-800">Chỉ số chi tiết:</div>
      <Table columns={columns} dataSource={data} pagination={false} size="small" />
      <div className="mt-4">
        <div className="font-bold mb-1 text-gray-800">Kết luận:</div>
        <div className="text-[#0008b0] uppercase font-medium">Hiện tại chưa thấy bất thường</div>
      </div>
    </div>
  );

  const innerCollapseItems = [
    {
      key: "1",
      label: <span className="font-semibold text-[#0008b0]">Chỉ định 1: Xét nghiệm sinh hóa máu</span>,
      children: <ChiDinhContent />,
      className: "mb-3 border border-gray-300 rounded-lg bg-white overflow-hidden",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="end"
        className="border border-gray-300 rounded-lg bg-white"
        items={[
          {
            key: "1",
            label: (
              <span className="text-[#0008b0] font-bold flex items-center gap-2">
                <Users size={18} /> Ngày: 01/01/2026 - BS: Nguyễn Minh Khoa
              </span>
            ),
            className: "[&>.ant-collapse-header]:bg-[#f0f5ff] [&>.ant-collapse-header]:border-b [&>.ant-collapse-header]:border-gray-300",
            children: <Collapse defaultActiveKey={["1"]} items={innerCollapseItems} ghost expandIconPosition="end" />,
          },
        ]}
      />
    </div>
  );
};