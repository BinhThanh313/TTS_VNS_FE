import { useState } from "react";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useDistrictList, useUpdateDistrict, useDeleteDistrict } from "@/hooks";
import { districtService } from "@/services";
import type { IDistrict, IDistrictRequest } from "@/types";
import { ActionMode } from "@/types";
import { useLogicDistrict } from "./useLogicDistrict";

export function useDistrictActionLogic() {
  const queryClient = useQueryClient();
  const [editingRecord, setEditingRecord] = useState<IDistrict | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ActionMode>(ActionMode.UPDATE);
  const [modalImportOpen, setModalImportOpen] = useState(false);

  const { searchParams, currentPage, pageSize, handleSearch, handlePageChange } = useLogicDistrict();
  
  const queryParams = { ...searchParams, page: currentPage, pageSize };
  const { data: districtData, isPending: isLoadingList } = useDistrictList(queryParams);

  const updateMutation = useUpdateDistrict();
  const deleteMutation = useDeleteDistrict();

  const handleOpenEdit = (record: IDistrict) => { setEditingRecord(record); setModalMode(ActionMode.UPDATE); setModalOpen(true); };
  const handleCloseModal = () => { setModalOpen(false); setEditingRecord(null); };

  const handleSave = async (values: IDistrictRequest) => {
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

  const handleImportSuccess = async (importedData: IDistrict[]) => { 
    setModalImportOpen(false); 
    await districtService.importData(importedData);
    queryClient.invalidateQueries({ queryKey: ["district"] });
    message.success(`Đã import thành công ${importedData.length} bản ghi!`); 
  };

  return {
    districtList: districtData?.data ?? [],
    totalRecords: districtData?.total ?? 0,
    editingRecord, modalOpen, modalMode, modalImportOpen, currentPage, pageSize, isLoadingList,
    isSaving: updateMutation.isPending,
    handleOpenEdit, handleCloseModal, handleSave, handleDelete, handleSearch, handlePageChange, setModalImportOpen, handleImportSuccess,
  };
}