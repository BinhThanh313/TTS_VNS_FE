import { useState, useEffect } from 'react';
import { Layout, Dropdown, Tabs, Button } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate, Outlet, Navigate, useLocation } from 'react-router-dom';
import { HomeOutlined, DownOutlined } from '@ant-design/icons';
import { type TabItem, menuMap } from '../../types/layout.type';

import LeftMenu from './LeftMenu';
import AppHeader from './AppHeader';
import './Layout.scss';

const { Content, Footer } = Layout;

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [activeKey, setActiveKey] = useState<string>(location.pathname);
  const [tabItems, setTabItems] = useState<TabItem[]>([]);

  useEffect(() => {
    const currentPath = location.pathname;
    const title = menuMap[currentPath];

    if (title) {
      setTabItems((prev) => {
        const isExist = prev.some((item) => item.key === currentPath);
        if (!isExist) {
          return [
            ...prev,
            {
              key: currentPath,
              label: (
                <span>
                  <HomeOutlined style={{ marginRight: 6 }} /> 
                  {title}
                </span>
              ),
            },
          ];
        }
        return prev;
      });
      setActiveKey(currentPath);
    }
  }, [location.pathname]);

  const onChangeTab = (newActiveKey: string) => {
    navigate(newActiveKey);
  };

  const onEditTab = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove'
  ) => {
    if (action === 'remove') {
      const keyToRemove = targetKey as string;

      let newActiveKey = activeKey;
      let lastIndex = -1;

      tabItems.forEach((item, i) => {
        if (item.key === keyToRemove) {
          lastIndex = i - 1; 
        }
      });

      const newTabs = tabItems.filter((item) => item.key !== keyToRemove);
      
      if (newTabs.length && newActiveKey === keyToRemove) {
        if (lastIndex >= 0) {
          newActiveKey = newTabs[lastIndex].key;
        } else {
          newActiveKey = newTabs[0].key;
        }
        navigate(newActiveKey);
      } else if (newTabs.length === 0) {
        navigate('/'); 
      }
      
      setTabItems(newTabs);
    }
  };

  const handleTabMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'close-all') {
      setTabItems([]);
      navigate('/'); 
    } else if (key === 'close-others') {
      const currentTab = tabItems.find(item => item.key === activeKey);
      if (currentTab) {
        setTabItems([currentTab]);
      }
    }
  };

  const OperationsSlot = {
    left: (
      <Dropdown 
        menu={{ 
          items: [
            { key: 'close-others', label: 'Đóng các tab khác' },
            { key: 'close-all', label: 'Đóng tất cả' },
          ],
          onClick: handleTabMenuClick 
        }} 
        trigger={['click']}
      >
        <Button size="small" style={{ marginRight: '4px', height: '28px', width: '28px', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: 8 }}>
          <DownOutlined style={{ fontSize: '10px', color: '#666' }} />
        </Button>
      </Dropdown>
    ),
  };

  // Kiểm tra đăng nhập
  const isLogin = localStorage.getItem('isLogin');
  if (!isLogin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      
      {/* HEADER ĐƯỢC GỌI Ở ĐÂY */}
      <AppHeader />

      <Layout>
        <LeftMenu />

        <Layout>
          <Content style={{ display: 'flex', flexDirection: 'column', background: '#f0f2f5' }}>
            
            {tabItems.length > 0 && (
              <div style={{ background: '#fff', paddingTop: '8px', paddingLeft: '16px', borderBottom: '1px solid #f0f0f0' }}>
                <Tabs
                  hideAdd
                  onChange={onChangeTab}
                  activeKey={activeKey}
                  type="editable-card"
                  onEdit={onEditTab}
                  items={tabItems}
                  size="small"
                  tabBarExtraContent={OperationsSlot} 
                  className="custom-tabs"
                  style={{ marginBottom: '-1px' }} 
                />
              </div>
            )}

            <div style={{ flex: 1, padding: '16px', background: '#fff', margin: '8px', borderRadius: '8px' }}>
              <Outlet />
            </div>

          </Content>

          <Footer style={{ textAlign: 'center', background: '#fff', padding: '10px 20px', fontSize: 13, color: '#888', borderTop: '1px solid #f0f0f0' }}>
            Powered by Thong Nhat hospital and Military Bank
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}