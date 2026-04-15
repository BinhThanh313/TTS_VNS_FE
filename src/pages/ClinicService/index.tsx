import { Form } from 'antd';
import { SearchForm } from './components/SearchForm';
import { ClinicServiceTable } from './components/ClinicServiceTable';
import { ClinicServiceModal } from './components/ClinicServiceModal';

// GỌI 2 HOOK CHÍNH
import { useClinicActionLogic } from './useClinicActionLogic';
import { useColumnClinicService } from './useColumnClinicService';

import { showConfirmDialog } from '@/components/common'; 

export default function ClinicService() {
  const [form] = Form.useForm();
  
  const {
    clinicList, totalRecords, isPending, isSaving,
    currentPage, pageSize, modalOpen, modalMode, editingRecord, setModalOpen,
    handleSearch, handlePageChange, handleOpenCreate, handleOpenEdit, handleSave, handleDelete
  } = useClinicActionLogic();

  // Khởi tạo cột
  const { columns } = useColumnClinicService({
    currentPage,
    pageSize,
    onEdit: handleOpenEdit,
    onDelete: (id) => showConfirmDialog({ 
      title: 'Xóa dịch vụ?', 
      content: 'Thao tác này không thể hoàn tác.', 
      onOk: () => handleDelete(id) 
    })
  });

  return (
    <div className="px-6 py-4 bg-white min-h-[calc(100vh-120px)] [&_.ant-table-thead>tr>th]:!bg-[#f0f8ff] [&_.ant-table-thead>tr>th]:!text-center">
      <SearchForm form={form} onSearch={handleSearch} onCreate={handleOpenCreate} />

      <ClinicServiceTable
        columns={columns} // Truyền cột vào đây
        data={clinicList} 
        totalRecords={totalRecords} 
        loading={isPending}
        currentPage={currentPage} 
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />

      <ClinicServiceModal
        open={modalOpen} 
        mode={modalMode} 
        initialValues={editingRecord}
        onClose={() => setModalOpen(false)} 
        onSave={handleSave}
      />
    </div>
  );
}