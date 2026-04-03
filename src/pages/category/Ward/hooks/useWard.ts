import { useState } from 'react';
import { message } from 'antd';
import type { IWard } from '@/types/category';

export const useWard = (initialData: IWard[]) => {
  const [allData, setAllData] = useState<IWard[]>(initialData); 
  const [data, setData] = useState<IWard[]>(initialData);       
  const [editingRecord, setEditingRecord] = useState<IWard | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const update = (updated: IWard) => {
    setAllData(prev => prev.map(item => item.id === updated.id ? updated : item));
    setData(prev => prev.map(item => item.id === updated.id ? updated : item));
    message.success('Cập nhật Xã/Phường thành công!');
  };

  const remove = (id: string | number) => {
    setAllData(prev => prev.filter(item => item.id !== id));
    setData(prev => prev.filter(item => item.id !== id));
    message.success('Xóa bản ghi thành công!');
  };

  const importData = (newData: IWard[]) => {
    setAllData(prev => [...newData, ...prev]);
    setData(prev => [...newData, ...prev]);
  };

  const search = (values: any) => {
    const { districtId, name } = values;
    const filteredData = allData.filter((item) => {
      const matchDistrict = !districtId || 
        (districtId === 'BD' && item.districtName === 'Ba Đình') ||
        (districtId === 'CG' && item.districtName === 'Cầu Giấy');
      const matchName = !name || item.name.toLowerCase().includes(name.toLowerCase());
      return matchDistrict && matchName;
    });
    setData(filteredData);
    setCurrentPage(1); 
  };

  return {
    data,
    editingRecord, setEditingRecord,
    currentPage, setCurrentPage,
    pageSize, setPageSize,
    update, remove, importData, search,
  };
};