import React from 'react';
import { Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { DataTable, AppButton } from '@/components/common'; // Import từ common
import type { IClinicService } from '@/types/category';

interface ClinicServiceTableProps {
  data: IClinicService[];
  currentPage: number;
  pageSize: number;
  onEdit: (record: IClinicService) => void;
  onDelete: (id: string | number) => void;
  onPageChange: (page: number, size: number) => void;
}

export const ClinicServiceTable: React.FC<ClinicServiceTableProps> = ({ 
  data, currentPage, pageSize, onEdit, onDelete, onPageChange 
}) => {

  const columns = [
    { title: 'STT', width: 60, align: 'center' as const, render: (_: any, __: any, i: number) => (currentPage - 1) * pageSize + i + 1 },
    { title: 'Mã dịch vụ', dataIndex: 'maDichVu', align: 'left' as const },
    { title: 'Mã DV BHYT', dataIndex: 'maDVBHYT', align: 'left' as const },
    { title: 'Cơ sở', dataIndex: 'coSo', align: 'left' as const },
    { title: 'Tên dịch vụ', dataIndex: 'tenDichVu', align: 'left' as const },
    { title: 'Tên DV BHYT', dataIndex: 'tenDVBHYT', align: 'left' as const },
    { title: 'Loại dịch vụ', dataIndex: 'loaiDichVu', align: 'left' as const },
    { title: 'Nhóm dịch vụ', dataIndex: 'nhomDichVu', align: 'left' as const },
    { title: 'Nhóm DV chi tiết', dataIndex: 'chiTietNhomDichVu', align: 'left' as const },
    { title: 'ĐVT', dataIndex: 'donViTinh', align: 'left' as const },
    { title: 'Giá DV', dataIndex: 'giaDV', align: 'right' as const, render: (val: number) => val?.toLocaleString('vi-VN') },
    { title: 'Giá BHYT', dataIndex: 'giaBHYT', align: 'right' as const, render: (val: number) => val?.toLocaleString('vi-VN') },
    {
      title: 'Tác vụ',
      align: 'center' as const,
      width: 100,
      render: (_: any, record: IClinicService) => (
        <Space size="small">
          <Tooltip title="Cập nhật">
            <AppButton type="text" icon={<EditOutlined style={{ color: '#52c41a', fontSize: '16px' }}/>} onClick={() => onEdit(record)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <AppButton type="text" danger icon={<DeleteOutlined style={{ fontSize: '16px' }} />} onClick={() => onDelete(record.id)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={data}
      totalRecords={data.length}
      currentPage={currentPage}
      pageSize={pageSize}
      onPageChange={onPageChange}
    />
  );
};