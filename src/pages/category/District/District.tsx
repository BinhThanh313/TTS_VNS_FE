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

  // --- HÀM IMPORT HỖ TRỢ CẢ EXCEL VÀ CSV CHUẨN YÊU CẦU ---
  const handleImport = (file: File) => { 
    if (!selectedProvinceForImport) {
      message.warning('Vui lòng chọn Tỉnh/Thành phố ở bộ lọc trước khi import file!');
      return Upload.LIST_IGNORE;
    }

    const fileExt = file.name.toLowerCase();
    const isExcel = fileExt.endsWith('.xlsx') || fileExt.endsWith('.xls');
    // Nhận diện CSV qua đuôi file hoặc MimeType của trình duyệt
    const isCsv = fileExt.endsWith('.csv') || file.type === 'text/csv'; 

    if (!isExcel && !isCsv) {
      message.error('Hệ thống chỉ hỗ trợ định dạng file .xls, .xlsx, .csv!');
      return Upload.LIST_IGNORE;
    }

    const processFile = async () => {
      try {
        const importedData: DistrictType[] = [];
        const timestamp = Date.now();

        if (isCsv) {
          // --- XỬ LÝ ĐỌC FILE CSV ---
          const text = await file.text();
          const rows = text.split(/\r?\n/); // Tách theo dòng
          
          rows.forEach((rowStr, index) => {
            if (index > 0 && rowStr.trim()) { // Bỏ qua Header và dòng trống
              // Cắt các cột bằng dấu phẩy và xóa dấu nháy kép
              const cols = rowStr.split(',').map(col => col.trim().replace(/^"|"$/g, ''));
              
              // Nếu file có 3 cột (STT, Mã, Tên), Mã ở index 1, Tên ở index 2
              // Nếu file có 2 cột (Mã, Tên), Mã ở index 0, Tên ở index 1
              const maHuyen = cols.length >= 3 ? cols[1] : cols[0];
              const tenHuyen = cols.length >= 3 ? cols[2] : cols[1];

              if (maHuyen && tenHuyen) {
                importedData.push({
                  key: `${timestamp}-${index}`,
                  stt: 0,
                  tenTinh: selectedProvinceForImport,
                  maHuyen: maHuyen,
                  tenHuyen: tenHuyen,
                });
              }
            }
          });

        } else {
          // --- XỬ LÝ ĐỌC FILE EXCEL (.xlsx) ---
          const buffer = await file.arrayBuffer();
          const workbook = new ExcelJS.Workbook();
          await workbook.xlsx.load(buffer);
          
          const worksheet = workbook.getWorksheet(1);
          if (!worksheet) {
            message.error('File Excel không có dữ liệu!');
            return;
          }

          const getSafeCellValue = (cell: ExcelJS.Cell) => {
            if (!cell || cell.value === null || cell.value === undefined) return '';
            try {
              if (typeof cell.value === 'object') {
                if ('result' in cell.value) return (cell.value.result || '').toString().trim();
                return cell.text ? cell.text.trim() : '';
              }
              return cell.value.toString().trim();
            } catch (e) {
              return ''; 
            }
          };

          worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
              // Thử đọc Cột 2 (Mã) và Cột 3 (Tên) trước
              let maHuyen = getSafeCellValue(row.getCell(2));
              let tenHuyen = getSafeCellValue(row.getCell(3));

              // Nếu 2 cột đó rỗng, thử lùi lại đọc Cột 1 (Mã) và Cột 2 (Tên)
              if (!maHuyen && !tenHuyen) {
                maHuyen = getSafeCellValue(row.getCell(1));
                tenHuyen = getSafeCellValue(row.getCell(2));
              }

              if (maHuyen && tenHuyen) {
                importedData.push({
                  key: `${timestamp}-${rowNumber}`,
                  stt: 0,
                  tenTinh: selectedProvinceForImport,
                  maHuyen: maHuyen,
                  tenHuyen: tenHuyen,
                });
              }
            }
          });
        }

        if (importedData.length === 0) {
          message.warning('Không tìm thấy dữ liệu hợp lệ! Vui lòng kiểm tra lại cấu trúc các cột trong file.');
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

        message.success(`Đã import thành công ${importedData.length} Huyện/Thị xã!`);

      } catch (error) {
        console.error("Lỗi khi đọc file:", error);
        message.error('Lỗi định dạng file! (Nếu file CSV bị lưu nhầm đuôi .xlsx, hãy đổi lại thành đuôi .csv)');
      }
    };

    processFile();
    return false; // Chặn hành vi mặc định
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
          {/* Cập nhật accept hỗ trợ cả csv theo chuẩn tài liệu */}
          <Upload beforeUpload={handleImport} showUploadList={false} accept=".xls,.xlsx,.csv">
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