//src\pages\Province\useColumnProvince.tsx
import { Space, Tooltip } from "antd";
import { Pencil, Trash2 } from "lucide-react";
import type { IProvince } from "@/types";

interface Params {
  currentPage: number;
  pageSize: number;
  onEdit: (record: IProvince) => void;
  onDelete: (id: string | number) => void;
}

export function useColumnProvince({ currentPage, pageSize, onEdit, onDelete }: Params) {
  const columns = [
    {
      title: "STT",
      width: 80,
      align: "center" as const,
      render: (_: unknown, __: unknown, index: number) =>
        (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Mã tỉnh/TP",
      dataIndex: "maTinh",
      align: "left" as const,
      width: 200,
    },
    {
      title: "Tên tỉnh/TP",
      dataIndex: "tenTinh",
      align: "left" as const,
    },
    {
      title: "Tác vụ",
      width: 120,
      align: "center" as const,
      render: (_: unknown, record: IProvince) => (
        <Space size="small">
          <Tooltip title="Cập nhật">
            <Pencil
              size={16}
              className="text-green-500 cursor-pointer"
              onClick={() => onEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Trash2
              size={16}
              className="text-red-500 cursor-pointer"
              onClick={() => onDelete(record.id)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return { columns };
}