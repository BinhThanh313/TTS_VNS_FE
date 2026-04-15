import { Space, Tooltip } from "antd";
import { Pencil, Trash2 } from "lucide-react";
import type { IClinicService } from "@/types";

interface Params {
  currentPage: number;
  pageSize: number;
  onEdit: (record: IClinicService) => void;
  onDelete: (id: string | number) => void;
}

export function useColumnClinicService({ currentPage, pageSize, onEdit, onDelete }: Params) {
  const columns = [
    { title: 'STT', width: 60, align: 'center' as const, render: (_: unknown, __: unknown, i: number) => (currentPage - 1) * pageSize + i + 1 },
    { title: 'Mã dịch vụ', dataIndex: 'maDichVu', align: 'left' as const },
    { title: 'Cơ sở', dataIndex: 'coSo', align: 'left' as const },
    { title: 'Tên dịch vụ', dataIndex: 'tenDichVu', align: 'left' as const },
    { title: 'Nhóm dịch vụ', dataIndex: 'nhomDichVu', align: 'left' as const },
    { title: 'Giá DV', dataIndex: 'giaDV', align: 'right' as const, render: (val: number) => val?.toLocaleString('vi-VN') },
    { title: 'Giá BHYT', dataIndex: 'giaBHYT', align: 'right' as const, render: (val: number) => val?.toLocaleString('vi-VN') },
    {
      title: 'Tác vụ', align: 'center' as const, width: 100,
      render: (_: unknown, record: IClinicService) => (
        <Space size="middle">
          <Tooltip title="Cập nhật"><Pencil size={16} className="text-green-500 cursor-pointer" onClick={() => onEdit(record)} /></Tooltip>
          <Tooltip title="Xóa"><Trash2 size={16} className="text-red-500 cursor-pointer" onClick={() => onDelete(record.id)} /></Tooltip>
        </Space>
      ),
    },
  ];

  return { columns };
}