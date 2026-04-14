import { useWardActionLogic } from "./useWardActionLogic";
import { useColumnWard } from "./useColumnWard";
import { WardSearchForm } from "./components/WardSearchForm";
import { WardEditModal } from "./components/WardEditModal";
import { WardImportModal } from "./components/WardImportModal";
import { Table, Modal } from "antd"; 

export default function WardPage() {
  const {
    wardList, totalRecords, editingRecord, modalOpen, modalMode, modalImportOpen, currentPage, pageSize, isLoadingList, isSaving,
    handleOpenEdit, handleCloseModal, handleSave, handleDelete, handleSearch, handlePageChange, setModalImportOpen, handleImportSuccess,
  } = useWardActionLogic();

  const { columns } = useColumnWard({
    currentPage, pageSize, onEdit: handleOpenEdit,
    onDelete: (id) => Modal.confirm({ title: "Xác nhận xóa?", onOk: () => handleDelete(id) }),
  });

  return (
    <div className="px-6 py-4 bg-white min-h-[calc(100vh-120px)] [&_.ant-table-wrapper]:border [&_.ant-table-wrapper]:border-gray-200 [&_.ant-table-wrapper]:rounded-lg [&_.ant-table-wrapper]:overflow-hidden [&_.ant-table-thead>tr>th]:!bg-[#f0f8ff] [&_.ant-table-thead>tr>th]:!text-gray-800 [&_.ant-table-thead>tr>th]:!font-semibold [&_.ant-table-thead>tr>th]:!text-center [&_.ant-table-thead>tr>th]:!border-b [&_.ant-table-thead>tr>th]:!border-gray-200 [&_.ant-pagination]:!p-4 [&_.ant-pagination]:!m-0 [&_.ant-pagination]:!flex [&_.ant-pagination]:!w-full [&_.ant-pagination]:!items-center [&_.ant-pagination-total-text]:!mr-auto [&_.ant-pagination-total-text]:!font-medium">
      <WardSearchForm onSearch={handleSearch} onImport={() => setModalImportOpen(true)} />
      
      <Table 
        columns={columns} 
        dataSource={wardList} 
        loading={isLoadingList} 
        pagination={{ current: currentPage, pageSize, total: totalRecords, onChange: handlePageChange, showTotal: (total) => `Tổng số ${total} bản ghi` }} 
        rowKey="id" 
      />
      
      <WardEditModal open={modalOpen} mode={modalMode} initialValues={editingRecord} onClose={handleCloseModal} onSave={handleSave} confirmLoading={isSaving} />
      {/* <WardImportModal open={modalImportOpen} onClose={() => setModalImportOpen(false)} onSuccess={handleImportSuccess} /> */}
    </div>
  );
}