import { useState } from 'react';
import { Layout, Dropdown, Avatar, Badge, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';
import { LogoutOutlined, BellFilled, UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

export default function AppHeader() {
  const navigate = useNavigate();

  // STATE: Quản lý danh sách thông báo
  // Mẹo: Bạn hãy thử thêm vài chuỗi vào mảng này để xem giao diện khi có thông báo nhé!
  // Ví dụ: const [notifications, setNotifications] = useState(['Báo cáo tháng 4 đã được duyệt', 'Có ca cấp cứu mới']);
  const [notifications, setNotifications] = useState<string[]>([]);

  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    navigate('/login');
  };

  // LOGIC: Tạo cấu trúc menu cho quả chuông
  const notificationMenu = {
    items: notifications.length > 0 
      ? notifications.map((notif, index) => ({
          key: `notif-${index}`,
          label: notif,
        }))
      : [
          {
            key: 'empty-notif',
            label: (
              <Empty 
                image={Empty.PRESENTED_IMAGE_SIMPLE} 
                description="Không có thông báo" 
                style={{ margin: 0, padding: '16px 24px' }}
              />
            ),
            disabled: true, // Làm mờ hiệu ứng hover khi không có dữ liệu
            style: { cursor: 'default' } 
          }
        ]
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
        
        {/* DROPDOWN THÔNG BÁO */}
        <Dropdown 
          menu={notificationMenu} 
          trigger={['click']} // Cài đặt nhấn click chuột trái mới hiện (thay vì hover)
          placement="bottomRight"
        >
          {/* BADGE: Tạo chấm đỏ đếm số lượng thông báo */}
          <Badge count={notifications.length} overflowCount={99} offset={[-2, 4]} style={{ cursor: 'pointer' }}>
            <BellFilled style={{ fontSize: '22px', color: '#fff', cursor: 'pointer' }} />
          </Badge>
        </Dropdown>

        <div style={{ width: '1px', height: '40px', backgroundColor: '#fff', opacity: 0.6 }} />

        {/* DROPDOWN USER (Giữ nguyên của bạn) */}
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