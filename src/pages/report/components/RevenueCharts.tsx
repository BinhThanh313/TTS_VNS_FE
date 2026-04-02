// src/pages/report/components/RevenueCharts.tsx
import React from 'react';
import { Card, Row, Col, Typography, Select } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { mockChartData, mockPieData } from '../constants';

const { Title, Text } = Typography;

interface Props {
  paymentType: string;
  setPaymentType: (val: string) => void;
}

export const RevenueCharts: React.FC<Props> = ({ paymentType, setPaymentType }) => {
  const formatCurrency = (value: any) => typeof value === 'number' ? value.toLocaleString('vi-VN') : value;
  const formatYAxis = (tickItem: any) => typeof tickItem === 'number' ? `${(tickItem / 1000000)}M` : tickItem;

  return (
    <div style={{ background: '#f5f5f5', padding: 20 }}>
      <Card title={<div style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#555' }}>DOANH THU THEO ĐỐI TƯỢNG</div>} style={{ marginBottom: 20 }}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockChartData} margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="ngay" />
            <YAxis tickFormatter={formatYAxis} label={{ value: 'TỔNG TIỀN (VNĐ)', angle: -90, position: 'insideLeft', offset: -15, style: {textAnchor: 'middle'} }} />
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
              <Select 
                value={paymentType} 
                style={{ width: 150 }} 
                onChange={setPaymentType}
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
                <YAxis tickFormatter={formatYAxis} label={{ value: 'Doanh thu (VNĐ)', angle: -90, position: 'insideLeft', offset: -15, style: {textAnchor: 'middle'} }} />
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
};