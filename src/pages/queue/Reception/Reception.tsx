import { Card } from 'antd';
import { useReceptionSocket } from './hooks/useReceptionSocket';
import { PatientForm } from './components/PatientForm';

export const Reception = () => {
  const { addPatient } = useReceptionSocket('PHONG_101');
  return (
    <div style={{ padding: 24, display: 'flex', justifyContent: 'center' }}>
      <Card 
        title="🎫 Lễ tân - Cấp số khám bệnh" 
        style={{ width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      >
        {/* Truyền hàm addPatient vào UI Form */}
        <PatientForm onSubmit={addPatient} />
      </Card>
    </div>
  );
};