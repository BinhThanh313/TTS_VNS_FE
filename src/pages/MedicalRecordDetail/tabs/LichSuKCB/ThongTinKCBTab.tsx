import { Row, Col } from "antd";
import { DetailField } from "../../components/DetailField";

export const ThongTinKCBTab = () => {
  return (
    <div className="py-2">
      <h4 className="text-[#0008b0] font-bold mb-4 text-base">1. Thông tin tiếp nhận:</h4>
      <Row gutter={24} className="mb-2">
        <Col span={6}><DetailField label="Hình thức khám" /></Col>
        <Col span={6}><DetailField label="Đối tượng khám" /></Col>
        <Col span={6}><DetailField label="Ngày vào viện" /></Col>
        <Col span={6}><DetailField label="Ngày ra viện" /></Col>
      </Row>
      <Row gutter={24}>
        <Col span={6}><DetailField label="Thông tin chuyển tuyến" value="Có / Không" /></Col>
        <Col span={6}><DetailField label="Số giấy chuyển tuyến" /></Col>
        <Col span={6}><DetailField label="Nơi đi" /></Col>
        <Col span={6}><DetailField label="Nơi đến" /></Col>
      </Row>

      <h4 className="text-[#0008b0] font-bold mt-6 mb-4 text-base">2. Thông tin Lý do và Chẩn đoán sơ bộ:</h4>
      <Row gutter={24}>
        <Col span={12}><DetailField label="Lý do khám" value="Đau họng, ho nhiều" /></Col>
        <Col span={12}><DetailField label="Chẩn đoán sơ bộ" value="Viêm họng cấp" /></Col>
      </Row>

      <h4 className="text-[#0008b0] font-bold mt-6 mb-4 text-base">3. Thông tin Chẩn đoán và điều trị:</h4>
      <Row gutter={24} className="mb-2">
        <Col span={12}><DetailField label="Bệnh chính" value="J02 - Viêm họng cấp" /></Col>
        <Col span={12}><DetailField label="Bệnh kèm theo (nếu có)" /></Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}><DetailField label="Phương pháp điều trị" value="Dùng thuốc kháng sinh, kháng viêm" /></Col>
        <Col span={12}><DetailField label="Lời dặn của bác sĩ" value="Uống nhiều nước ấm, súc miệng nước muối" /></Col>
      </Row>
    </div>
  );
};