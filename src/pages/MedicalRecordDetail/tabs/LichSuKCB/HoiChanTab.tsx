import { Table, Collapse, Row, Col } from "antd";
import { Users } from "lucide-react";
import { DetailField } from "../../components/DetailField";

export const HoiChanTab = () => {
  const columns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: 60, align: "center" as const },
    { title: "Ngày giờ hội chẩn", dataIndex: "ngay", key: "ngay", align: "center" as const },
    { title: "Nhóm dịch vụ", dataIndex: "nhom", key: "nhom", align: "left" as const },
    { title: "Tên dịch vụ", dataIndex: "ten", key: "ten", align: "left" as const },
  ];

  const data = [
    { key: "1", stt: 1, ngay: "...", nhom: "...", ten: "..." },
    { key: "2", stt: 2, ngay: "...", nhom: "...", ten: "..." },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Table columns={columns} dataSource={data} pagination={false} size="small" />
      
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="end"
        className="border border-gray-300 rounded-lg bg-white overflow-hidden"
        items={[
          {
            key: "1",
            label: (
              <span className="text-[#0008b0] font-bold uppercase flex items-center gap-2">
                <Users size={18} /> Kết quả chi tiết
              </span>
            ),
            className: "[&>.ant-collapse-header]:bg-[#f0f5ff] [&>.ant-collapse-header]:border-b [&>.ant-collapse-header]:border-gray-300",
            children: (
              <div className="p-4 bg-white">
                <Row gutter={24}>
                  <Col span={12}><DetailField label="Ngày giờ hội chẩn" /></Col>
                  <Col span={12}><DetailField label="Người thực hiện" /></Col>
                  <Col span={24}><DetailField label="Kết quả hội chẩn" /></Col>
                </Row>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};