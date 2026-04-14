import { useProvinceActionLogic } from "./useProvinceActionLogic";
import { useColumnProvince } from "./useColumnProvince";
import { ProvinceSearchForm } from "./components/ProvinceSearchForm";
import { ProvinceEditModal } from "./components/ProvinceEditModal";
import { ProvinceImportModal } from "./components/ProvinceImportModal";
import { DataTable, showConfirmDialog } from "@/components/common";

export default function ProvincePage() {
  const {
    provinceList, totalRecords, editingRecord, modalOpen, modalMode, modalImportOpen, currentPage, pageSize, isLoadingList, isSaving,
    handleOpenEdit, handleCloseModal, handleSave, handleDelete, handleSearch, handlePageChange, setModalImportOpen, handleImportSuccess,
  } = useProvinceActionLogic();

  const { columns } = useColumnProvince({
    currentPage, pageSize, onEdit: handleOpenEdit,
    onDelete: (id) =>
      showConfirmDialog({
        title: "Xác nhận xóa",
        content: "Bạn có chắc chắn muốn xóa tỉnh/thành phố này không?",
        onOk: () => handleDelete(id),
      }),
  });

  return (
    <div className="px-6 py-4 bg-white min-h-[calc(100vh-120px)]
      [&_.ant-table-wrapper]:border [&_.ant-table-wrapper]:border-gray-200 [&_.ant-table-wrapper]:rounded-lg [&_.ant-table-wrapper]:overflow-hidden 
      [&_.ant-table-thead>tr>th]:!bg-[#f0f8ff] [&_.ant-table-thead>tr>th]:!text-gray-800 [&_.ant-table-thead>tr>th]:!font-semibold [&_.ant-table-thead>tr>th]:!text-center [&_.ant-table-thead>tr>th]:!border-b [&_.ant-table-thead>tr>th]:!border-gray-200"
    >
      <ProvinceSearchForm
        onSearch={handleSearch}
        onImport={() => setModalImportOpen(true)}
      />

      <DataTable
        columns={columns}
        dataSource={provinceList}
        loading={isLoadingList}
        totalRecords={totalRecords}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
        rowKey="id"
      />

      <ProvinceEditModal
        open={modalOpen}
        mode={modalMode}
        initialValues={editingRecord}
        onClose={handleCloseModal}
        onSave={handleSave}
        confirmLoading={isSaving}
      />

      <ProvinceImportModal
        open={modalImportOpen}
        onClose={() => setModalImportOpen(false)}
        onSuccess={handleImportSuccess}
      />
    </div>
  );
}