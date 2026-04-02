import React, { useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import type { IProvince } from '@/types/category'; 

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (values: IProvince) => void;
  initialValues: IProvince | null; // Dữ liệu của dòng đang chọn để sửa
}

export const ProvinceEditModal: React.FC<Props> = ({ open, onClose, onSave, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open && initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [open, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave({ ...initialValues, ...values }); // Gửi dữ liệu đã sửa về trang chính
      onClose();
    } catch (error) {
      console.error('Validate failed:', error);
    }
  };

  return (
    <Modal
      title="Cập nhật Tỉnh/ Thành phố"
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      okText="Lưu lại"
      cancelText="Hủy"
      destroyOnHidden
    >
      <Form form={form} layout="vertical" name="edit_province">
        <Form.Item
          name="maTinh"
          label="Mã Tỉnh/ TP"
          rules={[{ required: true, message: 'Vui lòng nhập mã!' }]}
        >
          <Input disabled /> {/* Mã thường không cho sửa hoặc để readonly */}
        </Form.Item>
        <Form.Item
          name="tenTinh"
          label="Tên Tỉnh/ TP"
          rules={[
            { required: true, message: 'Vui lòng nhập tên!' },
            { max: 250, message: 'Tối đa 250 ký tự' }
          ]}
        >
          <Input placeholder="Nhập tên Tỉnh/ TP" />
        </Form.Item>
      </Form>
    </Modal>
  );
};