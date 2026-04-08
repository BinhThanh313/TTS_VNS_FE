import React from 'react';
import { Typography, Card, Descriptions, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { AppButton } from '@/components/common';

const { Title } = Typography;

interface Props {
  cccd: string; // Nhận mã CCCD để sau này gọi API lấy dữ liệu thật
  onBack: () => void; // Hàm để quay lại trang danh sách
}

export const HealthRecordDetail: React.FC<Props> = ({ cccd, onBack }) => {
  return (
    <div className="health-record-wrapper">
      {/* Nút quay lại */}
      <AppButton 
        icon={<ArrowLeftOutlined />} 
        onClick={onBack} 
        style={{ marginBottom: 24 }}
      >
        Quay lại danh sách
      </AppButton>

      <Title level={4} className="page-title" style={{ marginBottom: 24 }}>
        Chi tiết Hồ sơ sức khỏe
      </Title>

      {/* Khung thông tin mẫu */}
      <Card bordered={true} style={{ borderRadius: 8, borderColor: '#a0a0a0' }}>
        <Descriptions title="Thông tin cán bộ chiến sĩ" bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}>
          <Descriptions.Item label="Số CCCD">{cccd}</Descriptions.Item>
          <Descriptions.Item label="Họ và tên">Nguyễn Văn Mẫu</Descriptions.Item>
          <Descriptions.Item label="Ngày sinh">01/01/1990</Descriptions.Item>
          <Descriptions.Item label="Giới tính">Nam</Descriptions.Item>
          <Descriptions.Item label="Đơn vị">Phòng PX01</Descriptions.Item>
          <Descriptions.Item label="Nghề nghiệp">Cán bộ</Descriptions.Item>
          <Descriptions.Item label="Tình trạng sức khỏe" span={2}>
            <span style={{ color: '#52c41a', fontWeight: 'bold' }}>Đủ điều kiện công tác</span>
          </Descriptions.Item>
          <Descriptions.Item label="Ghi chú bệnh lý" span={2}>
            Không có tiền sử bệnh nền nghiêm trọng. Đã tiêm đủ các mũi vắc xin theo quy định.
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};