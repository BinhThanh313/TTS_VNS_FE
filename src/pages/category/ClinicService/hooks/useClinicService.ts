import { useState } from 'react';
import { message } from 'antd';
import type { IClinicService } from '@/types/category';

export const useClinicService = (initialData: IClinicService[]) => {
  // allData là Database gốc, data là kết quả hiển thị trên bảng
  const [allData, setAllData] = useState<IClinicService[]>(initialData);
  const [data, setData] = useState<IClinicService[]>(initialData);
  const [editingRecord, setEditingRecord] = useState<IClinicService | null>(null);
  
  // State phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const create = (values: any) => {
    const isExist = allData.find(item => item.maDichVu === values.maDichVu);
    if (isExist) return message.error('Mã dịch vụ đã tồn tại. Vui lòng nhập lại!');

    const newData = { ...values, id: Date.now() };
    setAllData(prev => [newData, ...prev]);
    setData(prev => [newData, ...prev]);
    message.success('Thêm mới thành công!');
  };

  const update = (values: any) => {
    setAllData(prev => prev.map(item => item.id === editingRecord?.id ? { ...item, ...values } : item));
    setData(prev => prev.map(item => item.id === editingRecord?.id ? { ...item, ...values } : item));
    message.success('Cập nhật thành công!');
  };

  const remove = (id: number | string) => {
    setAllData(prev => prev.filter(item => item.id !== id));
    setData(prev => prev.filter(item => item.id !== id));
    message.success('Đã xóa!');
  };

  const search = (values: any) => {
    const { coSo, loaiDichVu, nhomDichVu, tenDichVu } = values;
    const filteredData = allData.filter(item => {
      const matchCoSo = !coSo || item.coSo === coSo;
      const matchLoai = !loaiDichVu || item.loaiDichVu === loaiDichVu;
      const matchNhom = !nhomDichVu || item.nhomDichVu === nhomDichVu;
      const matchTen = !tenDichVu || item.tenDichVu.toLowerCase().includes(tenDichVu.toLowerCase());
      return matchCoSo && matchLoai && matchNhom && matchTen;
    });
    setData(filteredData);
    setCurrentPage(1); // Tìm kiếm thì luôn đẩy về trang 1
  };

  return {
    data,
    editingRecord,
    setEditingRecord,
    currentPage, setCurrentPage,
    pageSize, setPageSize,
    create,
    update,
    remove,
    search
  };
};