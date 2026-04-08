import { Card, Button, Badge } from 'antd';
import { SoundOutlined } from '@ant-design/icons';
import { useDoctorSocket } from './hooks/useDoctorSocket';
import { DoctorQueueList } from './components/DoctorQueueList';

export const DoctorScreen = () => {
  const { list, callNextPatient, isQueueEmpty } = useDoctorSocket('PHONG_101');
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

        <DoctorQueueList dataSource={list} />
      </Card>
    </div>
  );
};