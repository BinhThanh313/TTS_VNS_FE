import React from 'react';
import { Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataTable, AppButton } from '@/components/common';
import type { IWard } from '@/types/category';

interface Props { data: IWard[]; currentPage: number; pageSize: number; onEdit: (record: IWard) => void; onDelete: (id: string | number) => void; onPageChange: (page: number, size: number) => void; }

export const WardTable: React.FC<Props> = ({ data, currentPage, pageSize, onEdit, onDelete, onPageChange }) => {
  const columns = [
    { title: 'STT', width: 60, align: 'center' as const, render: (_: any, __: any, i: number) => (currentPage - 1) * pageSize + i + 1 },
    { title: 'Quận/ Huyện', dataIndex: 'districtName' },
    { title: 'Mã Xã/ Phường', dataIndex: 'code', width: 150 },
    { title: 'Tên Xã/ Phường', dataIndex: 'name' },
    {
      title: 'Tác vụ', align: 'left' as const, width: 100,
      render: (_: any, record: IWard) => (
        <Space size="small">
          <Tooltip title="Cập nhật"><AppButton type="text" icon={<EditOutlined style={{ color: '#52c41a' }} />} onClick={() => onEdit(record)} /></Tooltip>
          <Tooltip title="Xóa"><AppButton type="text" danger icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} /></Tooltip>
        </Space>
      ),
    },
  ];

  return <DataTable columns={columns} dataSource={data} totalRecords={data.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />;
};