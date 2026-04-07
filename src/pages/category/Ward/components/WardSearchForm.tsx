import React from 'react';
import { Form, Input, Select } from 'antd';
import { SearchOutlined, ImportOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { AppButton } from '@/components/common';

interface Props { form: FormInstance; onSearch: (values: any) => void; onImport: () => void; }

export const WardSearchForm: React.FC<Props> = ({ form, onSearch, onImport }) => (
  <Form form={form} layout="vertical" onFinish={onSearch}>
    <div className="filter-section">
      <div className="filter-row">
        <div className="filter-item">
          <div className="filter-label">Quận/ Huyện</div>
          <Form.Item name="districtId" style={{ marginBottom: 0 }}>
            <Select placeholder="-- Chọn --" allowClear>
              <Select.Option value="BD">Ba Đình</Select.Option>
              <Select.Option value="CG">Cầu Giấy</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="filter-item">
          <div className="filter-label">Tên Xã/ Phường</div>
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