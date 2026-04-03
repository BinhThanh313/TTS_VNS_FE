import { useState } from 'react';
import { message } from 'antd';
import type { IProvince } from '@/types/category';

export const useProvince = (initialData: IProvince[]) => {
  const [allData, setAllData] = useState<IProvince[]>(initialData); 
  const [data, setData] = useState<IProvince[]>(initialData);       
  const [editingRecord, setEditingRecord] = useState<IProvince | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const update = (updated: IProvince) => {
    setAllData(prev => prev.map(item => item.id === updated.id ? updated : item));
    setData(prev => prev.map(item => item.id === updated.id ? updated : item));
    message.success('Cập nhật thành công!');
  };

  const remove = (id: string | number) => {
    setAllData(prev => prev.filter(item => item.id !== id));
    setData(prev => prev.filter(item => item.id !== id));
    message.success('Xóa bản ghi thành công!');
  };

  const importData = (newData: IProvince[]) => {
    setAllData(prev => [...newData, ...prev]);
    setData(prev => [...newData, ...prev]);
  };

  const search = (values: any) => {
    const { tenTinh, maTinh } = values;
    const filteredData = allData.filter(item => {
      const matchName = !tenTinh || item.tenTinh.toLowerCase().includes(tenTinh.toLowerCase());
      const matchCode = !maTinh || item.maTinh.includes(maTinh);
      return matchName && matchCode;
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