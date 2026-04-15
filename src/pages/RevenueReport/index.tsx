import { DatePicker, Tabs, Space, Typography, Spin } from 'antd';
import { Search, Download } from 'lucide-react';
import { DataTable, AppButton } from '@/components/common';
import { useRevenueActionLogic } from './useRevenueActionLogic';
import { RevenueCharts } from './components/RevenueCharts';
import { columnsDoiTuong, columnsHTTT } from './components/columnConfig';

const { Title } = Typography;

export default function RevenueReport() {
  const {
    activeTab, setActiveTab, paymentType, setPaymentType,
    fromDate, setFromDate, fromDateRef, toDate, setToDate, toDateRef,
    validateDateInput, handleSearch, reportData, isFetching,
    // 🔥 SỬA LỖI 1: Lấy hàm handleExportExcel ra khỏi hook
    handleExportExcel
  } = useRevenueActionLogic();

  return (
    <div className="px-6 pb-6 bg-white min-h-full">
      {/* HEADER TÌM KIẾM */}
      <div className="flex justify-between items-center py-4 border-b border-gray-200">
        <Title level={2} className="!m-0 text-blue-900">Doanh thu theo ngày</Title>
        <Space>
          <DatePicker ref={fromDateRef} placeholder="Từ ngày" format={["DD/MM/YYYY", "DDMMYYYY"]} value={fromDate}
            onChange={(date, dateString) => { setFromDate(date); if (typeof dateString === 'string') validateDateInput(dateString, 'from'); }} allowClear={false} />
          <DatePicker ref={toDateRef} placeholder="Đến ngày" format={["DD/MM/YYYY", "DDMMYYYY"]} value={toDate}
            onChange={(date, dateString) => { setToDate(date); if (typeof dateString === 'string') validateDateInput(dateString, 'to'); }} allowClear={false} />
          <AppButton type="primary" icon={<Search size={14} />} className="bg-blue-500" onClick={handleSearch}>Tìm kiếm</AppButton>
        </Space>
      </div>

      {/* TABS NỘI DUNG */}
      <Spin spinning={isFetching} tip="Đang tải dữ liệu báo cáo...">
        <Tabs activeKey={activeTab} onChange={setActiveTab} className="mt-4"
          items={[
            { 
              key: '1', label: 'Biểu đồ', 
              children: <RevenueCharts paymentType={paymentType} setPaymentType={setPaymentType} chartData={reportData?.chartData || []} pieData={reportData?.pieData || []} /> 
            },
            { 
              key: '2', label: 'Đối tượng', 
              children: (
                <div className="pt-2">
                  <div className="flex justify-end mb-4">
                    {/* 🔥 SỬA LỖI 2: Gắn onClick truyền tham số 'doi-tuong' */}
                    <AppButton type="primary" icon={<Download size={14} />} className="bg-blue-500" onClick={() => handleExportExcel('doi-tuong')}>
                      Xuất Excel
                    </AppButton>
                  </div>
                  <DataTable columns={columnsDoiTuong} dataSource={reportData?.tableDoiTuong || []} bordered={true} rowKey="id" />
                </div>
              )
            },
            { 
              key: '3', label: 'Hình thức thanh toán', 
              children: (
                <div className="pt-2">
                  <div className="flex justify-end mb-4">
                    {/* 🔥 SỬA LỖI 3: Gắn onClick truyền tham số 'httt' */}
                    <AppButton type="primary" icon={<Download size={14} />} className="bg-blue-500" onClick={() => handleExportExcel('httt')}>
                      Xuất Excel
                    </AppButton>
                  </div>
                  <DataTable columns={columnsHTTT} dataSource={reportData?.tableHTTT || []} bordered={true} rowKey="id" />
                </div>
              )
            },
          ]}
        />
      </Spin>
    </div>
  );
}