import React, { useState } from 'react';
import { Form } from 'antd';
import { SearchForm } from './components/SearchForm';
import { ClinicServiceTable } from './components/ClinicServiceTable';
import { ClinicServiceModal } from './components/ClinicServiceModal';
import { useClinicService } from './hooks/useClinicService';
import { mockClinicServices } from './constants'; 
import { showConfirmDialog } from '@/components/common'; // Import từ common
import '../styles/Category.scss';

export const ClinicService: React.FC = () => {
  const [form] = Form.useForm();
  
  const {
    data, editingRecord, setEditingRecord,
    currentPage, setCurrentPage, pageSize, setPageSize,
    create, update, remove, search
  } = useClinicService(mockClinicServices);

  const [modal, setModal] = useState({ open: false, mode: 'create' as 'create' | 'edit' });

  const handleSave = (values: any) => {
    modal.mode === 'create' ? create(values) : update(values);
    setModal({ ...modal, open: false });
  };

  const handleDelete = (id: string | number) => {
    // Sử dụng ConfirmDialog chung
    showConfirmDialog({
      title: 'Bạn chắc chắn muốn xóa dịch vụ này?',
      onOk: () => remove(id),
    });
  };

  return (
    <div className="category-wrapper">
      <SearchForm
        form={form}
        onSearch={search}
        onCreate={() => {
          setEditingRecord(null);
          setModal({ open: true, mode: 'create' });
        }}
      />

      <ClinicServiceTable
        data={data}
        currentPage={currentPage}
        pageSize={pageSize}
        onEdit={(record: any) => {
          setEditingRecord(record);
          setModal({ open: true, mode: 'edit' });
        }}
        onDelete={handleDelete}
        onPageChange={(p: number, s: number) => { 
          setCurrentPage(p); 
          setPageSize(s); 
        }}
      />

      <ClinicServiceModal
        open={modal.open}
        mode={modal.mode}
        initialValues={editingRecord}
        onClose={() => setModal({ ...modal, open: false })}
        onSave={handleSave}
      />
    </div>
  );
};