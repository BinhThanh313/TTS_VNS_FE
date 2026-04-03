import React from 'react';
import { Form, Input, Select } from 'antd';
import { SearchOutlined, ImportOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { AppButton } from '@/components/common';

interface Props { form: FormInstance; onSearch: (values: any) => void; onImport: () => void; }

export const DistrictSearchForm: React.FC<Props> = ({ form, onSearch, onImport }) => (
  <Form form={form} layout="vertical" onFinish={onSearch}>
    <div className="filter-section">
      <div className="filter-row">
        <div className="filter-item">
          <div className="filter-label">Tỉnh/ Thành phố</div>
          <Form.Item name="provinceId" style={{ marginBottom: 0 }}>
            <Select placeholder="-- Chọn Tỉnh --" allowClear><Select.Option value="HN">Hà Nội</Select.Option></Select>
          </Form.Item>
        </div>
        <div className="filter-item">
          <div className="filter-label">Tên Huyện/ thị xã</div>
          <Form.Item name="name" style={{ marginBottom: 0 }}><Input placeholder="Nhập tên..." allowClear /></Form.Item>
        </div>
      </div>
      <div className="action-row">
        <AppButton icon={<ImportOutlined />} onClick={onImport}>Import file</AppButton>
        <AppButton type="primary" icon={<SearchOutlined />} htmlType="submit">Tìm kiếm</AppButton>
      </div>
    </div>
  </Form>
);