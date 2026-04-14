import { useState } from "react";
import { message } from "antd";
import { useProvinceList, useCreateProvince, useUpdateProvince, useDeleteProvince } from "@/hooks";
import type { IProvince, IProvinceRequest } from "@/types";
import { ActionMode as AM } from "@/types";
import { useLogicProvince } from "./useLogicProvince";

export function useProvinceActionLogic() {
  const [editingRecord, setEditingRecord] = useState<IProvince | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<AM>(AM.CREATE);
  const [modalImportOpen, setModalImportOpen] = useState(false);

  const { searchParams, currentPage, pageSize, handleSearch, handlePageChange } = useLogicProvince();
  const { data: provinceData, isPending: isLoadingList } = useProvinceList(searchParams);
  
  const createMutation = useCreateProvince();
  const updateMutation = useUpdateProvince();
  const deleteMutation = useDeleteProvince();

  const handleOpenCreate = () => { setEditingRecord(null); setModalMode(AM.CREATE); setModalOpen(true); };
  const handleOpenEdit = (record: IProvince) => { setEditingRecord(record); setModalMode(AM.UPDATE); setModalOpen(true); };
  const handleCloseModal = () => { setModalOpen(false); setEditingRecord(null); };

  const handleSave = async (values: IProvinceRequest) => {
    if (modalMode === AM.UPDATE && editingRecord) {
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
    // 🔥 ĐÃ SỬA: Lấy mảng data và lấy tổng số bản ghi
    provinceList: provinceData?.data ?? [], 
    totalRecords: provinceData?.total ?? 0, 

    editingRecord, modalOpen, modalMode, modalImportOpen, currentPage, pageSize, isLoadingList,
    isSaving: createMutation.isPending || updateMutation.isPending,
    handleOpenCreate, handleOpenEdit, handleCloseModal, handleSave, handleDelete, handleSearch, handlePageChange, setModalImportOpen, handleImportSuccess,
  };
}