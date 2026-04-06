import React from 'react';
import { Row, Col, Typography } from 'antd';
import { Reception } from './Reception/Reception';
import { DoctorScreen } from './Doctor/DoctorScreen';
import { DisplayScreen } from './Display/DisplayScreen';

export const AllInOneTest = () => {
  return (
    <div style={{ padding: '16px 24px', background: '#e6f7ff', height: '100vh', overflow: 'hidden' }}>
      <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: 16, color: '#1890ff', textTransform: 'uppercase' }}>
        Điều phối Khám bệnh Thông minh
      </Typography.Title>
      
      {/* Bố cục: Cột Trái (Lễ tân + Bác sĩ) - Cột Phải (Tivi) */}
      <Row gutter={[24, 24]} style={{ height: 'calc(100vh - 80px)' }}>
        
        {/* ================= CỘT TRÁI ================= */}
        {/* Chiếm 9/24 màn hình. Hiển thị dạng cột dọc */}
        <Col span={9} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          {/* Lễ tân: Tự động vừa với nội dung bên trong */}
          <div style={{ border: '2px solid #1890ff', borderRadius: 12, overflow: 'hidden', background: '#fff', paddingBottom: 10 }}>
            <Reception />
          </div>
          
          {/* Bác sĩ: Dùng flex: 1 để tự động chiếm hết chiều cao phần còn lại */}
          <div style={{ border: '2px solid #52c41a', borderRadius: 12, overflow: 'auto', background: '#fff', flex: 1 }}>
            <DoctorScreen />
          </div>
          
        </Col>

        {/* ================= CỘT PHẢI ================= */}
        {/* Chiếm 15/24 màn hình. Dành riêng cho Tivi */}
        <Col span={15}>
          <div style={{ 
            border: '4px solid #faad14', 
            borderRadius: 12, 
            overflow: 'hidden', 
            height: '100%',
            position: 'relative',
            background: '#001529',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
          }}>
            {/* Thủ thuật CSS: Ép Tivi to ra 166% sau đó thu nhỏ (scale) lại còn 60%. 
              Cách này giúp chữ khổng lồ bên trong Tivi thu lại vừa in khung hình bên ngoài.
            */}
            <div style={{
              position: 'absolute',
              top: 0, 
              left: 0,
              width: '166.6%', 
              height: '166.6%',
              transform: 'scale(0.6)',
              transformOrigin: 'top left'
            }}>
              <DisplayScreen />
            </div>
          </div>
        </Col>
        
      </Row>
    </div>
  );
};