import React from 'react';
import { Row, Col } from 'antd';

// Component Helper dùng chung class CSS đã định nghĩa
const Field = ({ label, value }: { label: string, value?: React.ReactNode }) => (
  <div className="underline-field">
    <div className="underline-field-label">{label}</div>
    <div className="underline-field-value">{value || '......'}</div>
  </div>
);

export const ThongTinKCBTab = () => {
  return (
    <div style={{ padding: '8px 0' }}>
      {/* SECTION 1 */}
      <h4 style={{ color: '#0008b0', fontWeight: 'bold', marginBottom: 16 }}>1. Thông tin tiếp nhận:</h4>
      <Row gutter={24}>
        <Col span={6}><Field label="Hình thức khám" /></Col>
        <Col span={6}><Field label="Đối tượng khám" /></Col>
        <Col span={6}><Field label="Ngày vào viện" /></Col>
        <Col span={6}><Field label="Ngày ra viện" /></Col>
      </Row>
      <Row gutter={24}>
        <Col span={6}><Field label="Thông tin chuyển tuyến" value="Có / Không" /></Col>
        <Col span={6}><Field label="Số giấy chuyển tuyến" /></Col>
        <Col span={6}><Field label="Nơi đi" /></Col>
        <Col span={6}><Field label="Nơi đến" /></Col>
      </Row>

      {/* SECTION 2 */}
      <h4 style={{ color: '#0008b0', fontWeight: 'bold', margin: '24px 0 16px' }}>2. Thông tin Lý do và Chẩn đoán sơ bộ:</h4>
      <Row gutter={24}>
        <Col span={12}><Field label="Lý do khám" value="Đau họng, ho nhiều" /></Col>
        <Col span={12}><Field label="Chẩn đoán sơ bộ" value="Viêm họng cấp" /></Col>
      </Row>

      {/* SECTION 3 */}
      <h4 style={{ color: '#0008b0', fontWeight: 'bold', margin: '24px 0 16px' }}>3. Thông tin Chẩn đoán và điều trị:</h4>
      <Row gutter={24}>
        <Col span={12}><Field label="Bệnh chính" value="J02 - Viêm họng cấp" /></Col>
        <Col span={12}><Field label="Bệnh kèm theo (nếu có)" /></Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}><Field label="Phương pháp điều trị" value="Dùng thuốc kháng sinh, kháng viêm" /></Col>
        <Col span={12}><Field label="Lời dặn của bác sĩ" value="Uống nhiều nước ấm, súc miệng nước muối" /></Col>
      </Row>
    </div>
  );
};