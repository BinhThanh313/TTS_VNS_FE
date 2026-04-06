import { useState } from 'react';
import { Button, Form, Input, Card, message, Checkbox, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

interface LoginValues {
  username?: string;
  password?: string;
  remember?: boolean;
}

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: LoginValues) => {
    setLoading(true);
    console.log('Dữ liệu gửi đi:', values);

    setTimeout(() => {
      localStorage.setItem('isLogin', 'true');
      message.success('Đăng nhập thành công!');
      navigate('/province');
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    message.info(`Tính năng đăng nhập bằng ${provider} đang được phát triển!`);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      // Background gradient sang trọng, hiện đại
      background: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)', 
      padding: '20px'
    }}>
      <Card 
        style={{ 
          width: '100%', 
          maxWidth: 440, 
          borderRadius: 24, 
          // Đổ bóng sâu tạo cảm giác nổi 3D
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)', 
          border: 'none',
          background: '#ffffff', 
        }}
        styles={{ body: { padding: '48px 40px' } }}
      >
        {/* KHU VỰC LOGO VÀ TIÊU ĐỀ */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          {/* Logo Vinorsoft được nhúng trực tiếp */}
          <img 
            src="https://vinorsoft.com/static/media/logo3.46cde8320c717e6ab49d.png" 
            alt="Vinorsoft Logo" 
            style={{ 
              height: 56, // Kích thước logo vừa vặn
              marginBottom: 24,
              objectFit: 'contain' 
            }} 
          />
          <Title level={3} style={{ margin: 0, color: '#1f2937', fontWeight: 800, fontSize: 24 }}>
            Chào mừng trở lại!
          </Title>
          <Text type="secondary" style={{ fontSize: 15, marginTop: 8, display: 'block' }}>
            Đăng nhập để truy cập hệ thống quản lý
          </Text>
        </div>

        {/* FORM ĐĂNG NHẬP */}
        <Form 
          layout="vertical" 
          onFinish={onFinish} 
          size="large"
          initialValues={{ remember: true }}
        >
          <Form.Item 
            name="username" 
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#9ca3af', marginRight: 8 }} />} 
              placeholder="Tên đăng nhập" 
              style={{ borderRadius: 10, padding: '10px 16px', background: '#f9fafb', border: '1px solid #e5e7eb' }}
            />
          </Form.Item>

          <Form.Item 
            name="password" 
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            style={{ marginBottom: 16 }}
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: '#9ca3af', marginRight: 8 }} />} 
              placeholder="Mật khẩu" 
              style={{ borderRadius: 10, padding: '10px 16px', background: '#f9fafb', border: '1px solid #e5e7eb' }}
            />
          </Form.Item>

          {/* DÒNG GHI NHỚ & QUÊN MẬT KHẨU */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox><Text style={{ color: '#4b5563', fontSize: 14 }}>Ghi nhớ tôi</Text></Checkbox>
            </Form.Item>
            <a 
              style={{ color: '#2563eb', fontWeight: 600, fontSize: 14, transition: 'color 0.3s' }} 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                message.info('Vui lòng liên hệ Admin để cấp lại mật khẩu!');
              }}
            >
              Quên mật khẩu?
            </a>
          </div>

          <Form.Item style={{ marginBottom: 24 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              loading={loading}
              style={{ 
                height: 48, 
                fontSize: 16, 
                borderRadius: 10, 
                fontWeight: 600, 
                background: '#1d39c4', // Xanh đậm Vinorsoft
                boxShadow: '0 4px 14px 0 rgba(29, 57, 196, 0.39)' 
              }}
            >
              Đăng nhập
            </Button>
          </Form.Item>

          {/* ĐƯỜNG KẺ NGĂN CÁCH */}
          <Divider plain style={{ margin: '20px 0', color: '#9ca3af', fontSize: 14 }}>
            Hoặc tiếp tục với
          </Divider>

          {/* CÁC NÚT ĐĂNG NHẬP MẠNG XÃ HỘI */}
          <div style={{ display: 'flex', gap: 16 }}>
            <Button 
              icon={<GoogleOutlined style={{ color: '#ea4335', fontSize: 18 }} />} 
              style={{ flex: 1, height: 44, borderRadius: 10, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => handleSocialLogin('Google')}
            >
              Google
            </Button>
            <Button 
              icon={<GithubOutlined style={{ fontSize: 18 }} />} 
              style={{ flex: 1, height: 44, borderRadius: 10, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onClick={() => handleSocialLogin('GitHub')}
            >
              GitHub
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}