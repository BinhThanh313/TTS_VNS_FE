import React, { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { AppModal } from '@/components/common';
import type { IDistrict } from '@/types/category'; 

interface Props { open: boolean; onClose: () => void; onSave: (values: IDistrict) => void; initialValues: IDistrict | null; }

export const DistrictEditModal: React.FC<Props> = ({ open, onClose, onSave, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => { if (open && initialValues) form.setFieldsValue(initialValues); }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave({ ...initialValues, ...values } as IDistrict);
      onClose();
    } catch (error) {}
  };

  return (
    <AppModal title="Cập nhật Huyện/ Thị xã" open={open} onOk={handleOk} onCancel={onClose} okText="Lưu lại">
      <Form form={form} layout="vertical">
        <Form.Item name="provinceId" style={{ marginBottom: 0 }}>
          <Select placeholder="-- Chọn Tỉnh --" allowClear>
            <Select.Option value="HN">Hà Nội</Select.Option>
            <Select.Option value="HD">Hà Đông</Select.Option>
            <Select.Option value="HP">Hải Phòng</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="code" label="Mã Huyện/ Thị xã" rules={[{ required: true }]}><Input disabled /></Form.Item>
        <Form.Item name="name" label="Tên Huyện/ Thị xã" rules={[{ required: true }]}><Input placeholder="Nhập tên" /></Form.Item>
      </Form>
    </AppModal>
  );
};