import React from 'react';
import { Form, Row, Col, Select, Input, Space } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { AppButton } from '@/components/common'; // Import từ common

interface SearchFormProps {
  form: FormInstance;
  onSearch: (values: any) => void;
  onCreate: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ form, onSearch, onCreate }) => (
  <Form form={form} layout="vertical" onFinish={onSearch} style={{ padding: '24px 0', borderBottom: '1px solid #f0f0f0', marginBottom: 24 }}>
    <Row gutter={24}>
      <Col span={8}>
        <Form.Item label={<span style={{ fontWeight: 500 }}>Cơ sở</span>} name="coSo">
          <Select placeholder="Chọn" allowClear />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label={<span style={{ fontWeight: 500 }}>Loại dịch vụ</span>} name="loaiDichVu">
          <Select placeholder="Chọn" allowClear />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label={<span style={{ fontWeight: 500 }}>Nhóm dịch vụ</span>} name="nhomDichVu">
          <Select placeholder="Chọn" allowClear />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={24} align="bottom">
      <Col span={8}>
        <Form.Item label={<span style={{ fontWeight: 500 }}>Tên dịch vụ</span>} name="tenDichVu" style={{ marginBottom: 0 }}>
          <Input placeholder="Nhập" allowClear />
        </Form.Item>
      </Col>
      <Col span={16} style={{ textAlign: 'right' }}>
        <Space>
          <AppButton type="primary" htmlType="submit" icon={<SearchOutlined />} style={{ background: '#1890ff' }}>
            Tìm kiếm
          </AppButton>
          <AppButton type="primary" icon={<PlusOutlined />} onClick={onCreate} style={{ background: '#1890ff' }}>
            Thêm mới
          </AppButton>
        </Space>
      </Col>
    </Row>
  </Form>
);