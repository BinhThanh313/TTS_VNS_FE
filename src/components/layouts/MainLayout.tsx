import { Layout, Menu, Input, Dropdown } from 'antd';
import { useNavigate, Outlet, useLocation, Navigate } from 'react-router-dom';
import { GlobalOutlined, HomeOutlined, EnvironmentOutlined, BarChartOutlined, LogoutOutlined, SearchOutlined, UserOutlined, AppstoreOutlined  } from '@ant-design/icons';

const { Header, Content, Sider, Footer } = Layout;

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLogin = localStorage.getItem('isLogin');
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    navigate('/login');
  };

  const menuItems = [
    { key: '/revenue', icon: <BarChartOutlined />, label: 'Doanh thu theo ngày' },
    { key: '/province', icon: <GlobalOutlined />, label: 'Tỉnh/Thành phố' },
    { key: '/district', icon: <HomeOutlined />, label: 'Huyện/thị xã' },
    { key: '/ward', icon: <EnvironmentOutlined />, label: 'Xã/phường' },
    { key: '/clinic-service', icon: <AppstoreOutlined />, label: 'Dịch vụ phòng khám' },
  ];

  // Map đường dẫn thành tên Tiếng Việt cho Header
  const breadcrumbMap: Record<string, string> = {
    '/revenue': 'Doanh thu theo ngày',
    '/province': 'Tỉnh/Thành phố',
    '/district': 'Huyện/thị xã',
    '/ward': 'Xã/phường'
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* HEADER MÀU XANH TRẢI DÀI */}
      <Header style={{ background: '#1d39c4', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', height: 50, lineHeight: '50px' }}>
        
        {/* NHÓM BÊN TRÁI: LOGO VÀ CHỮ TRANG CHỦ ĐỨNG SÁT NHAU */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Logo JR */}
          <div style={{ width: 30, height: 30, background: '#fff', borderRadius: '50%', color: '#1d39c4', textAlign: 'center', lineHeight: '30px', fontWeight: 'bold', fontSize: 18 }}>
            Vns
          </div>
          {/* Chữ Trang chủ đứng cạnh logo */}
          <div style={{ fontSize: 14 }}>
            Trang chủ / <span style={{ fontWeight: 'bold' }}>{breadcrumbMap[location.pathname] || ''}</span>
          </div>
        </div>
        
        {/* NHÓM BÊN PHẢI: THÔNG TIN USER */}
        <Dropdown menu={{ items: [{ key: 'logout', label: 'Đăng xuất', icon: <LogoutOutlined />, danger: true, onClick: handleLogout }] }}>
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            Vinorsoft <UserOutlined />
          </div>
        </Dropdown>
        
      </Header>

      <Layout>
        {/* MENU TRẮNG CÓ Ô TÌM KIẾM THEO ẢNH */}
        <Sider width={250} theme="light" style={{ borderRight: '1px solid #f0f0f0' }}>
          <div style={{ padding: '16px' }}>
            <Input prefix={<SearchOutlined style={{ color: '#bfbfbf' }}/>} placeholder="Tìm kiếm" style={{ borderRadius: 20 }} />
          </div>
          <Menu 
            mode="inline" 
            selectedKeys={[location.pathname]} 
            items={menuItems} 
            onClick={({ key }) => navigate(key)}
            style={{ borderRight: 'none' }}
          />
        </Sider>

        {/* NỘI DUNG VÀ FOOTER */}
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