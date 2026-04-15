import { Space, Tooltip } from "antd";
import { Pencil, Trash2 } from "lucide-react";
import type { IWard } from "@/types";

interface Params {
  currentPage: number;
  pageSize: number;
  onEdit: (record: IWard) => void;
  onDelete: (id: string | number) => void;
}

export function useColumnWard({ currentPage, pageSize, onEdit, onDelete }: Params) {
  const columns = [
    { title: "STT", width: 80, align: "center" as const, render: (_: any, __: any, i: number) => (currentPage - 1) * pageSize + i + 1 },
    { title: "Mã xã/phường", dataIndex: "code", align: "left" as const, width: 250 },
    { title: "Tên xã/phường", dataIndex: "name", align: "left" as const },
    {
      title: "Tác vụ", width: 100, align: "center" as const, // Cột tác vụ vẫn căn giữa
      render: (_: any, record: IWard) => (
        <Space size="middle">
          <Tooltip title="Cập nhật"><Pencil size={16} className="text-green-500 cursor-pointer hover:text-green-700" onClick={() => onEdit(record)} /></Tooltip>
          <Tooltip title="Xóa"><Trash2 size={16} className="text-red-500 cursor-pointer hover:text-red-700" onClick={() => onDelete(record.id)} /></Tooltip>
        </Space>
      ),
    },
  ];
  return { columns };
}