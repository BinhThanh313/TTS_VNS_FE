import React from 'react';
import { Form, Input } from 'antd';
import { SearchOutlined, ImportOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { AppButton } from '@/components/common';

interface Props {
  form: FormInstance;
  onSearch: (values: any) => void;
  onImport: () => void;
}

export const ProvinceSearchForm: React.FC<Props> = ({ form, onSearch, onImport }) => (
  <Form form={form} layout="vertical" onFinish={onSearch}>
    <div className="filter-section">
      <div className="filter-row">
        <div className="filter-item">
          <div className="filter-label">Tên tỉnh/TP</div>
          <Form.Item name="tenTinh" style={{ marginBottom: 0 }}>
            <Input placeholder="Nhập tên tỉnh/TP" allowClear />
          </Form.Item>
        </div>
        <div className="filter-item">
          <div className="filter-label">Mã tỉnh/TP</div>
          <Form.Item name="maTinh" style={{ marginBottom: 0 }}>
            <Input placeholder="Nhập mã (Tối đa 6 số)" maxLength={6} allowClear />
          </Form.Item>
        </div>
      </div>
      <div className="action-row">
        <AppButton icon={<ImportOutlined />} onClick={onImport}>Import file</AppButton>
        <AppButton type="primary" icon={<SearchOutlined />} htmlType="submit">Tìm kiếm</AppButton>
      </div>
    </div>
  </Form>
);