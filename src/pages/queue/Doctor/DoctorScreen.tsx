// src/pages/queue/Doctor/DoctorScreen.tsx
import React from 'react';
import { Card, Button, Badge } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import { useDoctorSocket } from './hooks/useDoctorSocket';
import { DoctorQueueList } from './components/DoctorQueueList';

export const DoctorScreen = () => {
  // 1. Lấy Data & Action từ Hook
  const { list, callNextPatient, isQueueEmpty } = useDoctorSocket('PHONG_101');

  // 2. Render UI
  return (
    <div style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <Card 
        title={<span style={{ color: '#1d39c4' }}>👨‍⚕️ Bác sĩ - Phòng Khám 101</span>} 
        extra={<Badge count={list.length} showZero color="#52c41a" />}
      >
        <Button 
          type="primary" 
          size="large" 
          block 
          icon={<SoundOutlined />} 
          onClick={callNextPatient}
          disabled={isQueueEmpty}
          style={{ marginBottom: 20, height: 60, fontSize: 18 }}
        >
          GỌI BỆNH NHÂN TIẾP THEO
        </Button>

        {/* 3. Truyền Data vào Component UI */}
        <DoctorQueueList dataSource={list} />
      </Card>
    </div>
  );
};