import React from 'react';
import { Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataTable, AppButton } from '@/components/common';
import type { IProvince } from '@/types/category';

interface Props {
  data: IProvince[];
  currentPage: number;
  pageSize: number;
  onEdit: (record: IProvince) => void;
  onDelete: (id: string | number) => void;
  onPageChange: (page: number, size: number) => void;
}

export const ProvinceTable: React.FC<Props> = ({ data, currentPage, pageSize, onEdit, onDelete, onPageChange }) => {
  const columns = [
    { title: 'STT', width: 80, align: 'center' as const, render: (_: any, __: any, index: number) => (currentPage - 1) * pageSize + index + 1 },
    { title: 'Mã tỉnh/TP', dataIndex: 'maTinh', width: 200, align: 'left' as const },
    { title: 'Tên tỉnh/TP', dataIndex: 'tenTinh', align: 'left' as const },
    {
      title: 'Tác vụ', width: 120, align: 'left' as const,
      render: (_: any, record: IProvince) => (
        <Space size="small">
          <Tooltip title="Cập nhật"><AppButton type="text" icon={<EditOutlined style={{ color: '#1890ff' }} />} onClick={() => onEdit(record)} /></Tooltip>
          <Tooltip title="Xóa"><AppButton type="text" danger icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} /></Tooltip>
        </Space>
      ),
    },
  ];

  return <DataTable columns={columns} dataSource={data} totalRecords={data.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />;
};