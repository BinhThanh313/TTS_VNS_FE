import { DatePicker, Tabs, Space, Typography } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import { DataTable, AppButton } from '@/components/common'; // Dùng chung component common
import { useRevenueReport } from './useRevenueReport';
import { RevenueCharts } from './components/RevenueCharts';
import { mockTableDoiTuong, mockTableHTTT, columnsDoiTuong, columnsHTTT } from './constants';

const { Title } = Typography;

export default function RevenueReport() {
  const {
    activeTab, setActiveTab,
    paymentType, setPaymentType,
    fromDate, setFromDate, fromDateRef,
    toDate, setToDate, toDateRef,
    validateDateInput, handleSearch
  } = useRevenueReport();

  return (
    <div style={{ padding: '0 24px 24px 24px', background: '#fff', minHeight: '100%' }}>
      {/* HEADER TÌM KIẾM */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
        <Title level={2} style={{ margin: 0 }}>Doanh thu theo ngày</Title>
        <Space>
          <DatePicker ref={fromDateRef} placeholder="Từ ngày" format={["DD/MM/YYYY", "DDMMYYYY"]} value={fromDate}
            onChange={(date, dateString) => {
              setFromDate(date);
              if (typeof dateString === 'string') validateDateInput(dateString, 'from');
            }}
            allowClear={false}
          />
          <DatePicker ref={toDateRef} placeholder="Đến ngày" format={["DD/MM/YYYY", "DDMMYYYY"]} value={toDate}
            onChange={(date, dateString) => {
              setToDate(date);
              if (typeof dateString === 'string') validateDateInput(dateString, 'to');
            }}
            allowClear={false}
          />
          <AppButton type="primary" icon={<SearchOutlined />} style={{ background: '#1890ff' }} onClick={handleSearch}>Tìm kiếm</AppButton>
        </Space>
      </div>

      {/* TABS NỘI DUNG */}
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab} 
        style={{ marginTop: 16 }}
        items={[
          { 
            key: '1', 
            label: 'Biểu đồ', 
            children: <RevenueCharts paymentType={paymentType} setPaymentType={setPaymentType} /> 
          },
          { 
            key: '2', 
            label: 'Đối tượng', 
            children: (
              <div style={{ paddingTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                  <AppButton type="primary" icon={<DownloadOutlined />} style={{ background: '#1890ff' }}>
                    Xuất Excel
                  </AppButton>
                </div>
                <DataTable columns={columnsDoiTuong} dataSource={mockTableDoiTuong} bordered={true} />
              </div>
            )
          },
          { 
            key: '3', 
            label: 'Hình thức thanh toán', 
            children: (
              <div style={{ paddingTop: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                  <AppButton type="primary" icon={<DownloadOutlined />} style={{ background: '#1890ff' }}>
                    Xuất Excel
                  </AppButton>
                </div>
                {/* Bắt buộc bordered={true} để hiện rõ cấu trúc bảng lồng nhau */}
                <DataTable columns={columnsHTTT} dataSource={mockTableHTTT} bordered={true} />
              </div>
            )
          },
        ]}
      />
    </div>
  );
}