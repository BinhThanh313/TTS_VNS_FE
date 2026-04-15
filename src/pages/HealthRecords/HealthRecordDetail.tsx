// scr/pages/HealthRecords/HealthRecordDetail.tsx
import React, { useState } from 'react';
import { Typography, Row, Col, Menu } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeftOutlined, UserOutlined, HistoryOutlined, 
  MedicineBoxOutlined, PushpinOutlined, PlusSquareOutlined, SafetyCertificateOutlined
} from '@ant-design/icons';

// 1. IMPORT các module trang con từ thư mục tabs
import { HoSoTienSuView } from './tabs/HoSoTienSu';
import { LichSuKCBView } from './tabs/LichSuKCB'; // <--- THÊM DÒNG NÀY

const { Title, Text } = Typography;

export const HealthRecordDetail = () => {
  const { cccd } = useParams<{ cccd: string }>(); 
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState('hoso');

  const menuItems = [
    { key: 'hoso', icon: <UserOutlined />, label: 'Hồ sơ & Tiền sử' },
    { key: 'lichsu', icon: <HistoryOutlined />, label: 'Lịch sử KCB' },
    { key: 'khamsk', icon: <MedicineBoxOutlined />, label: 'Khám sức khỏe' },
    { key: 'tiemchung', icon: <PushpinOutlined />, label: 'Tiêm chủng' },
    { key: 'hiv', icon: <PlusSquareOutlined />, label: 'Bệnh HIV & Lao' },
    { key: 'giamdinh', icon: <SafetyCertificateOutlined />, label: 'Giám định y khoa' },
  ];

  // 2. CẬP NHẬT Router nội bộ điều khiển nội dung bên phải
  const renderRightContent = () => {
    switch (activeMenu) {
      case 'hoso': 
        return <HoSoTienSuView />;
      
      case 'lichsu': 
        // Khi chọn menu Lịch sử KCB, nó sẽ render component LichSuKCBView 
        // (Component này tự quản lý việc hiện List hay Detail đợt khám)
        return <LichSuKCBView />; 
      
      case 'khamsk':
        return <div style={{ padding: 20 }}>Tính năng Khám sức khỏe đang phát triển...</div>;
        
      default: 
        return <div style={{ padding: 20 }}>Tính năng đang phát triển...</div>;
    }
  };

  return (
    <div className="health-record-wrapper" style={{ padding: '16px 24px' }}>
      {/* 1. HEADER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, borderBottom: '1px solid #f0f0f0', paddingBottom: 16 }}>
        <ArrowLeftOutlined 
          onClick={() => navigate('/health-records')} 
          style={{ fontSize: 20, cursor: 'pointer', color: '#0008b0' }} 
        />
        <Title level={4} style={{ margin: 0, color: '#0008b0', fontWeight: 700 }}>
          Chi tiết hồ sơ sức khỏe / NGUYỄN VĂN QUYẾT
        </Title>
      </div>

      {/* 2. PROFILE CARD */}
      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <div style={{ width: 120, height: 160, backgroundColor: '#f0f0f0', borderRadius: 4, overflow: 'hidden', border: '1px solid #d9d9d9' }}>
          <img 
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d" 
            alt="avatar" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>
        <div style={{ flex: 1 }}>
          <Row gutter={[24, 16]}>
            <Col span={8}><Text type="secondary" style={{ width: 100, display: 'inline-block' }}>Họ và tên</Text><Text strong>NGUYỄN VĂN QUYẾT</Text></Col>
            <Col span={8}><Text type="secondary" style={{ width: 100, display: 'inline-block' }}>CCCD</Text><Text strong>{cccd}</Text></Col>
            <Col span={8}><Text type="secondary" style={{ width: 100, display: 'inline-block' }}>Nhóm máu</Text><Text strong>Nhóm O</Text></Col>
            <Col span={8}><Text type="secondary" style={{ width: 100, display: 'inline-block' }}>Ngày sinh</Text><Text strong>20/05/1985</Text></Col>
            <Col span={8}><Text type="secondary" style={{ width: 100, display: 'inline-block' }}>Số sổ BHXH</Text><Text strong>QN1235567899</Text></Col>
            <Col span={8}><Text type="secondary" style={{ width: 100, display: 'inline-block' }}>Dân tộc</Text><Text strong>Tày</Text></Col>
            <Col span={8}><Text type="secondary" style={{ width: 100, display: 'inline-block' }}>Giới tính</Text><Text strong>Nam</Text></Col>
            <Col span={8}><Text type="secondary" style={{ width: 100, display: 'inline-block' }}>Số điện thoại</Text><Text strong>095.124.6797</Text></Col>
            <Col span={8}><Text type="secondary" style={{ width: 100, display: 'inline-block' }}>Số ngày nghỉ phép</Text><Text strong style={{ color: '#cf1322' }}>12 ngày</Text></Col>
          </Row>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', marginBottom: 24 }} />

      {/* 3. MENU TRÁI & NỘI DUNG PHẢI */}
      <div style={{ display: 'flex', gap: 24 }}>
        <div style={{ width: 250, border: '1px solid #f0f0f0', borderRadius: 8, padding: '8px 0', height: 'fit-content' }}>
          <Menu 
            mode="inline" 
            selectedKeys={[activeMenu]} 
            onClick={(e) => setActiveMenu(e.key)} 
            items={menuItems} 
            className="custom-detail-menu" 
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          {renderRightContent()}
        </div>
      </div>
    </div>
  );
};