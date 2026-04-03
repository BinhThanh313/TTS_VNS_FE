import React, { useEffect } from 'react';
import { Form, Input, Select } from 'antd';
import { AppModal } from '@/components/common';
import type { IWard } from '@/types/category'; 

interface Props { open: boolean; onClose: () => void; onSave: (values: IWard) => void; initialValues: IWard | null; }

export const WardEditModal: React.FC<Props> = ({ open, onClose, onSave, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => { if (open && initialValues) form.setFieldsValue(initialValues); }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave({ ...initialValues, ...values } as IWard);
      onClose();
    } catch (error) {}
  };

  return (
    <AppModal title="Cập nhật Xã/ Phường" open={open} onOk={handleOk} onCancel={onClose}>
      <Form form={form} layout="vertical">
        <Form.Item name="districtName" label="Quận/ Huyện" rules={[{ required: true }]}><Select><Select.Option value="Ba Đình">Ba Đình</Select.Option></Select></Form.Item>
        <Form.Item name="code" label="Mã Xã/ Phường" rules={[{ required: true }]}><Input disabled /></Form.Item>
        <Form.Item name="name" label="Tên Xã/ Phường" rules={[{ required: true }]}><Input placeholder="Nhập tên" /></Form.Item>
      </Form>
    </AppModal>
  );
};