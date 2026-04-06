import { useState } from 'react';
import { Form } from 'antd';
import { useDistrict } from './hooks/useDistrict';
import { DistrictSearchForm } from './components/DistrictSearchForm';
import { DistrictTable } from './components/DistrictTable';
import { DistrictEditModal } from './components/DistrictEditModal';
import { DistrictImportModal } from './components/DistrictImportModal';
import { showConfirmDialog } from '@/components/common';
import '../../styles/Category.scss';

const mockData = [
  { id: 1, provinceName: 'Hà Nội', code: '001', name: 'Quận Ba Đình' },
  { id: 2, provinceName: 'Hà Nội', code: '002', name: 'Quận Hoàn Kiếm' },
  { id: 3, provinceName: 'Hà Đông', code: '003', name: 'Quận Đống Đa' },
  { id: 4, provinceName: 'Hà Đông', code: '004', name: 'Quận Hai Bà Trưng' },
  { id: 5, provinceName: 'Hải Phòng', code: '005', name: 'Quận Hà Đông' },
  { id: 6, provinceName: 'Hải Phòng', code: '006', name: 'Quận Hồng Bàng' },
];

export const District = () => {
  const [form] = Form.useForm();
  const [modalImport, setModalImport] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const {
    data, editingRecord, setEditingRecord,
    currentPage, setCurrentPage, pageSize, setPageSize,
    update, remove, importData, search
  } = useDistrict(mockData);

  return (
    <div className="category-wrapper">
      <DistrictSearchForm form={form} onSearch={search} onImport={() => setModalImport(true)} />

      <DistrictTable
        data={data} currentPage={currentPage} pageSize={pageSize}
        onEdit={(r: any) => { setEditingRecord(r); setModalEdit(true); }}
        onDelete={(id: string | number) => {
          showConfirmDialog({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa dữ liệu này không?',
            onOk: () => remove(id)
          });
        }}
        onPageChange={(p: number, s: number) => { setCurrentPage(p); setPageSize(s); }}
      />

      <DistrictEditModal open={modalEdit} initialValues={editingRecord} onClose={() => setModalEdit(false)} onSave={update} />
      <DistrictImportModal open={modalImport} onClose={() => setModalImport(false)} onSuccess={importData} />
    </div>
  );
};