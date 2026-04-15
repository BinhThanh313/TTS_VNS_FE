import { useState } from 'react';
import { Layout, Menu, Input } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  GlobalOutlined, HomeOutlined, EnvironmentOutlined, BarChartOutlined, 
  SearchOutlined, AppstoreOutlined, SettingOutlined, TeamOutlined, 
  FileTextOutlined, MedicineBoxOutlined, SafetyCertificateOutlined, MenuFoldOutlined, 
  MenuUnfoldOutlined 
} from '@ant-design/icons';

const { Sider } = Layout;

export default function LeftMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchText, setSearchText] = useState('');
  
  // Bước 1: Thêm state để quản lý trạng thái thu phóng
  const [collapsed, setCollapsed] = useState(false);

  const allMenuItems = [
    { key: '/revenue', icon: <BarChartOutlined />, label: 'Doanh thu theo ngày' },
    { key: '/province', icon: <GlobalOutlined />, label: 'Tỉnh/Thành phố' },
    { key: '/district', icon: <HomeOutlined />, label: 'Huyện/thị xã' },
    { key: '/ward', icon: <EnvironmentOutlined />, label: 'Xã/phường' },
    { key: '/clinic-service', icon: <AppstoreOutlined />, label: 'Dịch vụ phòng khám' },
    { key: '/queue/queue-system', icon: <AppstoreOutlined />, label: 'Hàng chờ khám bệnh' },
    { key: '/medical-records', icon: <MedicineBoxOutlined />, label: 'Hồ sơ sức khỏe' },
  ];

  const filteredMenuItems = allMenuItems.filter(item => 
    item.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Sider 
      width={250} 
      theme="light" 
      style={{ borderRight: '1px solid #f0f0f0' }}
      // Bước 2: Cấu hình thu phóng cho Sider
      collapsible 
      collapsed={collapsed} 
      onCollapse={(value) => setCollapsed(value)}
      trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      breakpoint="lg" // Tự động thu nhỏ trên màn hình vừa
    >
      {/* Bước 3: Ẩn thanh tìm kiếm khi menu bị thu nhỏ */}
      {!collapsed && (
        <div style={{ padding: '16px' }}>
          <Input 
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }}/>} 
            placeholder="Nhập/Chọn" 
            style={{ borderRadius: 8 }}
            allowClear
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      )}
      
      <Menu 
        mode="inline" 
        selectedKeys={[location.pathname]} 
        items={filteredMenuItems}
        onClick={({ key }) => navigate(key)}
        style={{ borderRight: 'none' }}
        className="custom-side-menu"
      />
      
      {!filteredMenuItems.length && !collapsed && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#999', fontSize: 13 }}>
          Không tìm thấy chức năng
        </div>
      )}
    </Sider>
  );
}