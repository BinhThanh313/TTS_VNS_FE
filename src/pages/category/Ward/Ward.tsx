import React, { useState } from 'react';
import { Button, Input, Select, Form, Space, Tooltip, Modal, message } from 'antd';
import { SearchOutlined, ImportOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { DataTable } from '@/components/common/DataTable';
import { WardImportModal } from './components/WardImportModal';
import { WardEditModal } from './components/WardEditModal';
import '../styles/Category.scss';

const { confirm } = Modal;

export interface IWard {
  id: string | number;
  districtName: string;
  code: string;
  name: string;
}

const mockWards: IWard[] = [
  { id: 1, districtName: 'Ba Đình', code: '001', name: 'Phường Phúc Xá' },
  { id: 2, districtName: 'Ba Đình', code: '004', name: 'Phường Trúc Bạch' },
  { id: 3, districtName: 'Cầu Giấy', code: '040', name: 'Phường Dịch Vọng' },
];

export const Ward: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<IWard | null>(null);
  const [form] = Form.useForm();
  const [data, setData] = useState<IWard[]>(mockWards);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (record: IWard) => {
    setEditingRecord(record);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedRecord: IWard) => {
    setData(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    message.success('Cập nhật Xã/Phường thành công!');
  };

  const handleDelete = (id: string | number) => {
    confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa xã/phường này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        setData(prev => prev.filter(item => item.id !== id));
        message.success('Xóa thành công');
      },
    });
  };

  const handleSearch = (values: any) => {
    const { districtId, name } = values;
    const filteredData = mockWards.filter((item) => {
      const matchDistrict = !districtId || 
        (districtId === 'BD' && item.districtName === 'Ba Đình') ||
        (districtId === 'CG' && item.districtName === 'Cầu Giấy');
      const matchName = !name || item.name.toLowerCase().includes(name.toLowerCase());
      return matchDistrict && matchName;
    });
    setData(filteredData);
    setCurrentPage(1); 
  };

  const columns = [
    { 
      title: 'STT', 
      width: 60, 
      align: 'center' as const, 
      render: (_: any, __: any, i: number) => (currentPage - 1) * pageSize + i + 1 
    },
    { title: 'Quận/ Huyện', dataIndex: 'districtName', key: 'districtName' },
    { title: 'Mã Xã/ Phường', dataIndex: 'code', width: 150 },
    { title: 'Tên Xã/ Phường', dataIndex: 'name' },
    {
      title: 'Tác vụ',
      key: 'action',
      align: 'left' as const, // Căn trái theo yêu cầu [cite: 33]
      width: 100,
      render: (_: any, record: IWard) => (
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

  return (
    <div className="category-wrapper">
      <Form form={form} layout="vertical" onFinish={handleSearch}>
        <div className="filter-section">
          <div className="filter-row">
            <div className="filter-item">
              <div className="filter-label">Quận/ Huyện</div>
              <Form.Item name="districtId" style={{ marginBottom: 0 }}>
                <Select placeholder="-- Chọn Quận/Huyện --" allowClear showSearch>
                  <Select.Option value="BD">Ba Đình</Select.Option>
                  <Select.Option value="CG">Cầu Giấy</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="filter-item">
              <div className="filter-label">Tên Xã/ Phường</div>
              <Form.Item name="name" style={{ marginBottom: 0 }}>
                <Input placeholder="Nhập tên..." maxLength={250} allowClear />
              </Form.Item>
            </div>
          </div>
          <div className="action-row">
            <Button icon={<ImportOutlined />} onClick={() => setIsModalOpen(true)}>Import file</Button>
            <Button type="primary" icon={<SearchOutlined />} htmlType="submit">Tìm kiếm</Button>
          </div>
        </div>
      </Form>

      <DataTable 
        columns={columns} 
        dataSource={data} 
        totalRecords={data.length} 
        currentPage={currentPage} 
        pageSize={pageSize} 
        bordered={false} 
        onPageChange={(p, s) => { setCurrentPage(p); setPageSize(s); }} 
      />

      <WardEditModal 
        open={isEditModalOpen} 
        initialValues={editingRecord}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />
      
      <WardImportModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={(importedData) => {
          if (importedData) {
             setData(prev => [...importedData, ...prev]);
          }
        }} 
      />
    </div>
  );
};