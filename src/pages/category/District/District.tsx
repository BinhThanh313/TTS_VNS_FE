import React, { useState } from 'react';
import { Button, Input, Select, Form, Space, Tooltip, Modal, message } from 'antd';
import { SearchOutlined, ImportOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { DataTable } from '@/components/common/DataTable';
import { DistrictImportModal } from './components/DistrictImportModal';
import { DistrictEditModal } from './components/DistrictEditModal';
import type { IDistrict } from '@/types/category';
import '../styles/Category.scss';

const { confirm } = Modal;

const mockDistricts: IDistrict[] = [
  { id: 1, provinceName: 'Hà Nội', code: '001', name: 'Quận Ba Đình' },
  { id: 2, provinceName: 'Hà Nội', code: '002', name: 'Quận Hoàn Kiếm' },
  { id: 3, provinceName: 'Hà Nội', code: '005', name: 'Quận Cầu Giấy' },
];

export const District: React.FC = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<IDistrict | null>(null);
  const [form] = Form.useForm();
  const [data, setData] = useState<IDistrict[]>(mockDistricts);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hàm xử lý Cập nhật
  const handleEdit = (record: IDistrict) => {
   setEditingRecord(record);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedRecord: IDistrict) => {
    setData(prev => prev.map(item => item.id === updatedRecord.id ? updatedRecord : item));
    message.success('Cập nhật Huyện/Thị xã thành công!');
  };
  // Hàm xử lý Xóa với xác nhận
  const handleDelete = (id: string | number) => {
    confirm({
      title: 'Xác nhận xóa',
      icon: <ExclamationCircleOutlined />,
      content: 'Bạn có chắc chắn muốn xóa bản ghi này không?',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        setData(prev => prev.filter(item => item.id !== id));
        message.success('Xóa bản ghi thành công');
      },
    });
  };

  const handleSearch = (values: any) => {
    const { name, provinceId } = values;
    const filteredData = mockDistricts.filter((item) => {
      const matchName = !name || item.name.toLowerCase().includes(name.toLowerCase());
      const matchProvince = !provinceId || (provinceId === 'HN' && item.provinceName === 'Hà Nội');
      return matchName && matchProvince;
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
    { title: 'Tỉnh/ Thành phố', dataIndex: 'provinceName', key: 'provinceName' },
    { title: 'Mã Huyện/ Thị xã', dataIndex: 'code', key: 'code', width: 150 },
    { title: 'Tên Huyện/ Thị xã', dataIndex: 'name', key: 'name' },
    {
      title: 'Tác vụ',
      key: 'action',
      align: 'left' as const, // Căn trái theo yêu cầu [cite: 11]
      width: 100,
      render: (_: any, record: IDistrict) => (
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
              <div className="filter-label">Tỉnh/ Thành phố</div>
              <Form.Item name="provinceId" style={{ marginBottom: 0 }}>
                <Select placeholder="-- Chọn Tỉnh --" allowClear showSearch>
                  <Select.Option value="HN">Hà Nội</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="filter-item">
              <div className="filter-label">Tên Huyện/ thị xã</div>
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
        onPageChange={(p, s) => { setCurrentPage(p); setPageSize(s); }} 
      />
      
      <DistrictImportModal 
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={(importedData) => {
          if (importedData) {
            setData((prev) => [...importedData, ...prev]);
          }
        }} 
      />

      <DistrictEditModal 
        open={isEditModalOpen} 
        initialValues={editingRecord}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
};