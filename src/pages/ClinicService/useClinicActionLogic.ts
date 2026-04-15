import { useState } from 'react';
import { message } from 'antd';
import { useClinicList, useCreateClinic, useUpdateClinic, useDeleteClinic } from '@/hooks';
import type { IClinicService } from '@/types';
import { ActionMode } from '@/types';

// IMPORT HOOK LOGIC VỪA TẠO
import { useLogicClinicService } from './useLogicClinicService';

export const useClinicActionLogic = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ActionMode>(ActionMode.CREATE);
  const [editingRecord, setEditingRecord] = useState<IClinicService | null>(null);

  // GỌI HOOK LOGIC TÌM KIẾM/PHÂN TRANG
  const { searchParams, currentPage, pageSize, handleSearch, handlePageChange } = useLogicClinicService();

  const { data: clinicData, isPending } = useClinicList({ ...searchParams, page: currentPage, pageSize });
  
  const createMutation = useCreateClinic();
  const updateMutation = useUpdateClinic();
  const deleteMutation = useDeleteClinic();

  const handleOpenCreate = () => { setEditingRecord(null); setModalMode(ActionMode.CREATE); setModalOpen(true); };
  const handleOpenEdit = (record: IClinicService) => { setEditingRecord(record); setModalMode(ActionMode.UPDATE); setModalOpen(true); };
  
  const handleSave = async (values: IClinicService) => {
    try {
      if (modalMode === ActionMode.UPDATE && editingRecord) {
        await updateMutation.mutateAsync({ id: editingRecord.id, data: values });
        message.success('Cập nhật thành công!');
      } else {
        await createMutation.mutateAsync(values);
        message.success('Thêm mới thành công!');
      }
      setModalOpen(false);
    } catch (e) { message.error('Có lỗi xảy ra!'); }
  };

  const handleDelete = async (id: string | number) => {
    await deleteMutation.mutateAsync(id);
    message.success('Đã xóa dịch vụ!');
  };

  return {
    clinicList: clinicData?.data || [], totalRecords: clinicData?.total || 0,
    isPending, isSaving: createMutation.isPending || updateMutation.isPending,
    currentPage, pageSize, modalOpen, modalMode, editingRecord, setModalOpen,
    handleSearch, handlePageChange, handleOpenCreate, handleOpenEdit, handleSave, handleDelete
  };
};