import { Layout, Dropdown, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, BellFilled, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

export default function AppHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    navigate('/login');
  };

  return (
    <Header style={{ 
      background: '#0008b0', 
      padding: '0 24px', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      height: '80px',
      color: '#fff',
    }}>
      
      {/* BÊN TRÁI: TIÊU ĐỀ */}
      <div style={{ fontSize: '24px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>
        Hệ thống báo cáo y tế
      </div>
      
      {/* BÊN PHẢI: THÔNG BÁO VÀ THÔNG TIN USER */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <BellFilled style={{ fontSize: '22px', cursor: 'pointer' }} />
        <div style={{ width: '1px', height: '40px', backgroundColor: '#fff', opacity: 0.6 }} />

        <Dropdown 
          menu={{ items: [{ key: 'logout', label: 'Đăng xuất', icon: <LogoutOutlined />, danger: true, onClick: handleLogout }] }} 
          placement="bottomRight"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
            <Avatar 
              size={46} 
              icon={<UserOutlined />} 
              style={{ backgroundColor: 'transparent', border: '2px solid #fff' }} 
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.2', fontSize: '13px' }}>
              <span style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '2px' }}>Nguyễn Văn A</span>
              <span>Khoa Nội</span>
              <span>Bệnh viện đa khoa Tỉnh Tuyên Quang</span>
            </div>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
}