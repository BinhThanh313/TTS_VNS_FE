import { Table, Collapse, Row, Col } from "antd";
import { Scissors } from "lucide-react";
import { DetailField } from "../../components/DetailField";

export const PhauThuatThuThuatTab = () => {
  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: 60, align: "center" as const },
    { title: "Ngày giờ thực hiện", dataIndex: "ngay", key: "ngay", align: "center" as const },
    { title: "Tên dịch vụ", dataIndex: "ten", key: "ten", align: "left" as const },
  ];

  const data = [
    { key: "1", stt: 1, ngay: "...", ten: "..." },
  ];

  const KetQuaChiTiet = () => (
    <Collapse
      defaultActiveKey={["1"]}
      expandIconPosition="end"
      className="mt-4 border border-gray-300 rounded-lg bg-white overflow-hidden"
      items={[
        {
          key: "1",
          label: <span className="text-[#0008b0] font-bold uppercase">Kết quả chi tiết</span>,
          className: "[&>.ant-collapse-header]:bg-[#f0f5ff] [&>.ant-collapse-header]:border-b [&>.ant-collapse-header]:border-gray-300",
          children: (
            <div className="p-4 bg-white">
              <Row gutter={24}>
                <Col span={8}><DetailField label="Ngày giờ thực hiện" value="15/10/2026 11:14" /></Col>
                <Col span={8}><DetailField label="Người thực hiện" value="Lâm Trọng Hà" /></Col>
                <Col span={8}><DetailField label="Vị trí thực hiện" /></Col>
              </Row>
              <div className="mt-2">
                <div className="text-gray-500 text-[13px] mb-1">Phương pháp vô cảm</div>
                <div className="font-medium text-gray-800 mb-4">1: Gây mê</div>
                <div className="text-gray-500 text-[13px] mb-1">Cách thức thực hiện</div>
                <ul className="list-disc pl-5 m-0 font-medium text-gray-800 space-y-1">
                  <li>Cách 1: ...............................................</li>
                  <li>Cách 2: ...............................................</li>
                  <li>Cách 3: ...............................................</li>
                </ul>
              </div>
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <div className="flex flex-col gap-6">
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="end"
        className="border border-gray-300 rounded-lg bg-white overflow-hidden"
        items={[
          {
            key: "1",
            label: (
              <span className="text-[#0008b0] font-bold uppercase flex items-center gap-2">
                <Scissors size={18} /> Phẫu thuật
              </span>
            ),
            className: "[&>.ant-collapse-header]:bg-[#f0f5ff] [&>.ant-collapse-header]:border-b [&>.ant-collapse-header]:border-gray-300",
            children: (
              <div className="p-4 bg-white">
                <Table columns={columns} dataSource={data} pagination={false} size="small" />
                <KetQuaChiTiet />
              </div>
            ),
          },
        ]}
      />

      <Collapse
        expandIconPosition="end"
        className="border border-gray-300 rounded-lg bg-white overflow-hidden"
        items={[
          {
            key: "1",
            label: (
              <span className="text-[#0008b0] font-bold uppercase flex items-center gap-2">
                <Scissors size={18} /> Thủ thuật
              </span>
            ),
            className: "[&>.ant-collapse-header]:bg-[#f0f5ff] [&>.ant-collapse-header]:border-b [&>.ant-collapse-header]:border-gray-300",
            children: (
              <div className="p-4 bg-white">
                <Table columns={columns} dataSource={data} pagination={false} size="small" />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};