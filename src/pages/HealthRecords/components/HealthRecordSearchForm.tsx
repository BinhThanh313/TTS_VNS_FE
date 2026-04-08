import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { AppButton } from '@/components/common';
import type { FilterParams } from '../hooks/useHealthRecord';

interface Props {
  onSearch: (filters: FilterParams) => void;
}

export const HealthRecordSearchForm: React.FC<Props> = ({ onSearch }) => {
  const [searchText, setSearchText] = useState('');
  const [unit, setUnit] = useState('all');
  const [profession, setProfession] = useState('all');

  const handleApplySearch = () => {
    onSearch({ searchText, unit, profession });
  };

  return (
    <div className="filter-section" style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
      
      {/* ĐÃ SỬA: Bỏ flex: 1 và set cứng width: 320px để ô tìm kiếm không bị kéo dài thênh thang */}
      <Input 
        size="large" 
        prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />} 
        placeholder="Nhập tên CBCS hoặc CCCD" 
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onPressEnter={handleApplySearch}
        allowClear
        style={{ width: '320px', borderRadius: '6px' }} 
      />
      
      <Select 
        size="large"
        value={unit}
        onChange={(val) => setUnit(val)}
        style={{ width: '200px' }}
        options={[
          { value: 'all', label: 'Tất cả đơn vị' },
          { value: 'Phòng PX01', label: 'Phòng PX01' },
          { value: 'Phòng PV03', label: 'Phòng PV03' },
          { value: 'Phòng HC01', label: 'Phòng HC01' },
          { value: 'PPKQ', label: 'PPKQ' },
        ]}
      />
      
      <Select 
        size="large"
        value={profession}
        onChange={(val) => setProfession(val)}
        style={{ width: '200px' }}
        options={[
          { value: 'all', label: 'Tất cả nghề nghiệp' },
          { value: 'Cán bộ', label: 'Cán bộ' },
          { value: 'Chiến sĩ', label: 'Chiến sĩ' },
          { value: 'Chiến sĩ nghĩa vụ', label: 'Chiến sĩ nghĩa vụ' },
        ]}
      />
      
      <AppButton 
        size="large"
        type="primary" 
        icon={<SearchOutlined />} 
        className="btn-search-custom"
        onClick={handleApplySearch}
        style={{ padding: '0 24px', borderRadius: '6px' }}
      >
        Tìm kiếm
      </AppButton>
    </div>
  );
};



