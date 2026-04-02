import { useState, useRef } from 'react';
import { DatePicker, Button, Tabs, Table, Select, Space, Card, Row, Col, Typography, message } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const { Title, Text } = Typography;

const mockChartData = [
  { ngay: '13/03/2025', baoHiem: 15000000, dichVu: 10000000, tienMat: 20000000, qrDong: 30000000, qrTinh: 5000000, pos: 2000000, khac: 1000000 },
  { ngay: '14/03/2025', baoHiem: 20000000, dichVu: 9000000, tienMat: 25000000, qrDong: 20000000, qrTinh: 6000000, pos: 3000000, khac: 1500000 },
  { ngay: '15/03/2025', baoHiem: 14000000, dichVu: 23000000, tienMat: 15000000, qrDong: 35000000, qrTinh: 4000000, pos: 1000000, khac: 500000 },
];

const mockPieData = [
  { name: 'Tiền mặt', value: 60000000, color: '#3ba0e9' },
  { name: 'QRMB Động', value: 85000000, color: '#1d39c4' },
  { name: 'QRMB Tĩnh', value: 15000000, color: '#ff7f50' },
  { name: 'POS', value: 6000000, color: '#52c41a' },
  { name: 'Chuyển khoản khác', value: 3000000, color: '#722ed1' },
];

const mockTableDoiTuong = [
  { key: '1', stt: 1, ngay: '08/09/2025', doiTuong: 'Khám sức khỏe xuất khẩu lao động', tongTien: 75086000 },
  { key: '2', stt: 2, ngay: '08/09/2025', doiTuong: 'Nước ngoài', tongTien: 1850000 },
  { key: '3', stt: 3, ngay: '08/09/2025', doiTuong: 'BHYT', tongTien: 1384148095 },
];

const mockTableHTTT = [
  { key: '1', stt: 1, ngay: '04/08/2025', tienMat: 0, qrDong: 683990494, qrTinh: 16752600, pos: 0, khac: 219521392, tongTien: 920264486 },
];

