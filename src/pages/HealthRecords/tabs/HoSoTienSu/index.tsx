import { Tabs } from 'antd';
import { UserOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { ThongTinHanhChinhTab } from './ThongTinHanhChinh';
import { TienSuTab } from './TienSu';

export const HoSoTienSuView = () => {
  const tabItems = [
    { key: 'hanhchinh', label: <span style={{ fontWeight: 600 }}><UserOutlined /> Thông tin hành chính</span>, children: <ThongTinHanhChinhTab /> },
    { key: 'tiensu', label: <span style={{ fontWeight: 600 }}><MedicineBoxOutlined /> Tiền sử</span>, children: <TienSuTab /> },
  ];
  return <Tabs defaultActiveKey="hanhchinh" items={tabItems} className="custom-detail-tabs" />;
};