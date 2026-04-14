import { useState } from "react";
import { message } from "antd";
import { useWardList, useUpdateWard, useDeleteWard } from "@/hooks"; // Đảm bảo bạn có các hooks này
import type { IWard, IWardRequest } from "@/types";
import { ActionMode } from "@/types";
import { useLogicWard } from "./useLogicWard";

export function useWardActionLogic() {
  const [editingRecord, setEditingRecord] = useState<IWard | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ActionMode>(ActionMode.UPDATE);
  const [modalImportOpen, setModalImportOpen] = useState(false);

  const { searchParams, currentPage, pageSize, handleSearch, handlePageChange } = useLogicWard();
  
  const { data: wardData, isPending: isLoadingList } = useWardList(searchParams);
  const updateMutation = useUpdateWard();
  const deleteMutation = useDeleteWard();

  const handleOpenEdit = (record: IWard) => { setEditingRecord(record); setModalMode(ActionMode.UPDATE); setModalOpen(true); };
  const handleCloseModal = () => { setModalOpen(false); setEditingRecord(null); };

  const handleSave = async (values: IWardRequest) => {
    if (editingRecord) {
      await updateMutation.mutateAsync({ id: editingRecord.id, data: values });
      message.success("Cập nhật thành công!");
    }
    handleCloseModal();
  };

  const handleDelete = async (id: string | number) => {
    await deleteMutation.mutateAsync(id);
    message.success("Xóa thành công!");
  };

  const handleImportSuccess = () => { setModalImportOpen(false); message.success("Import thành công!"); };

  return {
    wardList: wardData?.data ?? [], totalRecords: wardData?.total ?? 0,
    editingRecord, modalOpen, modalMode, modalImportOpen, currentPage, pageSize, isLoadingList,
    isSaving: updateMutation.isPending,
    handleOpenEdit, handleCloseModal, handleSave, handleDelete, handleSearch, handlePageChange, setModalImportOpen, handleImportSuccess,
  };
}