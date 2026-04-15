import { Card, Row, Col, Typography, Select } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, LabelList, Cell } from 'recharts';
import type { IChartRevenue, IPieRevenue } from '@/types';

const { Title, Text } = Typography;

interface Props {
  paymentType: string;
  setPaymentType: (val: string) => void;
  chartData: IChartRevenue[];
  pieData: IPieRevenue[];
}

export const RevenueCharts = ({ paymentType, setPaymentType, chartData, pieData }: Props) => {
  
  const formatCurrency = (value: unknown): string => {
    if (typeof value === 'number') return value.toLocaleString('vi-VN');
    return String(value || '');
  };
  
  const formatYAxis = (tickItem: unknown): string => {
    if (typeof tickItem === 'number') return tickItem.toLocaleString('vi-VN');
    return String(tickItem || '');
  };

  return (
    <div className="bg-gray-50 p-5 rounded-lg">
      {/* BIỂU ĐỒ 1: DOANH THU THEO ĐỐI TƯỢNG */}
      <Card title={<div className="text-center text-lg font-bold text-gray-600">DOANH THU THEO ĐỐI TƯỢNG</div>} className="mb-5">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="ngay" tickMargin={10} tickLine={false} label={{ value: 'NGÀY', position: 'bottom', offset: 15, fill: '#888', fontWeight: 'bold' }} />
            <YAxis width={40} axisLine={false} tickLine={false} tick={false} label={{ value: 'TỔNG TIỀN (VNĐ)', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle', fill: '#888', fontWeight: 'bold', fontSize: 12} }} />
            <RechartsTooltip formatter={formatCurrency} />
            <Legend verticalAlign="bottom" align="center" iconType="square" wrapperStyle={{ paddingTop: '30px' }} />
            
            {/* Đảm bảo fill màu được nhận chuẩn xác */}
            <Bar dataKey="baoHiem" name="Đối tượng Bảo hiểm" stackId="a" fill="#135e80">
              <LabelList dataKey="baoHiem" position="center" fill="#fff" formatter={formatCurrency} fontSize={12} fontWeight="bold" />
            </Bar>
            <Bar dataKey="dichVu" name="Đối tượng Dịch vụ" stackId="a" fill="#e87731">
              <LabelList dataKey="dichVu" position="center" fill="#fff" formatter={formatCurrency} fontSize={12} fontWeight="bold" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Row gutter={20}>
        {/* BIỂU ĐỒ 2: DOANH THU THEO HÌNH THỨC THANH TOÁN */}
        <Col span={14}>
          <Card title={<div className="text-center font-bold text-gray-600 uppercase">Doanh thu theo hình thức thanh toán</div>}>
            <div className="flex justify-between mb-5">
              <div>
                <Text type="secondary" className="text-sm">Giá trị giao dịch</Text><br/>
                <div className="flex items-center mt-1 mb-1">
                  <Title level={3} className="!m-0 text-black font-extrabold">501.79 tr</Title>
                  <span className="bg-green-50 text-green-600 border border-green-300 px-1.5 rounded text-xs ml-2.5 font-semibold">↑ 0%</span>
                </div>
                <div className="flex items-center">
                  <Text className="font-bold text-gray-600">1.274 <span className="font-normal text-gray-400">giao dịch</span></Text>
                  <span className="bg-green-50 text-green-600 border border-green-300 px-1.5 rounded text-xs ml-2.5 font-semibold">↑ 0%</span>
                </div>
              </div>
              <Select value={paymentType} className="w-[180px]" onChange={setPaymentType}
                options={[
                    { value: 'tienMat', label: 'Tiền mặt' },
                    { value: 'qrDong', label: 'QRMB Động' },
                    { value: 'qrTinh', label: 'QRMB Tĩnh' },
                    { value: 'pos', label: 'POS' },
                    { value: 'khac', label: 'Chuyển khoản khác' },
                ]} />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="ngay" tickLine={false} tick={{ fill: '#666' }} />
                <YAxis width={100} tickFormatter={formatYAxis} axisLine={false} tickLine={false} tick={{ fill: '#666', fontWeight: 500, fontSize: 12 }}
                  label={{ value: 'Doanh thu (VNĐ)', angle: -90, position: 'insideLeft', offset: -5, style: {textAnchor: 'middle', fill: '#666', fontWeight: 'bold', fontSize: 12} }} />
                <RechartsTooltip formatter={formatCurrency} />
                <Bar dataKey={paymentType} fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* BIỂU ĐỒ 3: PIE CHART */}
        <Col span={10}>
          <Card title={<div className="text-center font-bold text-gray-600">Doanh thu theo hình thức thanh toán<br/>(Tổng theo kỳ báo cáo)</div>}>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false}>
                  {/* 🔥 ĐÃ SỬA: Map màu tương ứng cho từng lát cắt của PieChart */}
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
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
};