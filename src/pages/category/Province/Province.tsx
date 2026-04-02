import React, { useState } from 'react';
import { Button, Input, Form, message, Space, Tooltip, Modal } from 'antd';
import { 
  SearchOutlined, 
  ImportOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  ExclamationCircleOutlined 
} from '@ant-design/icons';
import { DataTable } from '@/components/common/DataTable';
import { ProvinceImportModal } from './components/ProvinceImportModal';
import { ProvinceEditModal } from './components/ProvinceEditModal';
import '../styles/Category.scss';

const { confirm } = Modal;

// ĐỊNH NGHĨA KIỂU DỮ LIỆU Ở ĐÂY
export interface IProvince {
  id: string | number;
  maTinh: string;
  tenTinh: string;
}

const mockData: IProvince[] = [
  { id: 1, maTinh: '01', tenTinh: 'Thành phố Hà Nội' },
  { id: 2, maTinh: '79', tenTinh: 'Thành phố Hồ Chí Minh' },
  { id: 3, maTinh: '48', tenTinh: 'Thành phố Đà Nẵng' },
  { id: 4, maTinh: '31', tenTinh: 'Thành phố Hải Phòng' },
  { id: 5, maTinh: '92', tenTinh: 'Thành phố Cần Thơ' },
];

export const Province: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<IProvince | null>(null);
  const [form] = Form.useForm();
  const [data, setData] = useState<IProvince[]>(mockData);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(15);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);

  // Hàm xử lý Cập nhật
  const handleEdit = (record: IProvince) => {
    setEditingRecord(record); 
    setIsEditModalOpen(true); 
  };

  const handleSaveEdit = (updatedRecord: IProvince) => {
    // Logic cập nhật vào mảng data (sau này là gọi API PUT/PATCH)
    setData(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    message.success('Cập nhật thông tin thành công!');
  };

  // Hàm xử lý Xóa với xác nhận
  const handleDelete = (id: string | number) => {
    confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa tỉnh/thành phố này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        setData(prev => prev.filter(item => item.id !== id));
        message.success('Xóa bản ghi thành công');
      },
    });
  };

  const columns = [
    { 
      title: 'STT', 
      width: 80, 
      align: 'center' as const, // STT căn giữa 
      render: (_: any, __: any, index: number) => (currentPage - 1) * pageSize + index + 1 
    },
    { 
      title: 'Mã tỉnh/TP', 
      dataIndex: 'maTinh', 
      key: 'maTinh', 
      width: 200,
      align: 'left' as const // Mã tỉnh căn trái 
    },
    { 
      title: 'Tên tỉnh/TP', 
      dataIndex: 'tenTinh', 
      key: 'tenTinh',
      align: 'left' as const // Tên tỉnh căn trái 
    },
    {
      title: 'Tác vụ',
      key: 'action',
      align: 'left' as const, // Cột tác vụ căn trái theo yêu cầu 
      width: 120,
      render: (_: any, record: IProvince) => (
        <Space size="small">
          <Tooltip title="Cập nhật">
            <Button 
              type="text" 
              icon={<EditOutlined style={{ color: '#1890ff' }} />} 
              onClick={() => handleEdit(record)} 
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(record.id)} 
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleSearch = (values: any) => {
    const { tenTinh, maTinh } = values;
    const filteredData = mockData.filter(item => {
      const matchName = !tenTinh || item.tenTinh.toLowerCase().includes(tenTinh.toLowerCase());
      const matchCode = !maTinh || item.maTinh.includes(maTinh);
      return matchName && matchCode;
    });
    setData(filteredData);
    setCurrentPage(1);
  };

  return (
    <div className="category-wrapper">
      <Form form={form} layout="vertical" onFinish={handleSearch}>
        <div className="filter-section">
          <div className="filter-row">
            <div className="filter-item">
              <div className="filter-label">Tên tỉnh/TP</div>
              <Form.Item name="tenTinh" style={{ marginBottom: 0 }}>
                <Input placeholder="Nhập tên tỉnh/TP" allowClear />
              </Form.Item>
            </div>
            <div className="filter-item">
              <div className="filter-label">Mã tỉnh/TP</div>
              <Form.Item name="maTinh" style={{ marginBottom: 0 }}>
                <Input placeholder="Nhập mã (Tối đa 6 số)" maxLength={6} allowClear />
              </Form.Item>
            </div>
          </div>
          <div className="action-row">
            <Button icon={<ImportOutlined />} onClick={() => setIsImportModalOpen(true)}>Import file</Button>
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">Tìm kiếm</Button>
          </div>
        </div>
      </Form>

      <DataTable<IProvince>
        columns={columns}
        dataSource={data}
        totalRecords={data.length}
        currentPage={currentPage}
        pageSize={pageSize}
        bordered={false}
        onPageChange={(page: number, size: number) => {
          setCurrentPage(page);
          setPageSize(size);
        }}
      />

      <ProvinceEditModal
        open={isEditModalOpen}
        initialValues={editingRecord}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingRecord(null);
        }}
        onSave={handleSaveEdit}
      />

      <ProvinceImportModal
        open={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onSuccess={(importedData) => {
          setData((prev) => [...importedData, ...prev]);
        }}
      />
    </div>
  );
};