import { useState } from 'react';
import { message } from 'antd';
import type { IDistrict } from '@/types/category';

export const useDistrict = (initialData: IDistrict[]) => {
  const [allData, setAllData] = useState<IDistrict[]>(initialData); // Lưu dữ liệu gốc
  const [data, setData] = useState<IDistrict[]>(initialData);       // Lưu dữ liệu đang hiển thị
  const [editingRecord, setEditingRecord] = useState<IDistrict | null>(null);
  
  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const update = (updated: IDistrict) => {
    setAllData(prev => prev.map(item => item.id === updated.id ? updated : item));
    setData(prev => prev.map(item => item.id === updated.id ? updated : item));
    message.success('Cập nhật thành công!');
  };

  const remove = (id: string | number) => {
    setAllData(prev => prev.filter(item => item.id !== id));
    setData(prev => prev.filter(item => item.id !== id));
    message.success('Xóa thành công!');
  };

  const importData = (newData: IDistrict[]) => {
    setAllData(prev => [...newData, ...prev]);
    setData(prev => [...newData, ...prev]);
  };

  const search = (values: any) => {
    const { name, provinceId } = values;
    const filteredData = allData.filter((item) => {
      const matchName = !name || item.name.toLowerCase().includes(name.toLowerCase());
      const matchProvince = !provinceId || (provinceId === 'HN' && item.provinceName === 'Hà Nội'  || (provinceId === 'HD' && item.provinceName === 'Hà Đông') || (provinceId === 'HP' && item.provinceName === 'Hải Phòng'));
      return matchName && matchProvince;
    });
    setData(filteredData);
    setCurrentPage(1); // Tìm kiếm xong đẩy về trang 1
  };

  return {
    data,
    editingRecord, setEditingRecord,
    currentPage, setCurrentPage,
    pageSize, setPageSize,
    update, remove, importData, search,
  };
};