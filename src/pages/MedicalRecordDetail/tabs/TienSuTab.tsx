import { Row, Col, Collapse, Tag } from "antd";
import { Stethoscope, Heart } from "lucide-react";
import { DetailField } from "../components/DetailField";
import { DataTable } from "@/components/common"; // Giả sử bạn có component DataTable chuẩn

export const TienSuTab = () => {
  const chronicColumns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: 60, align: "center" as const },
    { title: "Mã bệnh", dataIndex: "code", key: "code" },
    { title: "Tên bệnh", dataIndex: "name", key: "name" },
    { title: "Thời gian", dataIndex: "time", key: "time", align: "center" as const },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      align: "center" as const,
      render: (status: string) => {
        let color = "blue";
        if (status === "Đang điều trị") color = "orange";
        if (status === "Đã hết bệnh") color = "green";
        return (
          <Tag color={color} className="rounded-full px-3 py-0.5">
            {status}
          </Tag>
        );
      },
    },
  ];

  const chronicData = [
    { key: "1", stt: 1, code: "ICD-10: I10", name: "Tiểu đường Type 2", time: "08/12/2024", status: "Ổn định" },
    { key: "2", stt: 2, code: "ICD-10: E11", name: "Tăng huyết áp", time: "09/10/2024", status: "Đang điều trị" },
  ];

  const allergyColumns = [
    { title: "STT", dataIndex: "stt", key: "stt", width: 60, align: "center" as const },
    { title: "Nhóm dị ứng", dataIndex: "group", key: "group" },
    { title: "Dị nguyên", dataIndex: "allergen", key: "allergen" },
    { title: "Biểu hiện", dataIndex: "symptom", key: "symptom" },
    { title: "Thời gian", dataIndex: "time", key: "time", align: "center" as const },
  ];

  return (
    <Collapse
      defaultActiveKey={["1"]}
      expandIconPosition="end"
      className="border border-gray-300 rounded-lg bg-white overflow-hidden"
      items={[
        {
          key: "1",
          label: (
            <span className="text-[#0008b0] font-bold uppercase flex items-center gap-2">
              <Stethoscope size={18} /> Tiền sử bệnh tật
            </span>
          ),
          className: "[&>.ant-collapse-header]:bg-[#f0f5ff] [&>.ant-collapse-header]:border-b [&>.ant-collapse-header]:border-gray-300",
          children: (
            <div className="p-4 bg-white">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1">
                  <div className="font-bold mb-3 text-gray-800">Chỉ số sinh hiệu:</div>
                  <Row gutter={24}>
                    <Col span={6}><DetailField label="Mạch" value={<>82 <span className="font-normal text-gray-500">Nhịp/phút</span></>} /></Col>
                    <Col span={6}><DetailField label="Nhịp thở" value={<>19 <span className="font-normal text-gray-500">Lần/phút</span></>} /></Col>
                    <Col span={6}><DetailField label="SPO2" value={<>97 <span className="font-normal text-gray-500">%</span></>} /></Col>
                    <Col span={6}><DetailField label="Cân nặng" value={<>72 <span className="font-normal text-gray-500">kg</span></>} /></Col>
                    <Col span={6}><DetailField label="Nhiệt độ" value={<>36.6 <span className="font-normal text-gray-500">°C</span></>} /></Col>
                    <Col span={6}><DetailField label="Huyết áp" value={<>130/85 <span className="font-normal text-gray-500">mmHg</span></>} /></Col>
                  </Row>
                </div>
                <div className="w-[220px]">
                  <div className="border border-gray-200 rounded-lg p-4 text-center flex flex-col items-center justify-center h-full shadow-sm">
                    <div className="text-[#0008b0] font-bold mb-4 flex items-center gap-2">
                      <Heart size={18} /> Phân loại sức khỏe
                    </div>
                    <div className="bg-[#e6f4ff] text-[#0008b0] text-2xl font-bold w-24 h-24 rounded-full flex items-center justify-center mb-4">
                      LOẠI 2
                    </div>
                    <div className="text-xs text-gray-500 italic">* Ngày khám: 31/03/2026</div>
                  </div>
                </div>
              </div>

              <div className="font-bold mb-3 text-gray-800">Bệnh mãn tính & Điều trị dài ngày:</div>
              <DataTable columns={chronicColumns} dataSource={chronicData} pagination={false} className="mb-6" />

              <div className="font-bold mb-3 text-gray-800">Tiền sử dị ứng:</div>
              <DataTable columns={allergyColumns} dataSource={[]} pagination={false} />
            </div>
          ),
        },
      ]}
    />
  );
};