import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import type { IDistrict } from '@/types/category'; 

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (values: IDistrict) => void;
  initialValues: IDistrict | null;
}

export const DistrictEditModal: React.FC<Props> = ({ open, onClose, onSave, initialValues }) => {
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
    <Modal
      title="Cập nhật Huyện/ Thị xã"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      destroyOnClose
    >
      <Form form={form} layout="vertical">
        <Form.Item name="provinceName" label="Tỉnh/ Thành phố" rules={[{ required: true }]}>
          <Select placeholder="Chọn Tỉnh/ TP">
            <Select.Option value="Hà Nội">Hà Nội</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item 
          name="code" 
          label="Mã Huyện/ Thị xã" 
          rules={[
            { required: true, message: 'Mã là bắt buộc' },
            { pattern: /^[0-9]{1,6}$/, message: 'Tối đa 6 số nguyên dương' } // 
          ]}
        >
          <Input placeholder="Nhập mã" disabled />
        </Form.Item>
        <Form.Item 
          name="name" 
          label="Tên Huyện/ Thị xã" 
          rules={[
            { required: true, message: 'Tên là bắt buộc' },
            { max: 250, message: 'Tối đa 250 ký tự' } // 
          ]}
        >
          <Input placeholder="Nhập tên" />
        </Form.Item>
      </Form>
    </Modal>
  );
};