export default function RevenueReport() {
  const [activeTab, setActiveTab] = useState('1');
  const [paymentType, setPaymentType] = useState('tienMat');
  const [fromDate, setFromDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [toDate, setToDate] = useState<dayjs.Dayjs | null>(dayjs());

  const fromDateRef = useRef<any>(null);
  const toDateRef = useRef<any>(null);

  const validateDateInput = (dateString: string, type: 'from' | 'to') => {
    if (!dateString) return true;

    const currentYear = dayjs().year();
    const refToFocus = type === 'from' ? fromDateRef : toDateRef;
    const parsedDate = dayjs(dateString, ['DD/MM/YYYY', 'DDMMYYYY'], true);
    
    const parts = dateString.includes('/') 
      ? dateString.split('/') 
      : [dateString.substring(0, 2), dateString.substring(2, 4), dateString.substring(4, 8)];
    
    if (parts.length === 3) {
      // FIX: Dùng Number.parseInt
      const day = Number.parseInt(parts[0], 10);
      const month = Number.parseInt(parts[1], 10);
      const year = Number.parseInt(parts[2], 10);

      if (month >= 13 || month < 1) {
        message.error('Không tồn tại tháng');
        refToFocus.current?.focus();
        return false;
      }

      const maxDaysInMonth = dayjs(`${year}-${month}-01`).daysInMonth();
      if (day > maxDaysInMonth || day < 1) {
        message.error('Ngày không tồn tại');
        refToFocus.current?.focus();
        return false;
      }

      if (year <= 1900 || year > currentYear) {
        message.error('Năm NSD nhập chưa triển khai hệ thống');
        refToFocus.current?.focus();
        return false;
      }
    }

    if (!parsedDate.isValid()) {
      message.error('Định dạng ngày không hợp lệ!');
      refToFocus.current?.focus();
      return false;
    }
    return true;
  };

  const handleSearch = () => {
    if (!fromDate || !toDate) {
      message.error("Vui lòng nhập đầy đủ Từ ngày và Đến ngày!");
      return;
    }
    if (toDate.isBefore(fromDate, 'day')) {
      message.error("Đến ngày không được nhỏ hơn Từ ngày!");
      toDateRef.current?.focus();
      return;
    }
    const oneMonthLater = fromDate.add(1, 'month');
    if (toDate.isAfter(oneMonthLater, 'day')) {
      message.warning("Giới hạn tìm kiếm trong 1 tháng. Vui lòng chuyển đến báo cáo Doanh thu theo Quý/Năm");
      toDateRef.current?.focus();
      return;
    }
    message.success("Tải dữ liệu thành công!");
  };

  const formatCurrency = (value: any) => typeof value === 'number' ? value.toLocaleString('vi-VN') : value;
  const formatYAxis = (tickItem: any) => typeof tickItem === 'number' ? `${(tickItem / 1000000)}M` : tickItem;

  const renderCharts = () => (
    <div style={{ background: '#f5f5f5', padding: 20 }}>
      <Card title={<div style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#555' }}>DOANH THU THEO ĐỐI TƯỢNG</div>} style={{ marginBottom: 20 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockChartData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="ngay" />
            <YAxis 
                tickFormatter={formatYAxis}
                label={{ value: 'TỔNG TIỀN (VNĐ)', angle: -90, position: 'insideLeft', offset: -15, style: {textAnchor: 'middle'} }} 
            />
            <RechartsTooltip formatter={formatCurrency} />
            <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: "20px" }}/>
            <Bar dataKey="baoHiem" name="Đối tượng Bảo hiểm" stackId="a" fill="#135e80" />
            <Bar dataKey="dichVu" name="Đối tượng Dịch vụ" stackId="a" fill="#e87731" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Row gutter={20}>
        <Col span={14}>
          <Card title={<div style={{ textAlign: 'center', fontWeight: 'bold', color: '#555' }}>Doanh thu theo hình thức thanh toán</div>}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <Text type="secondary">Giá trị giao dịch</Text><br/>
                <Title level={3} style={{ margin: 0 }}>5.574 tỷ</Title>
                <Text type="secondary">21.024 giao dịch</Text>
              </div>
              {/* FIX: Thay Select.Option bằng thuộc tính options */}
              <Select 
                defaultValue="tienMat" 
                style={{ width: 150 }} 
                onChange={(val) => setPaymentType(val)}
                options={[
                    { value: 'tienMat', label: 'Tiền mặt' },
                    { value: 'qrDong', label: 'QRMB Động' },
                    { value: 'qrTinh', label: 'QRMB Tĩnh' },
                    { value: 'pos', label: 'POS' },
                    { value: 'khac', label: 'Chuyển khoản khác' },
                ]}
              />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={mockChartData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="ngay" />
                <YAxis 
                    tickFormatter={formatYAxis}
                    label={{ value: 'Doanh thu (VNĐ)', angle: -90, position: 'insideLeft', offset: -15, style: {textAnchor: 'middle'} }} 
                />
                <RechartsTooltip formatter={formatCurrency} />
                <Bar dataKey={paymentType} fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col span={10}>
          <Card title={<div style={{ textAlign: 'center', fontWeight: 'bold', color: '#555' }}>Doanh thu theo hình thức thanh toán<br/>(Tổng theo kỳ báo cáo)</div>}>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie data={mockPieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false}>
                  {/* FIX: Thay index bằng name để tránh Do not use Array index in keys */}
                  {mockPieData.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={formatCurrency} />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );

  const columnsDoiTuong = [
    { title: 'STT', dataIndex: 'stt', align: 'center' as const, width: 80 },
    { title: 'Ngày', dataIndex: 'ngay', align: 'center' as const },
    { title: 'Đối tượng', dataIndex: 'doiTuong' },
    { title: 'Tổng tiền', dataIndex: 'tongTien', align: 'right' as const, render: (val: number) => val.toLocaleString('vi-VN') },
  ];

  const columnsHTTT = [
    { title: 'STT', dataIndex: 'stt', align: 'center' as const, width: 80 },
    { title: 'Ngày', dataIndex: 'ngay', align: 'center' as const },
    {
      title: 'Hình thức thanh toán', 
      children: [
        { title: 'Tiền mặt', dataIndex: 'tienMat', align: 'right' as const, render: (val: number) => val.toLocaleString('vi-VN') },
        { title: 'QRMB Động', dataIndex: 'qrDong', align: 'right' as const, render: (val: number) => val.toLocaleString('vi-VN') },
        { title: 'QRMB Tĩnh', dataIndex: 'qrTinh', align: 'right' as const, render: (val: number) => val.toLocaleString('vi-VN') },
        { title: 'POS MB', dataIndex: 'pos', align: 'right' as const, render: (val: number) => val.toLocaleString('vi-VN') },
        { title: 'Chuyển khoản khác', dataIndex: 'khac', align: 'right' as const, render: (val: number) => val.toLocaleString('vi-VN') },
      ],
    },
    { title: 'Tổng tiền', dataIndex: 'tongTien', align: 'right' as const, render: (val: number) => val.toLocaleString('vi-VN'), className: 'font-bold' },
  ];

  return (
    <div style={{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={3} style={{ margin: 0 }}>Doanh thu theo ngày</Title>
        <Space>
          <DatePicker 
            ref={fromDateRef}
            placeholder="Từ ngày" 
            format={["DD/MM/YYYY", "DDMMYYYY"]} 
            value={fromDate}
            onChange={(date, dateString) => {
              setFromDate(date);
              if (typeof dateString === 'string') validateDateInput(dateString, 'from');
            }}
            allowClear={false}
          />
          <DatePicker 
            ref={toDateRef}
            placeholder="Đến ngày" 
            format={["DD/MM/YYYY", "DDMMYYYY"]} 
            value={toDate}
            onChange={(date, dateString) => {
              setToDate(date);
              if (typeof dateString === 'string') validateDateInput(dateString, 'to');
            }}
            allowClear={false}
          />
          <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>Tìm kiếm</Button>
        </Space>
      </div>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab} 
        style={{ marginTop: 16 }}
        // FIX: Unexpected negated condition - đảo ngược logic để code "thuận" hơn
        tabBarExtraContent={
          activeTab === '1' ? null : <Button type="primary" icon={<DownloadOutlined />}>Xuất Excel</Button>
        }
        items={[
          { key: '1', label: 'Biểu đồ', children: renderCharts() },
          { key: '2', label: 'Đối tượng', children: <Table columns={columnsDoiTuong} dataSource={mockTableDoiTuong} pagination={{ showTotal: (t) => `Tổng: ${t} bản ghi` }} bordered /> },
          { key: '3', label: 'Hình thức thanh toán', children: <Table columns={columnsHTTT} dataSource={mockTableHTTT} pagination={{ showTotal: (t) => `Tổng: ${t} bản ghi` }} bordered /> },
        ]}
      />
    </div>
  );
}