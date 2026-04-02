// src/pages/report/RevenueReport.tsx
import React from 'react';
import { DatePicker, Button, Tabs, Space, Typography } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import { DataTable } from '@/components/common/DataTable';
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

      {/* TABS NỘI DUNG */}
      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab} 
        style={{ marginTop: 16 }}
        tabBarExtraContent={
          activeTab !== '1' && <Button type="primary" icon={<DownloadOutlined />}>Xuất Excel</Button>
        }
        items={[
          { 
            key: '1', 
            label: 'Biểu đồ', 
            children: <RevenueCharts paymentType={paymentType} setPaymentType={setPaymentType} /> 
          },
          { 
            key: '2', 
            label: 'Đối tượng', 
            children: <DataTable columns={columnsDoiTuong} dataSource={mockTableDoiTuong} bordered={true} /> 
          },
          { 
            key: '3', 
            label: 'Hình thức thanh toán', 
            children: <DataTable columns={columnsHTTT} dataSource={mockTableHTTT} bordered={true} /> 
          },
        ]}
      />
    </div>
  );
}