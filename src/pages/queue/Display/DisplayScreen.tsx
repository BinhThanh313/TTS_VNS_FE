// src/pages/queue/Display/DisplayScreen.tsx
import React from 'react';
import { Button } from 'antd';
import { useDisplaySocket } from './hooks/useDisplaySocket';
import { TicketNumber } from './components/TicketNumber';

export const DisplayScreen = () => {
  const { callingPatient, isReady, setIsReady } = useDisplaySocket('PHONG_101');

  // Màn hình chờ kích hoạt loa
  if (!isReady) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#001529' }}>
        <Button type="primary" size="large" onClick={() => setIsReady(true)}>
          CLICK VÀO ĐÂY ĐỂ BẬT TIVI & KÍCH HOẠT LOA
        </Button>
      </div>
    );
  }

  // Màn hình Tivi chính thức
  return (
    <div style={{ 
      height: '100vh', background: '#001529', display: 'flex', 
      flexDirection: 'column', justifyContent: 'center', alignItems: 'center' 
    }}>
      <TicketNumber patient={callingPatient} />
    </div>
  );
};