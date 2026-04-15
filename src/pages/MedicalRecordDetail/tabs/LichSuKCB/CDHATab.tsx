import { Collapse, Table } from "antd";
import { MonitorPlay } from "lucide-react";

export const CDHATab = () => {
  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: 60, align: "center" as const },
    { title: "Ngày giờ chỉ định", dataIndex: "ngay", key: "ngay", align: "center" as const },
    { title: "Nhóm dịch vụ", dataIndex: "nhom", key: "nhom", align: "left" as const },
    { title: "Tên dịch vụ", dataIndex: "ten", key: "ten", align: "left" as const },
  ];

  const data = [
    { key: "1", stt: 1, ngay: "15/10/2026 11:14", nhom: "X-Quang", ten: "X-quang ngực thẳng" },
    { key: "2", stt: 2, ngay: "15/10/2026 10:30", nhom: "Siêu âm", ten: "Siêu âm ổ bụng" },
  ];

  const collapseItems = [
    {
      key: "1",
      label: <span className="text-[#0008b0] font-bold uppercase">Kết quả chi tiết</span>,
      className: "[&>.ant-collapse-header]:bg-[#f0f5ff] [&>.ant-collapse-header]:border-b [&>.ant-collapse-header]:border-gray-300",
      children: (
        <div className="p-4 bg-white">
          <div className="mb-3">
            <span className="font-bold text-gray-800 mr-2">Ngày giờ kết quả:</span>
            <span className="text-gray-700">15/10/2026 10:30</span>
          </div>
          <div className="font-bold mb-2 text-gray-800">Mô tả chi tiết:</div>
          <ul className="list-disc pl-5 mb-4 text-gray-700 space-y-1">
            <li>Lồng ngực cân đối.</li>
            <li>Hai trường phổi sáng, không thấy hình ảnh tổn thương khu trú mô phổi.</li>
            <li>Rốn phổi hai bên đậm. Bóng tim không to.</li>
            <li>Vòm hoành hai bên nhẵn, góc sườn hoành hai bên nhọn.</li>
          </ul>
          <div className="font-bold mb-1 text-gray-800">Kết luận:</div>
          <div className="text-[#0008b0] uppercase font-medium">
            Hiện tại chưa thấy hình ảnh bất thường trên phim chụp X-quang ngực thẳng
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Table columns={columns} dataSource={data} pagination={false} size="small" />
      <Collapse 
        defaultActiveKey={["1"]} 
        items={collapseItems} 
        expandIconPosition="end" 
        className="border border-gray-300 rounded-lg bg-white overflow-hidden" 
      />
    </div>
  );
};