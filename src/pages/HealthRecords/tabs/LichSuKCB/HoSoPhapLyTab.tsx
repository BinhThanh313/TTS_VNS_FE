import React from 'react';
import { Collapse, Row, Col, Typography } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Field = ({ label, value }: { label: string, value?: React.ReactNode }) => (
  <div className="underline-field">
    <div className="underline-field-label">{label}</div>
    <div className="underline-field-value">{value || '......'}</div>
  </div>
);

// Tạo một component phụ để tái sử dụng style cho tiêu đề các giấy tờ
const PaperTitle = ({ text }: { text: string }) => (
  <span style={{ color: '#0008b0', fontWeight: 'bold', textTransform: 'uppercase' }}>
    <FileTextOutlined style={{ marginRight: 8 }} /> {text}
  </span>
);

export const HoSoPhapLyTab = () => {

  // Nội dung: Giấy ra viện
  const GiayRaVienContent = () => (
    <div>
      <Title level={5} style={{ color: '#0008b0', marginBottom: 16 }}>1. Thông tin hành chính & chuyên môn:</Title>
      <Row gutter={24}>
        <Col span={6}><Field label="Số lưu trữ" value="24/00582/QT" /></Col>
        <Col span={6}><Field label="Mã y tế" value="1900123456" /></Col>
        <Col span={6}><Field label="Mã TTDV (Mã số BHXH)" value="79001 (BV Đa khoa TP)" /></Col>
        <Col span={6}><Field label="Mã / Tên BS" value="BS0128 - Nguyễn Văn An" /></Col>
        <Col span={6}><Field label="Ngày vào viện" value="10/03/2026" /></Col>
        <Col span={6}><Field label="Ngày ra viện" value="17/03/2026" /></Col>
        <Col span={6}><Field label="Ngày cấp giấy ra viện" value="17/03/2026" /></Col>
        <Col span={6}><Field label="Mã khoa" value="K02 - Nội tổng hợp" /></Col>
      </Row>
      <Row gutter={24}>
        <Col span={24}><Field label="Chẩn đoán ra viện" value="Viêm dạ dày cấp tính (K29.1)" /></Col>
        <Col span={24}><Field label="Phương pháp điều trị" value="Nội khoa, kháng sinh, điều chỉnh chế độ ăn" /></Col>
        <Col span={24}><Field label="Ghi chú" value="Tái khám sau 2 tuần hoặc khi có dấu hiệu đau bụng dữ dội" /></Col>
      </Row>
      
      <Title level={5} style={{ color: '#0008b0', marginTop: 16, marginBottom: 16 }}>2. Thông tin Bảo hiểm & Người thân (Thường cho bệnh nhi hoặc sản khoa):</Title>
    </div>
  );

  // Nội dung: Giấy chứng nhận nghỉ dưỡng thai
  const NghiDuongThaiContent = () => (
    <div>
      <Title level={5} style={{ color: '#0008b0', marginBottom: 16 }}>1. Thông tin người nuôi dưỡng (Người mẹ):</Title>
      <Row gutter={24}>
        <Col span={6}><Field label="Họ và tên" value="Nguyễn Thị Mai" /></Col>
        <Col span={6}><Field label="Ngày sinh" value="17/10/1986" /></Col>
        <Col span={6}><Field label="Mã thẻ BHYT" value="HT 2 01 0123456789" /></Col>
        <Col span={6}><Field label="Mã số BHXH" value="0123456789" /></Col>
        <Col span={6}><Field label="Số CCCD/HC" value="001186001234" /></Col>
        <Col span={6}><Field label="Ngày cấp CCCD/HC" value="20/05/2021" /></Col>
        <Col span={12}><Field label="Nơi cấp CCCD/HC" value="Cục Cảnh sát QLHC về trật tự xã hội" /></Col>
        <Col span={6}><Field label="Dân tộc" value="Tày" /></Col>
        <Col span={6}><Field label="Mã quốc tịch" value="VN" /></Col>
        <Col span={6}><Field label="Mã tỉnh" value="01" /></Col>
        <Col span={6}><Field label="Mã huyện" value="006" /></Col>
        <Col span={24}><Field label="Nơi cư trú của người nuôi dưỡng" value="123 Đường Láng, Đống Đa, Hà Nội" /></Col>
      </Row>
      <Title level={5} style={{ color: '#0008b0', marginTop: 16 }}>2. Thông tin về con & Lần sinh:</Title>
    </div>
  );

  // Nội dung: Giấy chứng nhận nghỉ việc hưởng BHXH
  const NghiViecBHXHContent = () => (
    <div>
      <Title level={5} style={{ color: '#0008b0', marginBottom: 16 }}>1. Thông tin hành chính & chuyên môn:</Title>
      <Row gutter={24}>
        <Col span={6}><Field label="Số chứng từ" value="00012345" /></Col>
        <Col span={6}><Field label="Số định danh chứng từ" value="123456789" /></Col>
        <Col span={6}><Field label="Mẫu số" value="CT07" /></Col>
        <Col span={6}><Field label="Số KCB" value="2026031701" /></Col>
        <Col span={6}><Field label="Ngày cấp chứng từ" value="17/03/2026" /></Col>
        <Col span={6}><Field label="Mã TTDV (Mã số BHXH)" value="79001" /></Col>
        <Col span={6}><Field label="Mã BS" value="BS0128" /></Col>
        <Col span={6}><Field label="Tên BS" value="Nguyễn Văn An" /></Col>
        <Col span={24}><Field label="Chẩn đoán ra viện" value="Viêm dạ dày cấp tính (K29.1)" /></Col>
        <Col span={24}><Field label="Phương pháp điều trị" value="Nội khoa, kháng sinh, điều chỉnh chế độ ăn" /></Col>
      </Row>
    </div>
  );

  // Nội dung: Giấy chuyển tuyến
  const ChuyenTuyenContent = () => (
    <div>
      <Title level={5} style={{ color: '#0008b0', marginBottom: 16 }}>1. Thông tin hành chính:</Title>
      <Row gutter={24}>
        <Col span={6}><Field label="Số hồ sơ" value="HS-2026-001" /></Col>
        <Col span={6}><Field label="Số chuyển tuyến" value="ST-9988" /></Col>
        <Col span={6}><Field label="Số giấy chuyển tuyến" value="GCT-5544" /></Col>
        <Col span={6}><Field label="Mã / Tên cơ sở KBCB" value="79001" /></Col>
        <Col span={6}><Field label="Ngày vào" value="10/03/2026" /></Col>
        <Col span={6}><Field label="Ngày vào nội trú" value="10/03/2026" /></Col>
        <Col span={6}><Field label="Ngày ra" value="17/03/2026" /></Col>
        <Col span={6}><Field label="Mã TTDV (Mã số BHXH)" value="79001" /></Col>
        <Col span={12}><Field label="Mã / Tên nơi đi" value="79001 - Bệnh viện Đa khoa TP" /></Col>
        <Col span={12}><Field label="Mã / Tên nơi đến" value="79015 - Bệnh viện Chợ Rẫy" /></Col>
        <Col span={12}><Field label="Lý do chuyển tuyến" /></Col>
        <Col span={12}><Field label="Phương tiện vận chuyển" /></Col>
      </Row>
    </div>
  );

  return (
    <div>
      <Collapse expandIconPosition="end" className="custom-detail-collapse" items={[{ key: '1', label: <PaperTitle text="GIẤY RA VIỆN" />, children: <GiayRaVienContent /> }]} />
      <Collapse defaultActiveKey={['1']} expandIconPosition="end" className="custom-detail-collapse" items={[{ key: '1', label: <PaperTitle text="GIẤY CHỨNG NHẬN NGHỈ DƯỠNG THAI" />, children: <NghiDuongThaiContent /> }]} />
      <Collapse expandIconPosition="end" className="custom-detail-collapse" items={[{ key: '1', label: <PaperTitle text="GIẤY CHỨNG NHẬN NGHỈ VIỆC HƯỞNG BHXH" />, children: <NghiViecBHXHContent /> }]} />
      <Collapse expandIconPosition="end" className="custom-detail-collapse" items={[{ key: '1', label: <PaperTitle text="GIẤY CHUYỂN TUYẾN / CHUYỂN CƠ SỞ KHÁM, CHỮA BỆNH BHYT" />, children: <ChuyenTuyenContent /> }]} />
    </div>
  );
};