import React, { useState } from 'react';
import { Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { DataTable } from '@/components/common/DataTable;
// import { ProvinceModal } from './components/ProvinceModal'; // Lát nữa bạn sẽ làm Modal sau

// 1. Khai báo kiểu dữ liệu cho Tỉnh/Thành
export interface IProvince {
  id: number | string;
  code: string;
  name: string;
}

export const Province: React.FC = () => {
  // 2. Khởi tạo State cho phân trang
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Dữ liệu giả lập (Sau này bạn call API và set lại state này)
  const dataSource: IProvince[] = [
    { id: 1, code: 'HN', name: 'Hà Nội' },
    { id: 2, code: 'HCM', name: 'Hồ Chí Minh' },
    { id: 3, code: 'DN', name: 'Đà Nẵng' },
  ];

  // 3. Khai báo các cột (Columns)
  const columns = [
    { 
      title: 'STT', 
      key: 'stt', 
      width: 60, 
      align: 'center' as const,
      // Công thức tính STT tự động theo trang
      render: (_: any, __: any, index: number) => (currentPage - 1) * pageSize + index + 1 
    },
    { title: 'Mã Tỉnh/Thành', dataIndex: 'code', key: 'code', width: 200 },
    { title: 'Tên Tỉnh/Thành', dataIndex: 'name', key: 'name' },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      align: 'center' as const,
      render: (_: any, record: IProvince) => (
        <Space size="middle">
          <Button 
            type="text" 
            icon={<EditOutlined style={{ color: '#1677ff' }} />} 
            onClick={() => console.log('Mở modal sửa', record)}
          />
          <Popconfirm title="Bạn có chắc chắn muốn xóa?" onConfirm={() => console.log('Xóa', record.id)}>
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="category-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2>Quản lý Tỉnh/Thành</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => console.log('Mở modal thêm mới')}>
          Thêm mới
        </Button>
      </div>

      {/* 4. Gọi Component DataTable xịn sò của chúng ta */}
      <DataTable<IProvince>
        rowKey="id" // Khóa chính của data
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        totalRecords={50} // Lấy tổng số từ API truyền vào
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={(page, size) => {
          setCurrentPage(page);
          setPageSize(size);
          // TODO: Fetch lại API với page và size mới ở đây
        }}
      />
    </div>
  );
};