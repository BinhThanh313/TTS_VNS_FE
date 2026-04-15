import { Space, Tooltip } from "antd";
import { Pencil, Trash2 } from "lucide-react";
import type { IDistrict } from "@/types";

interface Params {
  currentPage: number;
  pageSize: number;
  onEdit: (record: IDistrict) => void;
  onDelete: (id: string | number) => void;
}

export function useColumnDistrict({ currentPage, pageSize, onEdit, onDelete }: Params) {
  const columns = [
    { title: "STT", width: 60, align: "center" as const, render: (_: any, __: any, i: number) => (currentPage - 1) * pageSize + i + 1 },
    { title: "Tên tỉnh/TP", dataIndex: "provinceName", align: "left" as const, width: 250 },
    { title: "Mã huyện/thị xã", dataIndex: "code", align: "left" as const, width: 200 },
    { title: "Tên huyện/thị xã", dataIndex: "name", align: "left" as const },
    {
      title: "Tác vụ", width: 100, align: "center" as const,
      render: (_: any, record: IDistrict) => (
        <Space size="middle">
          <Tooltip title="Cập nhật"><Pencil size={16} className="text-green-500 cursor-pointer hover:text-green-700" onClick={() => onEdit(record)} /></Tooltip>
          <Tooltip title="Xóa"><Trash2 size={16} className="text-red-500 cursor-pointer hover:text-red-700" onClick={() => onDelete(record.id)} /></Tooltip>
        </Space>
      ),
    },
  ];
  return { columns };
}