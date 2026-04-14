import { useEffect } from "react";
import { Form, Input, Modal } from "antd";
import type { IWard, IWardRequest } from "@/types";
import { ActionMode } from "@/types";

interface Props { open: boolean; mode: ActionMode; initialValues: IWard | null; confirmLoading?: boolean; onClose: () => void; onSave: (values: IWardRequest) => void; }

export const WardEditModal = ({ open, mode, initialValues, confirmLoading, onClose, onSave }: Props) => {
  const [form] = Form.useForm<IWardRequest>();

  useEffect(() => { open ? (initialValues ? form.setFieldsValue(initialValues) : form.resetFields()) : null; }, [open, initialValues, form]);

  return (
    <Modal title="Cập nhật Xã/Phường" open={open} onOk={() => form.validateFields().then(onSave)} onCancel={onClose} confirmLoading={confirmLoading} okText="Lưu lại" cancelText="Hủy">
      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item name="districtId" label="ID Quận/Huyện" rules={[{ required: true, message: "Trường bắt buộc" }]}><Input placeholder="Nhập ID Quận/Huyện" /></Form.Item>
        <Form.Item name="code" label="Mã Xã/Phường" rules={[{ required: true, message: "Trường bắt buộc" }]}><Input disabled placeholder="Mã xã" /></Form.Item>
        <Form.Item name="name" label="Tên Xã/Phường" rules={[{ required: true, message: "Trường bắt buộc" }]}><Input placeholder="Nhập tên xã" /></Form.Item>
      </Form>
    </Modal>
  );
};