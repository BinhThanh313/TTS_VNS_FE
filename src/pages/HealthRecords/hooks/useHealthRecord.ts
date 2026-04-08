import { useState, useMemo } from 'react';
import type { CBCSRecord } from '@/types/HealthRecord';

// Dữ liệu mẫu
const MOCK_DATA: CBCSRecord[] = [
  { key: '1', cccd: '001095001234', fullName: 'Nguyễn Văn Quyết', dob: '20/05/1985', gender: 'Nam', profession: 'Cán bộ', unit: 'Phòng PX01' },
  { key: '2', cccd: '001095005678', fullName: 'Hán Thị Lan', dob: '15/10/1990', gender: 'Nữ', profession: 'Chiến sĩ', unit: 'Phòng PV03' },
  { key: '3', cccd: '001457896547', fullName: 'Bùi Thị Mận', dob: '01/01/2000', gender: 'Nữ', profession: 'Chiến sĩ nghĩa vụ', unit: 'PPKQ' },
  { key: '4', cccd: '005489623265', fullName: 'Lùng Thanh Đan', dob: '02/02/1996', gender: 'Nam', profession: 'Chiến sĩ', unit: 'Phòng HC01' },
];

export interface FilterParams {
  searchText: string;
  unit: string;
  profession: string;
}

export const useHealthRecord = () => {
  const [data] = useState<CBCSRecord[]>(MOCK_DATA);
  const [filters, setFilters] = useState<FilterParams>({
    searchText: '',
    unit: 'all',
    profession: 'all'
  });

  // LOGIC TÌM KIẾM THỰC SỰ
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // 1. Lọc theo tên hoặc CCCD (Không phân biệt hoa thường)
      const matchText = 
        item.fullName.toLowerCase().includes(filters.searchText.toLowerCase()) ||
        item.cccd.includes(filters.searchText);

      // 2. Lọc theo đơn vị
      const matchUnit = filters.unit === 'all' || item.unit === filters.unit;

      // 3. Lọc theo nghề nghiệp
      const matchProfession = filters.profession === 'all' || item.profession === filters.profession;

      // Phải thỏa mãn cả 3 điều kiện mới hiển thị
      return matchText && matchUnit && matchProfession;
    });
  }, [data, filters]);

  // Hàm cập nhật bộ lọc khi bấm nút Tìm kiếm
  const handleSearch = (newFilters: FilterParams) => {
    setFilters(newFilters);
  };

  return {
    filteredData,
    handleSearch
  };
};