import { Row, Col, Collapse } from "antd";
import { MapPin, IdCard } from "lucide-react";

// Component con thay thế class .underline-field
const UnderlineField = ({ label, value }: { label: string; value?: React.ReactNode }) => (
  <div className="mb-4">
    <div className="text-gray-400 text-[13px] mb-1">{label}</div>
    <div className="border-b border-gray-300 pb-1.5 font-medium text-gray-800 text-[14px] flex items-baseline gap-1">
      {value || "......"}
    </div>
  </div>
);

export const ThongTinHanhChinhTab = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Thay thế .custom-detail-collapse bằng Tailwind */}
      <Collapse
        defaultActiveKey={["1"]}
        expandIconPosition="end"
        className="border border-gray-300 rounded-lg bg-white overflow-hidden"
        items={[
          {
            key: "1",
            label: (
              <span className="text-[#0008b0] font-bold uppercase flex items-center gap-2">
                <MapPin size={18} /> Địa chỉ hành chính & thẻ BHYT
              </span>
            ),
            // Header được style lại để background xanh nhạt giống bản cũ
            className: "[&>.ant-collapse-header]:bg-[#f0f5ff] [&>.ant-collapse-header]:border-b [&>.ant-collapse-header]:border-gray-300",
            children: (
              <div className="p-4 bg-white">
                <UnderlineField label="Thường trú" value="Số 103-105 Nguyễn Tuân..." />
                <Row gutter={24}>
                  <Col span={6}><UnderlineField label="Số thẻ BHYT" value="024548454245" /></Col>
                  <Col span={6}><UnderlineField label="Thời hạn thẻ" value="01/07/2027" /></Col>
                </Row>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};