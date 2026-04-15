import { Table, Collapse } from "antd";

export const DonThuocTab = () => {
  const dsDonThuocColumns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: 60, align: "center" as const },
    { title: "Ngày giờ kê đơn", dataIndex: "ngay", key: "ngay", align: "center" as const },
    { title: "Bác sĩ chỉ định", dataIndex: "bs", key: "bs", align: "center" as const },
  ];

  const chiTietThuocColumns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: 60, align: "center" as const },
    { title: "Tên thuốc", dataIndex: "ten", key: "ten", align: "left" as const },
    { title: "Hàm lượng", dataIndex: "hamluong", key: "hamluong", align: "center" as const },
    { title: "Liều dùng", dataIndex: "lieudung", key: "lieudung", align: "center" as const },
    { title: "Số lượng", dataIndex: "soluong", key: "soluong", align: "center" as const },
    { title: "Đơn vị", dataIndex: "donvi", key: "donvi", align: "center" as const },
    { title: "Cách dùng", dataIndex: "cachdung", key: "cachdung", align: "left" as const },
  ];

  const KetQuaChiTiet = () => (
    <div className="p-4 bg-white">
      <div className="mb-4">
        <span className="font-bold text-[#0008b0] mr-2">Ngày giờ kê đơn:</span>
        <span className="text-gray-700">...........................................</span>
      </div>
      <div className="font-bold mb-3 text-gray-800">Đơn thuốc chi tiết:</div>
      <Table columns={chiTietThuocColumns} dataSource={[]} pagination={false} size="small" />
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <Table columns={dsDonThuocColumns} dataSource={[{ key: "1", stt: 1, ngay: "...", bs: "..." }]} pagination={false} size="small" />
      
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="end"
        className="border border-gray-300 rounded-lg bg-white overflow-hidden"
        items={[
          {
            key: "1",
            label: <span className="text-[#0008b0] font-bold uppercase">Kết quả chi tiết</span>,
            className: "[&>.ant-collapse-header]:bg-[#f0f5ff] [&>.ant-collapse-header]:border-b [&>.ant-collapse-header]:border-gray-300",
            children: <KetQuaChiTiet />,
          },
        ]}
      />
    </div>
  );
};