import { useState } from 'react';
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
  // ... dữ liệu mock giữ nguyên
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

  // --- HÀM IMPORT ĐÃ ĐƯỢC SỬA LỖI TRIỆT ĐỂ ---
  const handleImport = async (file: File) => {
    if (!selectedDistrictForImport) {
      message.warning('Vui lòng chọn Huyện/Thị xã ở bộ lọc trước khi import file!');
      return Upload.LIST_IGNORE;
    }

    const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
    if (!isExcel) {
      message.error('Chỉ hỗ trợ định dạng file Excel (.xlsx, .xls)!');
      return Upload.LIST_IGNORE;
    }

    try {
      // 1. Sử dụng arrayBuffer() hiện đại (Prefer Blob#arrayBuffer())
      const buffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);
      
      const worksheet = workbook.getWorksheet(1);
      if (!worksheet) {
        message.error('File Excel không có dữ liệu!');
        return false;
      }

      const importedData: WardType[] = [];
      
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) { 
          // 2. Sử dụng .text thay vì .value để tránh lỗi [object Object]
          const maXa = row.getCell(1).text?.trim() || '';
          const tenXa = row.getCell(2).text?.trim() || '';
          
          if (maXa && tenXa) {
            importedData.push({
              key: `${Date.now()}-${rowNumber}`,
              stt: data.length + importedData.length + 1,
              tenHuyen: selectedDistrictForImport,
              maXa: maXa,
              tenXa: tenXa,
            });
          }
        }
      });

      if (importedData.length === 0) {
        message.warning('Không tìm thấy dữ liệu hợp lệ trong file!');
        return false;
      }

      setData((prevData) => [...prevData, ...importedData]);
      message.success(`Đã import thành công ${importedData.length} Xã/Phường!`);
      
    } catch (error) {
      // 3. Xử lý Exception một cách rõ ràng
      console.error("Lỗi Import:", error);
      message.error('Đã xảy ra lỗi khi đọc file Excel. Vui lòng kiểm tra lại định dạng!');
    }

    return false; // Chặn hành vi upload mặc định của Ant Design
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
                // ... các options khác
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
          {/* Cập nhật beforeUpload để gọi hàm async */}
          <Upload beforeUpload={(file) => { handleImport(file); return false; }} showUploadList={false} accept=".xls,.xlsx">
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
                // ...
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