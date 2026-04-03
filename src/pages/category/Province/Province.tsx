import React, { useState } from 'react';
import { Form } from 'antd';
import { useProvince } from './hooks/useProvince';
import { ProvinceSearchForm } from './components/ProvinceSearchForm';
import { ProvinceTable } from './components/ProvinceTable';
import { ProvinceEditModal } from './components/ProvinceEditModal';
import { ProvinceImportModal } from './components/ProvinceImportModal';
import { showConfirmDialog } from '@/components/common';
import '../styles/Category.scss';

const mockData = [
  { id: 1, maTinh: '01', tenTinh: 'Thành phố Hà Nội' },
  { id: 2, maTinh: '79', tenTinh: 'Thành phố Hồ Chí Minh' },
  { id: 3, maTinh: '48', tenTinh: 'Thành phố Đà Nẵng' },
  { id: 4, maTinh: '92', tenTinh: 'Tỉnh Bình Dương' },
  { id: 5, maTinh: '36', tenTinh: 'Tỉnh Bình Phước' }
];

export const Province = () => {
  const [form] = Form.useForm();
  const [modalImport, setModalImport] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const {
    data, editingRecord, setEditingRecord,
    currentPage, setCurrentPage, pageSize, setPageSize,
    update, remove, importData, search
  } = useProvince(mockData);

  return (
    <div className="category-wrapper">
      <ProvinceSearchForm form={form} onSearch={search} onImport={() => setModalImport(true)} />

      <ProvinceTable
        data={data}
        currentPage={currentPage}
        pageSize={pageSize}
        onEdit={(r: any) => { setEditingRecord(r); setModalEdit(true); }}
        onDelete={(id: string | number) => {
          showConfirmDialog({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa tỉnh/thành phố này không?',
            onOk: () => remove(id)
          });
        }}
        onPageChange={(p: number, s: number) => { setCurrentPage(p); setPageSize(s); }}
      />

      <ProvinceEditModal open={modalEdit} initialValues={editingRecord} onClose={() => setModalEdit(false)} onSave={update} />
      <ProvinceImportModal open={modalImport} onClose={() => setModalImport(false)} onSuccess={importData} />
    </div>
  );
};