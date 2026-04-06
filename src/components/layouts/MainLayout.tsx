import { useState } from 'react';
import { Layout, Menu, Input, Dropdown } from 'antd';
import { useNavigate, Outlet, useLocation, Navigate } from 'react-router-dom';
import { GlobalOutlined, HomeOutlined, EnvironmentOutlined, BarChartOutlined, LogoutOutlined, SearchOutlined, AppstoreOutlined } from '@ant-design/icons';
import './Layout.scss';
const { Header, Content, Sider, Footer } = Layout;

// Component vẽ Cờ đỏ sao vàng chuẩn tỷ lệ (SVG)
const VietnamFlag = () => (
  <svg width="24" height="16" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', borderRadius: 2 }}>
    <rect width="300" height="200" fill="#DA251D" />
    <polygon points="150,40 182.36,140 97.08,78 202.92,78 117.64,140" fill="#FFFF00" />
  </svg>
);

// Component vẽ Icon 2 mũi tên chéo (SVG)
const DiagonalArrowsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 3v6h-2V6.41l-5.59 5.59-1.41-1.41L17.59 5H15V3h6zM3 21v-6h2v2.59l5.59-5.59 1.41 1.41L6.41 19H9v2H3z"/>
  </svg>
);

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [searchText, setSearchText] = useState('');

  const isLogin = localStorage.getItem('isLogin');
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    navigate('/login');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.error(err));
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const allMenuItems = [
    { key: '/revenue', icon: <BarChartOutlined />, label: 'Doanh thu theo ngày' },
    { key: '/province', icon: <GlobalOutlined />, label: 'Tỉnh/Thành phố' },
    { key: '/district', icon: <HomeOutlined />, label: 'Huyện/thị xã' },
    { key: '/ward', icon: <EnvironmentOutlined />, label: 'Xã/phường' },
    { key: '/clinic-service', icon: <AppstoreOutlined />, label: 'Dịch vụ phòng khám' },
    // { key: '/queue/reception', icon: <AppstoreOutlined />, label: 'Lễ tân cấp số' },
    // { key: '/queue/doctor', icon: <AppstoreOutlined />, label: 'Bác sĩ gọi khám' },
    // { key: '/queue/display', icon: <AppstoreOutlined />, label: 'Màn hình Tivi' },
    { key: '/queue/test-all', icon: <AppstoreOutlined />, label: 'Hàng đợi khám bệnh' },
  ];

  const filteredMenuItems = allMenuItems.filter(item => 
    item.label.toLowerCase().includes(searchText.toLowerCase())
  );

  const breadcrumbMap: Record<string, string> = {
    '/revenue': 'Doanh thu theo ngày',
    '/province': 'Tỉnh/Thành phố',
    '/district': 'Huyện/thị xã',
    '/ward': 'Xã/phường',
    '/clinic-service': 'Dịch vụ phòng khám',
    '/queue/test-all': 'Hàng đợi khám bệnh',
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sử dụng className thay vì viết style inline quá dài */}
      <Header className="main-header-custom">
        
        {/* NHÓM BÊN TRÁI */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="logo-wrapper">
            <img 
              src="https://vinorsoft.com/static/media/logo3.46cde8320c717e6ab49d.png" 
              alt="Vinorsoft Logo" 
              style={{ height: '70%', maxWidth: '85%', objectFit: 'contain' }} 
            />
          </div>
          <div style={{ fontSize: 15, color: '#fff' }}>
            Trang chủ / <span style={{ fontWeight: 'bold' }}>{breadcrumbMap[location.pathname] || ''}</span>
          </div>
        </div>
        
        {/* NHÓM BÊN PHẢI */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Dropdown menu={{ items: [{ key: 'logout', label: 'Đăng xuất', icon: <LogoutOutlined />, danger: true, onClick: handleLogout }] }}>
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, color: '#fff' }}>
              <span style={{ fontSize: 15 }}>Vinorsoft</span>
              <VietnamFlag />
            </div>
          </Dropdown>
          
          <div onClick={toggleFullscreen} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#fff' }}>
            <DiagonalArrowsIcon />
          </div>
        </div>

      </Header>

      <Layout>
        <Sider width={250} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
          <div style={{ padding: '16px' }}>
            <Input 
              prefix={<SearchOutlined style={{ color: '#bfbfbf' }}/>} 
              placeholder="Tìm kiếm menu..." 
              style={{ borderRadius: 20 }}
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          
          {filteredMenuItems.length > 0 ? (
            <Menu 
              mode="inline" 
              selectedKeys={[location.pathname]} 
              items={filteredMenuItems}
              onClick={({ key }) => navigate(key)}
              style={{ borderRight: 'none' }}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', color: '#999', fontSize: 13 }}>
              Không tìm thấy chức năng
            </div>
          )}
        </Sider>

        <Layout>
          <Content style={{ background: '#fff' }}>
            <Outlet />
          </Content>
          <Footer style={{ textAlign: 'center', background: '#fff', padding: '10px 20px', fontSize: 13, color: '#888', borderTop: '1px solid #f0f0f0' }}>
            Powered by Thong Nhat hospital and Military Bank
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}