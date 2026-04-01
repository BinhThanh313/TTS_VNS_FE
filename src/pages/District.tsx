import { useState } from 'react';
import { Table, Button, Input, Space, Select, Tooltip, Upload, message, Modal, Form } from 'antd';
import { SearchOutlined, ImportOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import ExcelJS from 'exceljs';
import '../styles/Category.scss';

interface DistrictType {
  key: string;
  stt: number;
  tenTinh: string;
  maHuyen: string;
  tenHuyen: string;
}

const mockData: DistrictType[] = [
  { key: '1', stt: 1, tenTinh: 'Hà Nội', maHuyen: '271', tenHuyen: 'Ba Vì' },
  { key: '2', stt: 2, tenTinh: 'Hà Nội', maHuyen: '1', tenHuyen: 'Ba Đình' },
  { key: '3', stt: 3, tenTinh: 'Hồ Chí Minh', maHuyen: '760', tenHuyen: 'Quận 1' },
  { key: '4', stt: 4, tenTinh: 'Hà Nội', maHuyen: '272', tenHuyen: 'Chương Mỹ' },
  { key: '5', stt: 5, tenTinh: 'Hà Nội', maHuyen: '273', tenHuyen: 'Đan Phượng' },
  { key: '6', stt: 6, tenTinh: 'Hà Nội', maHuyen: '274', tenHuyen: 'Đông Anh' },
  { key: '7', stt: 7, tenTinh: 'Hà Nội', maHuyen: '275', tenHuyen: 'Gia Lâm' },
  { key: '8', stt: 8, tenTinh: 'Hà Nội', maHuyen: '276', tenHuyen: 'Hoài Đức' },
  { key: '9', stt: 9, tenTinh: 'Hà Nội', maHuyen: '277', tenHuyen: 'Mê Linh' },
  { key: '10', stt: 10, tenTinh: 'Hà Nội', maHuyen: '278', tenHuyen: 'Mỹ Đức' },
  { key: '11', stt: 11, tenTinh: 'Hồ Chí Minh', maHuyen: '761', tenHuyen: 'Quận 2' },
  { key: '12', stt: 12, tenTinh: 'Hồ Chí Minh', maHuyen: '762', tenHuyen: 'Quận 3' },
  { key: '13', stt: 13, tenTinh: 'Hồ Chí Minh', maHuyen: '763', tenHuyen: 'Quận 4' },
  { key: '14', stt: 14, tenTinh: 'Hồ Chí Minh', maHuyen: '764', tenHuyen: 'Quận 5' },
  { key: '15', stt: 15, tenTinh: 'Hồ Chí Minh', maHuyen: '765', tenHuyen: 'Quận 6' },
  { key: '16', stt: 16, tenTinh: 'Hồ Chí Minh', maHuyen: '766', tenHuyen: 'Quận 7' },
  { key: '17', stt: 17, tenTinh: 'Hồ Chí Minh', maHuyen: '767', tenHuyen: 'Quận 8' },
  { key: '18', stt: 18, tenTinh: 'Đà Nẵng', maHuyen: '490', tenHuyen: 'Hải Châu' },
  { key: '19', stt: 19, tenTinh: 'Đà Nẵng', maHuyen: '491', tenHuyen: 'Thanh Khê' },
  { key: '20', stt: 20, tenTinh: 'Đà Nẵng', maHuyen: '492', tenHuyen: 'Sơn Trà' },
  { key: '21', stt: 21, tenTinh: 'Đà Nẵng', maHuyen: '493', tenHuyen: 'Ngũ Hành Sơn' },
  { key: '22', stt: 22, tenTinh: 'Đà Nẵng', maHuyen: '494', tenHuyen: 'Liên Chiểu' },
  { key: '23', stt: 23, tenTinh: 'Đà Nẵng', maHuyen: '495', tenHuyen: 'Cẩm Lệ' },
];

export default function DistrictPage() {
  const [data, setData] = useState<DistrictType[]>(mockData);
  const [selectedProvinceForImport, setSelectedProvinceForImport] = useState<string | null>(null);
  
  const [searchProvince, setSearchProvince] = useState<string | undefined>(undefined);
  const [searchName, setSearchName] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<DistrictType | null>(null);
  const [form] = Form.useForm();

  const handleEdit = (record: DistrictType) => {
    setEditingRecord(record);
    form.setFieldsValue({
      tenTinh: record.tenTinh,
      maHuyen: record.maHuyen,
      tenHuyen: record.tenHuyen,
    });
    setIsModalOpen(true);
  };

  const handleUpdate = (values: any) => {
    const newData = data.map((item) => 
      item.maHuyen === editingRecord?.maHuyen 
        ? { ...item, tenHuyen: values.tenHuyen, tenTinh: values.tenTinh } 
        : item
    );
    setData(newData);
    message.success('Cập nhật thông tin huyện/thị xã thành công!');
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const handleDelete = (maHuyen: string) => {
    setData(data.filter(item => item.maHuyen !== maHuyen));
    message.success('Đã xóa huyện/thị xã thành công!');
  };

  const handleSearch = () => {
    const filteredData = mockData.filter((item) => {
      const matchProvince = searchProvince ? item.tenTinh === searchProvince : true;
      const matchName = item.tenHuyen.toLowerCase().includes(searchName.toLowerCase());
      return matchProvince && matchName;
    });
    setData(filteredData);
  };

  const handleImport = async (file: File) => { // Thêm async ở đây
    if (!selectedProvinceForImport) {
      message.warning('Vui lòng chọn Tỉnh/Thành phố ở bộ lọc trước khi import file!');
      return Upload.LIST_IGNORE;
    }

    const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
    if (!isExcel) {
      message.error('Chỉ hỗ trợ định dạng file Excel (.xlsx, .xls)!');
      return Upload.LIST_IGNORE;
    }

    try {
      // 1. Thay FileReader bằng cách viết hiện đại arrayBuffer()
      const buffer = await file.arrayBuffer();
      
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);
      
      const worksheet = workbook.getWorksheet(1);
      if (!worksheet) {
        message.error('File Excel không có dữ liệu!');
        return;
      }

      const importedData: DistrictType[] = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber > 1) {
          // 2. Dùng .text để tránh lỗi [object Object]
          const maHuyen = row.getCell(1).text?.trim() || '';
          const tenHuyen = row.getCell(2).text?.trim() || '';

          if (maHuyen && tenHuyen) {
            importedData.push({
              key: `${Date.now()}-${rowNumber}`,
              stt: data.length + importedData.length + 1,
              tenTinh: selectedProvinceForImport,
              maHuyen: maHuyen,
              tenHuyen: tenHuyen,
            });
          }
        }
      });

      if (importedData.length === 0) {
        message.warning('Không tìm thấy dữ liệu hợp lệ trong file!');
        return;
      }

      setData((prevData) => [...prevData, ...importedData]);
      message.success(`Đã import thành công ${importedData.length} Huyện/Thị xã!`);

    } catch (error) {
      // 3. Xử lý exception một cách tường minh
      console.error("Import Error:", error);
      message.error('Đã xảy ra lỗi trong quá trình đọc file. Vui lòng kiểm tra lại định dạng file!');
    }

    return false; // Chặn upload lên server
  };

  const columns: ColumnsType<DistrictType> = [
    { title: 'STT', dataIndex: 'stt', align: 'center', width: 80 },
    { title: 'Tên tỉnh/TP', dataIndex: 'tenTinh' },
    { title: 'Mã huyện/thị xã', dataIndex: 'maHuyen' },
    { title: 'Tên huyện/thị xã', dataIndex: 'tenHuyen' },
    {
      title: 'Tác vụ', align: 'center', width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title="Cập nhật">
            <Button type="text" icon={<EditOutlined style={{ color: '#1677ff' }} />} onClick={() => handleEdit(record)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record.maHuyen)}/>
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
            <Select 
              showSearch 
              allowClear 
              placeholder="Chọn tỉnh/TP" 
              style={{ width: '100%' }} 
              options={[
                { value: 'Hà Nội', label: 'Hà Nội' }, 
                { value: 'Hồ Chí Minh', label: 'Hồ Chí Minh' },
                { value: 'Đà Nẵng', label: 'Đà Nẵng' }
              ]} 
              onChange={(val) => { 
                setSearchProvince(val); 
                setSelectedProvinceForImport(val); 
              }}
            />
          </div>
          <div className="filter-item">
            <div className="filter-label">Tên huyện/thị xã</div>
            <Input 
              placeholder="Nhập tên huyện" 
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
        title="Cập nhật Huyện/Thị xã" 
        open={isModalOpen} 
        onOk={() => form.submit()} 
        onCancel={handleCancel} 
        okText="Lưu lại" 
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate}>
          <Form.Item 
            label="Tỉnh/Thành phố" 
            name="tenTinh" 
            rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
          >
            <Select 
              showSearch 
              placeholder="Chọn tỉnh/thành phố" 
              options={[
                { value: 'Hà Nội', label: 'Hà Nội' }, 
                { value: 'Hồ Chí Minh', label: 'Hồ Chí Minh' },
                { value: 'Đà Nẵng', label: 'Đà Nẵng' }
              ]} 
            />
          </Form.Item>

          <Form.Item label="Mã huyện/thị xã" name="maHuyen">
            <Input disabled placeholder="Mã huyện/thị xã" />
          </Form.Item>

          <Form.Item 
            label="Tên huyện/thị xã" 
            name="tenHuyen" 
            rules={[
              { required: true, message: 'Vui lòng nhập tên huyện/thị xã!' }, 
              { max: 250, message: 'Không được vượt quá 250 ký tự!' }
            ]}
          >
            <Input placeholder="Nhập tên huyện/thị xã" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}