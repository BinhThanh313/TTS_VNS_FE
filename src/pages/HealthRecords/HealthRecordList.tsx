// src/pages/HealthRecords/HealthRecordList.tsx
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useHealthRecord } from './hooks/useHealthRecord';
import { HealthRecordSearchForm } from './components/HealthRecordSearchForm';
import { HealthRecordTable } from './components/HealthRecordTable';
import '../styles/HealthRecord.scss';

const { Title } = Typography;

export default function HealthRecordList() {
  const { filteredData, handleSearch } = useHealthRecord();
  const navigate = useNavigate(); // Dùng hook điều hướng

  return (
    <div className="health-record-wrapper">
      <Title level={4} className="page-title">
        Danh sách CBCS
      </Title>

      <HealthRecordSearchForm onSearch={handleSearch} />

      <HealthRecordTable 
        dataSource={filteredData} 
        // Khi bấm Xem -> Đẩy mã CCCD lên URL
        onView={(cccd) => navigate(`/health-records/${cccd}`)} 
      />
    </div>
  );
}