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

  // --- HÀM IMPORT ĐÃ ĐƯỢC FIX LỖI TRIỆT ĐỂ ---
  const handleImport = (file: File) => {
    const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
    if (!isExcel) {
      message.error('Chỉ hỗ trợ định dạng file Excel (.xlsx, .xls)!');
      return Upload.LIST_IGNORE;
    }

    const processFile = async () => {
      try {
        const buffer = await file.arrayBuffer();
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(buffer);
        
        const worksheet = workbook.getWorksheet(1); 
        if (!worksheet) {
          message.error('File Excel không có dữ liệu!');
          return;
        }

        const importedData: DataType[] = [];
        const timestamp = Date.now();

        // 1. HÀM BỌC AN TOÀN TRÁNH CRASH THƯ VIỆN EXCELJS
        const getSafeCellValue = (cell: ExcelJS.Cell) => {
          // Nếu ô trống hoàn toàn
          if (!cell || cell.value === null || cell.value === undefined) return '';
          
          try {
            // Nếu ô là một Object (Công thức, RichText, Hyperlink...)
            if (typeof cell.value === 'object') {
              // Nếu là công thức (Formula), lấy kết quả (result)
              if ('result' in cell.value) {
                return (cell.value.result || '').toString().trim();
              }
              // Nếu là RichText, dùng .text nhưng bọc try-catch
              return cell.text ? cell.text.trim() : '';
            }
            // Nếu là số hoặc chuỗi bình thường
            return cell.value.toString().trim();
          } catch (e) {
            return ''; // Nếu ExcelJS lỗi, nhả về chuỗi rỗng để không chết app
          }
        };

        worksheet.eachRow((row, rowNumber) => {
          // Bỏ qua dòng tiêu đề (dòng 1)
          if (rowNumber > 1) { 
            // 2. SỬ DỤNG HÀM AN TOÀN ĐỂ LẤY DỮ LIỆU
            const maTinh = getSafeCellValue(row.getCell(1));
            const tenTinh = getSafeCellValue(row.getCell(2));
            
            // Chỉ thêm vào bảng nếu có cả Mã và Tên
            if (maTinh && tenTinh) {
              importedData.push({
                key: `${timestamp}-${rowNumber}`,
                stt: 0,
                maTinh: maTinh,
                tenTinh: tenTinh,
              });
            }
          }
        });

        if (importedData.length === 0) {
          message.warning('Không tìm thấy dữ liệu hợp lệ trong file!');
          return;
        }

        setData((prevData) => {
          const startSTT = prevData.length + 1;
          const finalImportedData = importedData.map((item, index) => ({
            ...item,
            stt: startSTT + index
          }));
          return [...prevData, ...finalImportedData];
        });

        message.success(`Đã import thành công ${importedData.length} Tỉnh/Thành phố!`);
        
      } catch (error) {
        console.error("Lỗi khi đọc file Excel:", error);
        message.error('Đã xảy ra lỗi khi đọc file Excel!');
      }
    };

    processFile();
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
          {/* Sửa logic beforeUpload để nhận async function */}
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