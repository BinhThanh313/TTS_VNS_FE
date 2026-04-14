import { useState } from "react";
import { message } from "antd";
import { useDistrictList, useCreateDistrict, useUpdateDistrict, useDeleteDistrict } from "@/hooks";
import type { IDistrict, IDistrictRequest } from "@/types";
import { ActionMode } from "@/types";
import { useLogicDistrict } from "./useLogicDistrict";

export function useDistrictActionLogic() {
  const [editingRecord, setEditingRecord] = useState<IDistrict | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ActionMode>(ActionMode.CREATE);
  const [modalImportOpen, setModalImportOpen] = useState(false);

  const { searchParams, currentPage, pageSize, handleSearch, handlePageChange } = useLogicDistrict();
  
  // Gọi API lấy danh sách
  const { data: districtData, isPending: isLoadingList } = useDistrictList(searchParams);

  const createMutation = useCreateDistrict();
  const updateMutation = useUpdateDistrict();
  const deleteMutation = useDeleteDistrict();

  const handleOpenCreate = () => { setEditingRecord(null); setModalMode(ActionMode.CREATE); setModalOpen(true); };
  const handleOpenEdit = (record: IDistrict) => { setEditingRecord(record); setModalMode(ActionMode.UPDATE); setModalOpen(true); };
  const handleOpenView = (record: IDistrict) => { setEditingRecord(record); setModalMode(ActionMode.VIEW); setModalOpen(true); };
  const handleCloseModal = () => { setModalOpen(false); setEditingRecord(null); };

  const handleSave = async (values: IDistrictRequest) => {
    if (modalMode === ActionMode.UPDATE && editingRecord) {
      await updateMutation.mutateAsync({ id: editingRecord.id, data: values });
      message.success("Cập nhật thành công!");
    } else {
      await createMutation.mutateAsync(values);
      message.success("Thêm mới thành công!");
    }
    handleCloseModal();
  };

  const handleDelete = async (id: string | number) => {
    await deleteMutation.mutateAsync(id);
    message.success("Xóa thành công!");
  };

  const handleImportSuccess = () => { setModalImportOpen(false); message.success("Import thành công!"); };

  return {
    // Trích xuất mảng data và total (Giống hệt fix lỗi Province)
    districtList: districtData?.data ?? [],
    totalRecords: districtData?.total ?? 0,
    
    editingRecord, modalOpen, modalMode, modalImportOpen, currentPage, pageSize, isLoadingList,
    isSaving: createMutation.isPending || updateMutation.isPending,
    handleOpenCreate, handleOpenEdit, handleOpenView, handleCloseModal, handleSave, handleDelete, handleSearch, handlePageChange, setModalImportOpen, handleImportSuccess,
  };
}