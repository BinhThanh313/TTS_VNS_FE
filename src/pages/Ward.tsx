import React, { useState } from 'react';
import { Table, Button, Input, Space, Select, Tooltip, Upload, message, Modal, Form } from 'antd';
import { SearchOutlined, ImportOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ExcelJS from 'exceljs';
import '../styles/Category.scss';

interface WardType {
  key: string;
  stt: number;
  tenHuyen: string;
  maXa: string;
  tenXa: string;
}

const mockData: WardType[] = [
  { key: '1', stt: 1, tenHuyen: 'Ba Đình', maXa: '4', tenXa: 'Phường Ba Đình' },
  { key: '2', stt: 2, tenHuyen: 'Ba Đình', maXa: '277', tenXa: 'Phường Bạch Mai' },
  { key: '3', stt: 3, tenHuyen: 'Hoàn Kiếm', maXa: '10', tenXa: 'Phường Tràng Tiền' },
  { key: '4', stt: 4, tenHuyen: 'Ba Đình', maXa: '5', tenXa: 'Phường Kim Mã' },
  { key: '5', stt: 5, tenHuyen: 'Ba Đình', maXa: '6', tenXa: 'Phường Ngọc Hà' },
  { key: '6', stt: 6, tenHuyen: 'Ba Đình', maXa: '7', tenXa: 'Phường Đội Cấn' },
  { key: '7', stt: 7, tenHuyen: 'Hoàn Kiếm', maXa: '11', tenXa: 'Phường Hàng Bạc' },
  { key: '8', stt: 8, tenHuyen: 'Hoàn Kiếm', maXa: '12', tenXa: 'Phường Hàng Đào' },
  { key: '9', stt: 9, tenHuyen: 'Hoàn Kiếm', maXa: '13', tenXa: 'Phường Hàng Gai' },
  { key: '10', stt: 10, tenHuyen: 'Đống Đa', maXa: '20', tenXa: 'Phường Láng Hạ' },
  { key: '11', stt: 11, tenHuyen: 'Đống Đa', maXa: '21', tenXa: 'Phường Khâm Thiên' },
  { key: '12', stt: 12, tenHuyen: 'Đống Đa', maXa: '22', tenXa: 'Phường Trung Liệt' },
  { key: '13', stt: 13, tenHuyen: 'Hai Bà Trưng', maXa: '30', tenXa: 'Phường Bách Khoa' },
  { key: '14', stt: 14, tenHuyen: 'Hai Bà Trưng', maXa: '31', tenXa: 'Phường Thanh Nhàn' },
  { key: '15', stt: 15, tenHuyen: 'Hai Bà Trưng', maXa: '32', tenXa: 'Phường Quỳnh Mai' },
  { key: '16', stt: 16, tenHuyen: 'Cầu Giấy', maXa: '40', tenXa: 'Phường Dịch Vọng' },
  { key: '17', stt: 17, tenHuyen: 'Cầu Giấy', maXa: '41', tenXa: 'Phường Nghĩa Tân' },
  { key: '18', stt: 18, tenHuyen: 'Cầu Giấy', maXa: '42', tenXa: 'Phường Mai Dịch' },
  { key: '19', stt: 19, tenHuyen: 'Thanh Xuân', maXa: '50', tenXa: 'Phường Nhân Chính' },
  { key: '20', stt: 20, tenHuyen: 'Thanh Xuân', maXa: '51', tenXa: 'Phường Khương Trung' },
  { key: '21', stt: 21, tenHuyen: 'Thanh Xuân', maXa: '52', tenXa: 'Phường Khương Mai' },
  { key: '22', stt: 22, tenHuyen: 'Long Biên', maXa: '60', tenXa: 'Phường Bồ Đề' },
  { key: '23', stt: 23, tenHuyen: 'Long Biên', maXa: '61', tenXa: 'Phường Gia Thụy' },
];

export default function WardPage() {
  const [data, setData] = useState<WardType[]>(mockData);
  const [selectedDistrictForImport, setSelectedDistrictForImport] = useState<string | null>(null);
  
  const [searchDistrict, setSearchDistrict] = useState<string | undefined>(undefined);
  const [searchName, setSearchName] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<WardType | null>(null);
  const [form] = Form.useForm();

  const handleEdit = (record: WardType) => {
    setEditingRecord(record);
    form.setFieldsValue({
      tenHuyen: record.tenHuyen,
      maXa: record.maXa,
      tenXa: record.tenXa,
    });
    setIsModalOpen(true);
  };

  const handleUpdate = (values: any) => {
    const newData = data.map((item) => 
      item.maXa === editingRecord?.maXa 
        ? { ...item, tenXa: values.tenXa, tenHuyen: values.tenHuyen } 
        : item
    );
    setData(newData);
    message.success('Cập nhật thông tin xã/phường thành công!');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const handleDelete = (maXa: string) => {
    setData(data.filter(item => item.maXa !== maXa));
    message.success('Đã xóa xã/phường thành công!');
  };

  const handleSearch = () => {
    const filteredData = mockData.filter((item) => {
      const matchDistrict = searchDistrict ? item.tenHuyen === searchDistrict : true;
      const matchName = item.tenXa.toLowerCase().includes(searchName.toLowerCase());
      return matchDistrict && matchName;
    });
    setData(filteredData);
  };

  const handleImport = (file: File) => {
    if (!selectedDistrictForImport) {
      message.warning('Vui lòng chọn Huyện/Thị xã ở bộ lọc trước khi import file!');
      return Upload.LIST_IGNORE;
    }

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

          const importedData: WardType[] = [];
          
          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) { 
              const maXa = row.getCell(1).value?.toString() || '';
              const tenXa = row.getCell(2).value?.toString() || '';
              
              if (maXa && tenXa) {
                importedData.push({
                  key: Date.now().toString() + rowNumber,
                  stt: data.length + importedData.length + 1,
                  tenHuyen: selectedDistrictForImport,
                  maXa: maXa,
                  tenXa: tenXa,
                });
              }
            }
          });

          setData((prevData) => [...prevData, ...importedData]);
          message.success(`Đã import thành công ${importedData.length} Xã/Phường!`);
          
        } catch (error) {
          message.error('Đã xảy ra lỗi khi đọc file Excel!');
        }
      }
    };

    reader.readAsArrayBuffer(file);
    return false; 
  };

  const columns: ColumnsType<WardType> = [
    { title: 'STT', dataIndex: 'stt', align: 'center', width: 80 },
    { title: 'Tên huyện/thị xã', dataIndex: 'tenHuyen' },
    { title: 'Mã xã/phường', dataIndex: 'maXa' },
    { title: 'Tên xã/phường', dataIndex: 'tenXa' },
    {
      title: 'Tác vụ', align: 'center', width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title="Cập nhật">
            <Button type="text" icon={<EditOutlined style={{ color: '#1677ff' }} />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.maXa)}/>
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
            <div className="filter-label">Huyện/Thị xã</div>
            <Select 
              showSearch 
              allowClear 
              placeholder="Chọn huyện/thị xã" 
              style={{ width: '100%' }} 
              options={[
                { value: 'Ba Đình', label: 'Ba Đình' }, 
                { value: 'Hoàn Kiếm', label: 'Hoàn Kiếm' },
                { value: 'Đống Đa', label: 'Đống Đa' },
                { value: 'Hai Bà Trưng', label: 'Hai Bà Trưng' },
                { value: 'Cầu Giấy', label: 'Cầu Giấy' },
                { value: 'Thanh Xuân', label: 'Thanh Xuân' },
                { value: 'Long Biên', label: 'Long Biên' },
              ]} 
              onChange={(val) => { 
                setSearchDistrict(val); 
                setSelectedDistrictForImport(val); 
              }}
            />
          </div>
          <div className="filter-item">
            <div className="filter-label">Tên xã/phường</div>
            <Input 
              placeholder="Nhập tên xã/phường" 
              value={searchName} 
              onChange={(e) => setSearchName(e.target.value)} 
              onPressEnter={handleSearch} 
            />
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
        title="Cập nhật Xã/Phường" 
        open={isModalOpen} 
        onOk={() => form.submit()} 
        onCancel={handleCancel} 
        okText="Lưu lại" 
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item 
            label="Huyện/Thị xã" 
            name="tenHuyen" 
            rules={[{ required: true, message: 'Vui lòng chọn huyện/thị xã!' }]}
          >
            <Select 
              showSearch 
              placeholder="Chọn huyện/thị xã" 
              options={[
                { value: 'Ba Đình', label: 'Ba Đình' }, 
                { value: 'Hoàn Kiếm', label: 'Hoàn Kiếm' },
                { value: 'Đống Đa', label: 'Đống Đa' },
                { value: 'Hai Bà Trưng', label: 'Hai Bà Trưng' },
              ]} 
            />
          </Form.Item>

          <Form.Item label="Mã xã/phường" name="maXa">
            <Input disabled placeholder="Mã xã/phường" />
          </Form.Item>
          
          <Form.Item 
            label="Tên xã/phường" 
            name="tenXa" 
            rules={[
              { required: true, message: 'Vui lòng nhập tên xã/phường!' }, 
              { max: 250, message: 'Không được vượt quá 250 ký tự!' }
            ]}
          >
            <Input placeholder="Nhập tên xã/phường" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}