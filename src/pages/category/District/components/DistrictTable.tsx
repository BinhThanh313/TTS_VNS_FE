import React from 'react';
import { Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataTable, AppButton } from '@/components/common';
import type { IDistrict } from '@/types/category';

interface Props { data: IDistrict[]; currentPage: number; pageSize: number; onEdit: (record: IDistrict) => void; onDelete: (id: string | number) => void; onPageChange: (page: number, size: number) => void; }

export const DistrictTable: React.FC<Props> = ({ data, currentPage, pageSize, onEdit, onDelete, onPageChange }) => {
  const columns = [
    { title: 'STT', width: 60, align: 'center' as const, render: (_: any, __: any, i: number) => (currentPage - 1) * pageSize + i + 1 },
    { title: 'Tỉnh/ Thành phố', dataIndex: 'provinceName' },
    { title: 'Mã Huyện/ Thị xã', dataIndex: 'code', width: 150 },
    { title: 'Tên Huyện/ Thị xã', dataIndex: 'name' },
    {
      title: 'Tác vụ', width: 100,
      render: (_: any, record: IDistrict) => (
        <Space size="small">
          <Tooltip title="Cập nhật"><AppButton type="text" icon={<EditOutlined style={{ color: '#1890ff' }}/>} onClick={() => onEdit(record)} /></Tooltip>
          <Tooltip title="Xóa"><AppButton type="text" danger icon={<DeleteOutlined />} onClick={() => onDelete(record.id)} /></Tooltip>
        </Space>
      ),
    },
  ];

  return <DataTable columns={columns} dataSource={data} totalRecords={data.length} currentPage={currentPage} pageSize={pageSize} onPageChange={onPageChange} />;
};