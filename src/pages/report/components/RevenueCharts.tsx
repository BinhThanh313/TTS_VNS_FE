import { Card, Row, Col, Typography, Select } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, LabelList } from 'recharts';
import { mockChartData, mockPieData } from './constants';

const { Title, Text } = Typography;

interface Props {
  paymentType: string;
  setPaymentType: (val: string) => void;
}

export const RevenueCharts: React.FC<Props> = ({ paymentType, setPaymentType }) => {
  const formatCurrency = (value: any) => typeof value === 'number' ? value.toLocaleString('vi-VN') : value;
  
  const formatYAxis = (tickItem: any) => typeof tickItem === 'number' ? tickItem.toLocaleString('vi-VN') : tickItem;

  return (
    <div style={{ background: '#f5f5f5', padding: 20 }}>
      {/* BIỂU ĐỒ 1: DOANH THU THEO ĐỐI TƯỢNG */}
      <Card title={<div style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#666' }}>DOANH THU THEO ĐỐI TƯỢNG</div>} style={{ marginBottom: 20 }}>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={mockChartData} margin={{ top: 10, right: 30, left: 10, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="ngay" 
              tickMargin={10}
              tickLine={false} 
              label={{ value: 'NGÀY', position: 'bottom', offset: 15, fill: '#888', fontWeight: 'bold' }} 
            />
            <YAxis 
              width={40} 
              axisLine={false} 
              tickLine={false} 
              tick={false} 
              label={{ value: 'TỔNG TIỀN (VNĐ)', angle: -90, position: 'insideLeft', style: {textAnchor: 'middle', fill: '#888', fontWeight: 'bold', fontSize: 12} }} 
            />
            <RechartsTooltip formatter={formatCurrency} />
            <Legend 
              verticalAlign="bottom" 
              align="center" 
              iconType="square" 
              wrapperStyle={{ paddingTop: '30px' }} 
            />
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
          <Card title={<div style={{ textAlign: 'center', fontWeight: 'bold', color: '#555', textTransform: 'uppercase' }}>Doanh thu theo hình thức thanh toán</div>}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <Text type="secondary" style={{ fontSize: 14 }}>Giá trị giao dịch</Text><br/>
                
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 4, marginBottom: 4 }}>
                  <Title level={3} style={{ margin: 0, color: '#000', fontWeight: 800 }}>501.79 tr</Title>
                  <span style={{ background: '#f6ffed', color: '#52c41a', border: '1px solid #b7eb8f', padding: '0 6px', borderRadius: 4, fontSize: 12, marginLeft: 10, fontWeight: 600 }}>
                    ↑ 0%
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Text style={{ fontWeight: 700, color: '#555' }}>1.274 <span style={{fontWeight: 'normal', color: '#888'}}>giao dịch</span></Text>
                  <span style={{ background: '#f6ffed', color: '#52c41a', border: '1px solid #b7eb8f', padding: '0 6px', borderRadius: 4, fontSize: 12, marginLeft: 10, fontWeight: 600 }}>
                    ↑ 0%
                  </span>
                </div>
              </div>

              <Select 
                value={paymentType} 
                style={{ width: 180 }}  
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
              <BarChart data={mockChartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="ngay" tickLine={false} tick={{ fill: '#666' }} />
                
                <YAxis 
                  width={100} 
                  tickFormatter={formatYAxis} 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666', fontWeight: 500, fontSize: 12 }}
                  label={{ value: 'Doanh thu (VNĐ)', angle: -90, position: 'insideLeft', offset: -5, style: {textAnchor: 'middle', fill: '#666', fontWeight: 'bold', fontSize: 12} }} 
                />
                <RechartsTooltip formatter={formatCurrency} />
                <Bar dataKey={paymentType} fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* BIỂU ĐỒ 3: PIE CHART */}
        <Col span={10}>
          <Card title={<div style={{ textAlign: 'center', fontWeight: 'bold', color: '#555' }}>Doanh thu theo hình thức thanh toán<br/>(Tổng theo kỳ báo cáo)</div>}>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie 
                  data={mockPieData.map(item => ({ ...item, fill: item.color }))} 
                  dataKey="value" 
                  nameKey="name" 
                  cx="50%" 
                  cy="50%" 
                  outerRadius={100} 
                  labelLine={false} 
                />
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