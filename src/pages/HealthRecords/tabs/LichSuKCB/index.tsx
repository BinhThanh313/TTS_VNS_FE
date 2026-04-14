import React, { useState } from 'react';
import { LichSuList } from './LichSuList';
import { LichSuDetail } from './LichSuDetail';

export const LichSuKCBView = () => {
  // Trạng thái lưu ID của đợt khám đang xem. Null nghĩa là đang ở màn hình Danh sách
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  // Nếu có ID -> Render màn hình Chi tiết
  if (selectedRecordId) {
    return (
      <LichSuDetail 
        recordId={selectedRecordId} 
        onBack={() => setSelectedRecordId(null)} 
      />
    );
  }

  // Mặc định -> Render màn hình Danh sách
  return (
    <LichSuList 
      onSelectRecord={(id) => setSelectedRecordId(id)} 
    />
  );
};