import { useState } from 'react';
import { Button, Form, Input, Card, message, Checkbox, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import type { FormProps } from 'antd';
import './Login.scss';

const { Title, Text } = Typography;

type FieldType = {
  username?: string;
  password?: string;
  remember?: boolean;
};

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('isLogin', 'true');
      message.success('Đăng nhập thành công!');
      setLoading(false);
      navigate('/'); 
      
    }, 1000);
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    message.error('Vui lòng kiểm tra lại thông tin đăng nhập!');
  };

  const handleSocialLogin = (provider: string) => {
    message.info(`Tính năng đăng nhập bằng ${provider} đang được phát triển!`);
  };

  return (
    <div className="login-container">
      <Card className="login-card" styles={{ body: { padding: '48px 40px' } }}>
        <div className="login-header">
          <img 
            src="https://vinorsoft.com/static/media/logo3.46cde8320c717e6ab49d.png" 
            alt="Vinorsoft Logo" 
            className="login-logo"
          />
          <Title level={3} className="login-title">
            Chào mừng trở lại!
          </Title>
          <Text type="secondary" className="login-subtitle">
            Đăng nhập để truy cập hệ thống báo cáo y tế
          </Text>
        </div>

        <Form 
          name="login_form" 
          layout="vertical" 
          onFinish={onFinish} 
          onFinishFailed={onFinishFailed} 
          size="large" 
          initialValues={{ remember: true }} 
          autoComplete="off"
        >
          <Form.Item<FieldType> 
            label="Username" 
            name="username" 
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Tên đăng nhập" 
              className="login-input"
            />
          </Form.Item>

          <Form.Item<FieldType> 
            label="Password" 
            name="password" 
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Mật khẩu" 
              className="login-input"
            />
          </Form.Item>

          <div className="login-options">
            <Form.Item<FieldType> name="remember" valuePropName="checked" noStyle>
              <Checkbox>Ghi nhớ tôi</Checkbox>
            </Form.Item>
            <a className="forgot-password" href="/" onClick={(e) => e.preventDefault()}>
              Quên mật khẩu?
            </a>
          </div>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              loading={loading} 
              className="login-submit-btn"
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <Divider plain className="social-divider">
            Hoặc tiếp tục với
          </Divider>

          <div className="social-login-group">
            <Button 
              icon={<GoogleOutlined />} 
              className="social-btn google-btn" 
              onClick={() => handleSocialLogin('Google')}
            >
              Google
            </Button>
            <Button 
              icon={<GithubOutlined />} 
              className="social-btn" 
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