import { useState } from "react";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useWardList, useUpdateWard, useDeleteWard } from "@/hooks";
import { wardService } from "@/services";
import type { IWard, IWardRequest } from "@/types";
import { ActionMode } from "@/types";
import { useLogicWard } from "./useLogicWard";

export function useWardActionLogic() {
  const queryClient = useQueryClient();
  const [editingRecord, setEditingRecord] = useState<IWard | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ActionMode>(ActionMode.UPDATE);
  const [modalImportOpen, setModalImportOpen] = useState(false);

  const { searchParams, currentPage, pageSize, handleSearch, handlePageChange } = useLogicWard();
  
  const queryParams = { ...searchParams, page: currentPage, pageSize };
  const { data: wardData, isPending: isLoadingList } = useWardList(queryParams);
  
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

  const handleImportSuccess = async (importedData: IWard[]) => { 
    setModalImportOpen(false); 
    await wardService.importData(importedData);
    queryClient.invalidateQueries({ queryKey: ["ward"] });
    message.success(`Đã import thành công ${importedData.length} bản ghi!`); 
  };

  return {
    wardList: wardData?.data ?? [], totalRecords: wardData?.total ?? 0,
    editingRecord, modalOpen, modalMode, modalImportOpen, currentPage, pageSize, isLoadingList,
    isSaving: updateMutation.isPending,
    handleOpenEdit, handleCloseModal, handleSave, handleDelete, handleSearch, handlePageChange, setModalImportOpen, handleImportSuccess,
  };
}