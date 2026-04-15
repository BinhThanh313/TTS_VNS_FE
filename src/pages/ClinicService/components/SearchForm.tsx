import React from 'react';
import { Form, Row, Col, Select, Input, Space } from 'antd';
import { Search, Plus } from 'lucide-react';
import type { FormInstance } from 'antd';
import { AppButton } from '@/components/common';

interface SearchFormProps {
  form: FormInstance;
  onSearch: (values: any) => void;
  onCreate: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({ form, onSearch, onCreate }) => (
  <Form form={form} layout="vertical" onFinish={onSearch} className="py-6 border-b border-gray-200 mb-6">
    <Row gutter={24}>
      <Col span={8}>
        <Form.Item label={<span className="font-medium">Cơ sở</span>} name="coSo">
          <Select placeholder="Chọn" allowClear showSearch optionFilterProp="label" options={[]} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label={<span className="font-medium">Loại dịch vụ</span>} name="loaiDichVu">
          <Select placeholder="Chọn" allowClear showSearch optionFilterProp="label" options={[]} />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label={<span className="font-medium">Nhóm dịch vụ</span>} name="nhomDichVu">
          <Select placeholder="Chọn" allowClear showSearch optionFilterProp="label" options={[]} />
        </Form.Item>
      </Col>
    </Row>

    <Row gutter={24} align="bottom">
      <Col span={8}>
        <Form.Item label={<span className="font-medium">Tên dịch vụ</span>} name="tenDichVu" className="mb-0">
          <Input placeholder="Nhập" allowClear maxLength={250} />
        </Form.Item>
      </Col>
      <Col span={16} className="text-right">
        <Space>
          <AppButton type="primary" htmlType="submit" icon={<Search size={16} />} className="bg-blue-500">
            Tìm kiếm
          </AppButton>
          <AppButton type="primary" icon={<Plus size={16} />} onClick={onCreate} className="bg-blue-500">
            Thêm mới
          </AppButton>
        </Space>
      </Col>
    </Row>
  </Form>
);