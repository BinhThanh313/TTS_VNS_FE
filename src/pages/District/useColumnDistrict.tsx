import { Space, Tooltip } from "antd";
import { Pencil, Trash2, Eye } from "lucide-react";
import type { IDistrict } from "@/types";

interface Params {
  currentPage: number;
  pageSize: number;
  onView: (record: IDistrict) => void;
  onEdit: (record: IDistrict) => void;
  onDelete: (id: string | number) => void;
}

export function useColumnDistrict({ currentPage, pageSize, onView, onEdit, onDelete }: Params) {
  const columns = [
    { title: "STT", width: 60, align: "center" as const, render: (_: any, __: any, i: number) => (currentPage - 1) * pageSize + i + 1 },
    { title: "Tỉnh/Thành phố", dataIndex: "provinceName", align: "left" as const },
    { title: "Mã Huyện/Thị xã", dataIndex: "code", align: "left" as const, width: 180 },
    { title: "Tên Huyện/Thị xã", dataIndex: "name", align: "left" as const },
    {
      title: "Tác vụ", width: 120, align: "center" as const,
      render: (_: any, record: IDistrict) => (
        <Space size="middle">
          <Tooltip title="Xem chi tiết"><Eye size={16} className="text-gray-500 cursor-pointer hover:text-gray-800" onClick={() => onView(record)} /></Tooltip>
          <Tooltip title="Cập nhật"><Pencil size={16} className="text-green-500 cursor-pointer hover:text-green-700" onClick={() => onEdit(record)} /></Tooltip>
          <Tooltip title="Xóa"><Trash2 size={16} className="text-red-500 cursor-pointer hover:text-red-700" onClick={() => onDelete(record.id)} /></Tooltip>
        </Space>
      ),
    },
  ];
  return { columns };
}