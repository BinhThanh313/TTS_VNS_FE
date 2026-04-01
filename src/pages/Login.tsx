import React, { useState } from 'react';
import { Button, Form, Input, Card, message, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    // Bật hiệu ứng loading để UX mượt mà hơn
    setLoading(true);

    // Giả lập thời gian chờ API (1 giây) trước khi chuyển trang
    setTimeout(() => {
      localStorage.setItem('isLogin', 'true');
      message.success('Đăng nhập thành công!');
      navigate('/province');
    }, 1000);
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      // Đổi nền gradient sang trọng, đồng bộ với màu #1d39c4 của Header
      background: 'linear-gradient(135deg, #1d39c4 0%, #5b8ff9 100%)' 
    }}>
      <Card 
        style={{ 
          width: '100%', 
          maxWidth: 420, // Hơi rộng ra một chút cho thoáng
          borderRadius: 16, // Bo góc mềm mại
          boxShadow: '0 15px 35px rgba(0,0,0,0.2)', // Đổ bóng nổi bật
          border: 'none'
        }}
        styles={{ body: { padding: '40px 32px' } }}
      >
        {/* KHU VỰC LOGO VÀ TIÊU ĐỀ */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ 
            width: 64, height: 64, background: '#1d39c4', borderRadius: '50%', 
            color: '#fff', fontSize: 24, fontWeight: 'bold', lineHeight: '64px', 
            margin: '0 auto 16px auto', boxShadow: '0 4px 10px rgba(29, 57, 196, 0.3)'
          }}>
            Vns
          </div>
          <Title level={3} style={{ margin: 0, color: '#1d39c4' }}>HỆ THỐNG QUẢN LÝ</Title>
          <Text type="secondary">Vui lòng đăng nhập để tiếp tục</Text>
        </div>

        {/* FORM ĐĂNG NHẬP */}
        <Form layout="vertical" onFinish={onFinish} size="large">
          <Form.Item 
            name="username" 
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} 
              placeholder="Nhập tài khoản" 
            />
          </Form.Item>

          <Form.Item 
            name="password" 
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: '#bfbfbf' }} />} 
              placeholder="Nhập mật khẩu" 
            />
          </Form.Item>

          {/* DÒNG GHI NHỚ & QUÊN MẬT KHẨU */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ mật khẩu</Checkbox>
            </Form.Item>
            <a style={{ color: '#1d39c4', fontWeight: 500 }} href="#">Quên mật khẩu?</a>
          </div>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              loading={loading} // Trạng thái loading
              style={{ background: '#1d39c4', height: 44, fontSize: 16, borderRadius: 8 }}
            >
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}