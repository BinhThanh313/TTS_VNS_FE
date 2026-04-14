import { useState } from "react";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { useProvinceList, useUpdateProvince, useDeleteProvince } from "@/hooks";
import { provinceService } from "@/services";
import type { IProvince, IProvinceRequest } from "@/types";
import { ActionMode as AM } from "@/types";
import { useLogicProvince } from "./useLogicProvince";

export function useProvinceActionLogic() {
  const queryClient = useQueryClient();
  const [editingRecord, setEditingRecord] = useState<IProvince | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<AM>(AM.UPDATE);
  const [modalImportOpen, setModalImportOpen] = useState(false);

  // Hook Search Pagination đã lấy ở form tìm kiếm
  const { searchParams, currentPage, pageSize, handleSearch, handlePageChange } = useLogicProvince();
  
  // Nối params với page/pageSize để API trả về đúng trang
  const queryParams = { ...searchParams, page: currentPage, pageSize };
  const { data: provinceData, isPending: isLoadingList } = useProvinceList(queryParams);
  
  const updateMutation = useUpdateProvince();
  const deleteMutation = useDeleteProvince();

  const handleOpenEdit = (record: IProvince) => { setEditingRecord(record); setModalMode(AM.UPDATE); setModalOpen(true); };
  const handleCloseModal = () => { setModalOpen(false); setEditingRecord(null); };

  const handleSave = async (values: IProvinceRequest) => {
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

  // Hàm xử lý khi file Excel được đọc xong (Nhận data từ ProvinceImportModal)
  const handleImportSuccess = async (importedData: IProvince[]) => { 
    setModalImportOpen(false); 
    await provinceService.importData(importedData);
    queryClient.invalidateQueries({ queryKey: ["province"] }); // Làm mới bảng
    message.success(`Đã import thành công ${importedData.length} bản ghi!`); 
  };

  return {
    provinceList: provinceData?.data ?? [], 
    totalRecords: provinceData?.total ?? 0, 
    editingRecord, modalOpen, modalMode, modalImportOpen, currentPage, pageSize, isLoadingList,
    isSaving: updateMutation.isPending,
    handleOpenEdit, handleCloseModal, handleSave, handleDelete, handleSearch, handlePageChange, setModalImportOpen, handleImportSuccess,
  };
}