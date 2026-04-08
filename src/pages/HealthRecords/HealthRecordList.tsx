import React, { useState } from 'react';
import { Typography } from 'antd';
import { useHealthRecord } from './hooks/useHealthRecord';
import { HealthRecordSearchForm } from './components/HealthRecordSearchForm';
import { HealthRecordTable } from './components/HealthRecordTable';
import { HealthRecordDetail } from './components/HealthRecordDetail'; // Nhúng màn hình chi tiết

import '../styles/HealthRecord.scss';

const { Title } = Typography;

export default function HealthRecordList() {
  const { filteredData, handleSearch } = useHealthRecord();
  
  // STATE MỚI: Lưu CCCD của người đang được xem. Nếu là null -> Hiện danh sách
  const [selectedCccd, setSelectedCccd] = useState<string | null>(null);

  // LOGIC ĐIỀU HƯỚNG: Nếu có CCCD được chọn, chỉ hiển thị Màn hình chi tiết
  if (selectedCccd) {
    return (
      <HealthRecordDetail 
        cccd={selectedCccd} 
        onBack={() => setSelectedCccd(null)} // Bấm quay lại thì reset về null
      />
    );
  }

  // Nếu selectedCccd là null, hiển thị màn hình danh sách mặc định
  return (
    <div className="health-record-wrapper">
      <Title level={4} className="page-title">
        Danh sách CBCS
      </Title>

      <HealthRecordSearchForm onSearch={handleSearch} />

      {/* Truyền hàm đổi trạng thái xuống Table */}
      <HealthRecordTable 
        dataSource={filteredData} 
        onView={(cccd) => setSelectedCccd(cccd)} 
      />
    </div>
  );
}