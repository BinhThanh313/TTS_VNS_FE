import { useState } from 'react';
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

  // --- HÀM IMPORT ĐÃ ĐƯỢC SỬA LỖI ---
  const handleImport = async (file: File) => {
    const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
    if (!isExcel) {
      message.error('Chỉ hỗ trợ định dạng file Excel (.xlsx, .xls)!');
      return Upload.LIST_IGNORE;
    }

    try {
      // 1. Sử dụng arrayBuffer() hiện đại thay cho FileReader
      const buffer = await file.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);
      
      const worksheet = workbook.getWorksheet(1); 
      if (!worksheet) {
        message.error('File Excel không có dữ liệu!');
        return false;
      }

      const importedData: DataType[] = [];
      
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) { 
          // 2. Sử dụng .text thay cho .value để tránh lỗi [object Object]
          const maTinh = row.getCell(1).text?.trim() || '';
          const tenTinh = row.getCell(2).text?.trim() || '';
          
          if (maTinh && tenTinh) {
            importedData.push({
              key: `${Date.now()}-${rowNumber}`,
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
      console.error("Lỗi khi đọc file Excel:", error);
      message.error('Đã xảy ra lỗi khi đọc file Excel!');
    }

    return false; // Chặn hành vi upload mặc định
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
          {/* Sửa logic beforeUpload để nhận async function */}
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
        title="Cập nhật Tỉnh/Thành phố" 
        open={isModalOpen} 
        onOk={() => form.submit()} 
        onCancel={handleCancel}
        okText="Lưu lại"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item label="Mã tỉnh/TP" name="maTinh">
            <Input disabled placeholder="Mã tỉnh/TP" />
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