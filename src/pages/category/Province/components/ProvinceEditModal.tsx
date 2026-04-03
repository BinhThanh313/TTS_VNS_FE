import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { AppModal } from '@/components/common';
import type { IProvince } from '@/types/category'; 

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (values: IProvince) => void;
  initialValues: IProvince | null;
}

export const ProvinceEditModal: React.FC<Props> = ({ open, onClose, onSave, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && initialValues) form.setFieldsValue(initialValues);
  }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave({ ...initialValues, ...values } as IProvince); 
      onClose();
    } catch (error) {}
  };

  return (
    <AppModal title="Cập nhật Tỉnh/ Thành phố" open={open} onOk={handleOk} onCancel={onClose} okText="Lưu lại">
      <Form form={form} layout="vertical">
        <Form.Item name="maTinh" label="Mã Tỉnh/ TP" rules={[{ required: true }]}><Input disabled /></Form.Item>
        <Form.Item name="tenTinh" label="Tên Tỉnh/ TP" rules={[{ required: true }, { max: 250 }]}><Input placeholder="Nhập tên" /></Form.Item>
      </Form>
    </AppModal>
  );
};