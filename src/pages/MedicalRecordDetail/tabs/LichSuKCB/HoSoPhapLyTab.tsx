import { Collapse, Row, Col } from "antd";
import { FileText } from "lucide-react";
import { DetailField } from "../../components/DetailField";

const PaperTitle = ({ text }: { text: string }) => (
  <span className="text-[#0008b0] font-bold uppercase flex items-center gap-2">
    <FileText size={18} /> {text}
  </span>
);

export const HoSoPhapLyTab = () => {
  const GiayRaVienContent = () => (
    <div className="p-4 bg-white">
      <h5 className="text-[#0008b0] font-bold mb-4 text-sm">1. Thông tin hành chính & chuyên môn:</h5>
      <Row gutter={24}>
        <Col span={6}><DetailField label="Số lưu trữ" value="24/00582/QT" /></Col>
        <Col span={6}><DetailField label="Mã y tế" value="1900123456" /></Col>
        <Col span={6}><DetailField label="Mã TTDV" value="79001 (BV Đa khoa TP)" /></Col>
        <Col span={6}><DetailField label="Mã / Tên BS" value="BS0128 - Nguyễn Văn An" /></Col>
        <Col span={6}><DetailField label="Ngày vào viện" value="10/03/2026" /></Col>
        <Col span={6}><DetailField label="Ngày ra viện" value="17/03/2026" /></Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}><DetailField label="Chẩn đoán ra viện" value="Viêm dạ dày cấp tính (K29.1)" /></Col>
        <Col span={24}><DetailField label="Phương pháp điều trị" value="Nội khoa, kháng sinh" /></Col>
      </Row>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <Collapse
        expandIconPosition="end"
        className="border border-gray-300 rounded-lg bg-white overflow-hidden"
        items={[
          {
            key: "1",
            label: <PaperTitle text="GIẤY RA VIỆN" />,
            className: "[&>.ant-collapse-header]:bg-[#f0f5ff] [&>.ant-collapse-header]:border-b [&>.ant-collapse-header]:border-gray-300",
            children: <GiayRaVienContent />,
          },
        ]}
      />
      {/* Bạn có thể copy pattern Collapse này để thêm các loại giấy tờ khác (Nghỉ dưỡng thai, Chuyển tuyến...) */}
    </div>
  );
};