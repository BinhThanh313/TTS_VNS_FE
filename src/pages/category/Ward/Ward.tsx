import { useState } from 'react';
import { Form } from 'antd';
import { useWard } from './hooks/useWard';
import { WardSearchForm } from './components/WardSearchForm';
import { WardTable } from './components/WardTable';
import { WardEditModal } from './components/WardEditModal';
import { WardImportModal } from './components/WardImportModal';
import { showConfirmDialog } from '@/components/common';
import '../../styles/Category.scss';

const mockWards = [
  { id: 1, districtName: 'Ba Đình', code: '001', name: 'Phường Phúc Xá' },
  { id: 2, districtName: 'Ba Đình', code: '004', name: 'Phường Trúc Bạch' },
  { id: 3, districtName: 'Cầu Giấy', code: '002', name: 'Phường Dịch Vọng' },
  { id: 4, districtName: 'Cầu Giấy', code: '003', name: 'Phường Yên Hòa' },
];

export const Ward: React.FC = () => {
  const [form] = Form.useForm();
  const [modalImport, setModalImport] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const {
    data, editingRecord, setEditingRecord,
    currentPage, setCurrentPage, pageSize, setPageSize,
    update, remove, importData, search
  } = useWard(mockWards);

  return (
    <div className="category-wrapper">
      <WardSearchForm form={form} onSearch={search} onImport={() => setModalImport(true)} />

      <WardTable 
        data={data} currentPage={currentPage} pageSize={pageSize}  
        onEdit={(r) => { setEditingRecord(r); setModalEdit(true); }}
        onDelete={(id) => {
          showConfirmDialog({
            title: 'Xác nhận xóa',
            content: 'Bạn có chắc chắn muốn xóa xã/phường này không?',
            onOk: () => remove(id)
          });
        }}
        onPageChange={(p, s) => { setCurrentPage(p); setPageSize(s); }} 
      />

      <WardEditModal open={modalEdit} initialValues={editingRecord} onClose={() => setModalEdit(false)} onSave={update} />
      <WardImportModal open={modalImport} onClose={() => setModalImport(false)} onSuccess={importData} />
    </div>
  );
};