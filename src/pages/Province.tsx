import React, { useState } from 'react';
import { Table, Button, Input, Space, Tooltip, Upload, message, Modal, Form } from 'antd';
import { SearchOutlined, ImportOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ExcelJS from 'exceljs';
import '../styles/Category.scss';

interface DataType {
  key: string;
  stt: number;
  maTinh: string;
  tenTinh: string;
}

const mockData: DataType[] = [
  { key: '1', stt: 1, maTinh: '271', tenTinh: 'Hà Nội' },
  { key: '2', stt: 2, maTinh: '2', tenTinh: 'Hà Giang' },
  { key: '3', stt: 3, maTinh: '4', tenTinh: 'Cao Bằng' },
  { key: '4', stt: 4, maTinh: '6', tenTinh: 'Bắc Kạn' },
  { key: '5', stt: 5, maTinh: '8', tenTinh: 'Tuyên Quang' },
  { key: '6', stt: 6, maTinh: '271', tenTinh: 'Hà Nội' },
  { key: '7', stt: 7, maTinh: '2', tenTinh: 'Hà Giang' },
  { key: '8', stt: 8, maTinh: '4', tenTinh: 'Cao Bằng' },
  { key: '9', stt: 9, maTinh: '6', tenTinh: 'Bắc Kạn' },
  { key: '10', stt: 10, maTinh: '8', tenTinh: 'Tuyên Quang' },
  { key: '11', stt: 11, maTinh: '271', tenTinh: 'Hà Nội' },
  { key: '12', stt: 12, maTinh: '2', tenTinh: 'Hà Giang' },
  { key: '13', stt: 13, maTinh: '4', tenTinh: 'Cao Bằng' },
  { key: '14', stt: 14, maTinh: '6', tenTinh: 'Bắc Kạn' },
  { key: '15', stt: 15, maTinh: '8', tenTinh: 'Tuyên Quang' },
  { key: '16', stt: 16, maTinh: '271', tenTinh: 'Hà Nội' },
  { key: '17', stt: 17, maTinh: '2', tenTinh: 'Hà Giang' },
  { key: '18', stt: 18, maTinh: '4', tenTinh: 'Cao Bằng' },
  { key: '19', stt: 19, maTinh: '6', tenTinh: 'Bắc Kạn' },
  { key: '20', stt: 20, maTinh: '8', tenTinh: 'Tuyên Quang' },
  { key: '21', stt: 21, maTinh: '271', tenTinh: 'Hà Nội' },
  { key: '22', stt: 22, maTinh: '2', tenTinh: 'Hà Giang' },
  { key: '23', stt: 23, maTinh: '4', tenTinh: 'Cao Bằng' },
  { key: '24', stt: 24, maTinh: '6', tenTinh: 'Bắc Kạn' },
  { key: '25', stt: 25, maTinh: '8', tenTinh: 'Tuyên Quang' },
];

export default function ProvincePage() {
  const [data, setData] = useState<DataType[]>(mockData);
  const [searchName, setSearchName] = useState<string>('');
  const [searchCode, setSearchCode] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  const handleEdit = (record: DataType) => {
    setEditingRecord(record);
    form.setFieldsValue({
      maTinh: record.maTinh,
      tenTinh: record.tenTinh,
    });
    setIsModalOpen(true);
  };

  const handleUpdate = (values: any) => {
    // Cập nhật thông tin
    const newData = data.map((item) => 
      item.maTinh === editingRecord?.maTinh ? { ...item, tenTinh: values.tenTinh } : item
    );
    setData(newData);
    message.success('Cập nhật thông tin thành công!');
    setIsModalOpen(false); 
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const handleDelete = (maTinh: string) => {
    const newData = data.filter(item => item.maTinh !== maTinh);
    setData(newData);
    message.success('Đã xóa thành công!');
  };

  const handleSearch = () => {
    const filteredData = mockData.filter((item) => {
      const matchName = item.tenTinh.toLowerCase().includes(searchName.toLowerCase());
      const matchCode = item.maTinh.includes(searchCode);
      return matchName && matchCode;
    });
    setData(filteredData);
  };

  const handleImport = (file: File) => {
    const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
    if (!isExcel) {
      message.error('Chỉ hỗ trợ định dạng file Excel (.xlsx, .xls)!');
      return Upload.LIST_IGNORE;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const buffer = e.target?.result;
      if (buffer) {
        try {
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(buffer as ArrayBuffer);
          const worksheet = workbook.getWorksheet(1); 
          
          if (!worksheet) {
            message.error('File Excel không có dữ liệu!');
            return;
          }

          const importedData: DataType[] = [];
          
          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) { 
              const maTinh = row.getCell(1).value?.toString() || '';
              const tenTinh = row.getCell(2).value?.toString() || '';
              
              if (maTinh && tenTinh) {
                importedData.push({
                  key: Date.now().toString() + rowNumber,
                  stt: data.length + importedData.length + 1,
                  maTinh: maTinh,
                  tenTinh: tenTinh,
                });
              }
            }
          });

          setData((prevData) => [...prevData, ...importedData]);
          message.success(`Đã import thành công ${importedData.length} Tỉnh/Thành phố!`);
          
        } catch (error) {
          message.error('Đã xảy ra lỗi khi đọc file Excel!');
          console.error(error);
        }
      }
    };

    reader.readAsArrayBuffer(file);
    return false; 
  };

  const columns: ColumnsType<DataType> = [
    { title: 'STT', dataIndex: 'stt', align: 'center', width: 80 },
    { title: 'Mã tỉnh/TP', dataIndex: 'maTinh' },
    { title: 'Tên tỉnh/TP', dataIndex: 'tenTinh' },
    {
      title: 'Tác vụ', align: 'center', width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title="Cập nhật">
            <Button type="text" icon={<EditOutlined style={{ color: '#1677ff' }} />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.maTinh)}/>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="category-wrapper">     
      <div className="filter-section">
        <div className="filter-row">
          <div className="filter-item">
            <div className="filter-label">Tên tỉnh/TP</div>
            <Input placeholder="Nhập tên tỉnh/TP" value={searchName} onChange={(e) => setSearchName(e.target.value)} onPressEnter={handleSearch} />
          </div>
          <div className="filter-item">
            <div className="filter-label">Mã tỉnh/TP</div>
            <Input placeholder="Nhập mã (Tối đa 6 số)" maxLength={6} value={searchCode} onChange={(e) => setSearchCode(e.target.value)} onPressEnter={handleSearch} />
          </div>
        </div>
        
        <div className="action-row">
          <Upload beforeUpload={handleImport} showUploadList={false} accept=".xls,.xlsx">
            <Button icon={<ImportOutlined />}>Import file</Button>
          </Upload>
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>Tìm kiếm</Button>
        </div>
      </div>

      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={{ defaultPageSize: 15, showSizeChanger: true }} 
        locale={{ emptyText: 'Không có bản ghi nào thỏa mãn điều kiện tìm kiếm' }}
      />

      <Modal 
        title="Cập nhật Tỉnh/Thành phố" 
        open={isModalOpen} 
        onOk={() => form.submit()} 
        onCancel={handleCancel}
        okText="Lưu lại"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item 
            label="Mã tỉnh/TP" 
            name="maTinh"
          >
            <Input disabled placeholder="Nhập mã tỉnh/TP" />
          </Form.Item>

          <Form.Item 
            label="Tên tỉnh/TP" 
            name="tenTinh" 
            rules={[
              { required: true, message: 'Vui lòng nhập tên tỉnh/TP!' },
              { max: 250, message: 'Tên Tỉnh/TP không được vượt quá 250 ký tự!' }
            ]}
          >
            <Input placeholder="Nhập tên tỉnh/TP" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}