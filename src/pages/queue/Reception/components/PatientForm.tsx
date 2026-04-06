// src/pages/queue/Reception/components/PatientForm.tsx
import React from 'react';
import { Form, Input, Button } from 'antd';

interface Props {
  onSubmit: (name: string) => void;
}

export const PatientForm: React.FC<Props> = ({ onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: { name: string }) => {
    onSubmit(values.name);
    form.resetFields(); // Nhập xong tự xóa text
  };

  return (
    <Form form={form} onFinish={handleFinish} layout="vertical">
      <Form.Item 
        name="name" 
        label="Họ và tên bệnh nhân" 
        rules={[{ required: true, message: 'Vui lòng nhập tên bệnh nhân!' }]}
      >
        <Input placeholder="Vd: Nguyễn Văn A" size="large" />
      </Form.Item>
      <Button type="primary" htmlType="submit" size="large" block>
        CẤP SỐ THỨ TỰ
      </Button>
    </Form>
  );
};