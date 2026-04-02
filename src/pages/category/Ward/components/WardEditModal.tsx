import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import type { IWard } from '@/types/category'; 

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (values: IWard) => void;
  initialValues: IWard | null;
}

export const WardEditModal: React.FC<Props> = ({ open, onClose, onSave, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    const values = await form.validateFields();
    onSave({ ...initialValues, ...values });
    onClose();
  };

  return (
    <Modal title="Cập nhật Xã/ Phường" open={open} onOk={handleOk} onCancel={onClose} destroyOnClose>
      <Form form={form} layout="vertical">
        <Form.Item name="districtName" label="Quận/ Huyện" rules={[{ required: true }]}>
          <Select placeholder="Chọn Quận/ Huyện">
            <Select.Option value="Ba Đình">Ba Đình</Select.Option>
            <Select.Option value="Cầu Giấy">Cầu Giấy</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item 
          name="code" 
          label="Mã Xã/ Phường" 
          rules={[{ required: true }, { pattern: /^[0-9]{1,6}$/, message: 'Tối đa 6 số' }]} // 
        >
          <Input disabled />
        </Form.Item>
        <Form.Item 
          name="name" 
          label="Tên Xã/ Phường" 
          rules={[{ required: true }, { max: 250, message: 'Tối đa 250 ký tự' }]} // 
        >
          <Input placeholder="Nhập tên xã/phường" />
        </Form.Item>
      </Form>
    </Modal>
  );
};