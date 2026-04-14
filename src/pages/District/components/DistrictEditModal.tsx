import { useEffect } from "react";
import { Form, Input, Modal } from "antd";
import type { IDistrict, IDistrictRequest } from "@/types";
import { ActionMode } from "@/types";

interface Props { open: boolean; mode: ActionMode; initialValues: IDistrict | null; confirmLoading?: boolean; onClose: () => void; onSave: (values: IDistrictRequest) => void; }

export const DistrictEditModal = ({ open, mode, initialValues, confirmLoading, onClose, onSave }: Props) => {
  const [form] = Form.useForm<IDistrictRequest>();
  const isDisabled = mode === ActionMode.VIEW;

  useEffect(() => { open ? (initialValues ? form.setFieldsValue(initialValues) : form.resetFields()) : null; }, [open, initialValues, form]);

  return (
    <Modal title={mode === ActionMode.CREATE ? "Thêm mới Quận/Huyện" : mode === ActionMode.UPDATE ? "Cập nhật Quận/Huyện" : "Xem Quận/Huyện"} open={open} onOk={() => { if(!isDisabled) form.validateFields().then(onSave) }} onCancel={onClose} confirmLoading={confirmLoading} okText={isDisabled ? "Đóng" : "Lưu lại"} cancelText={isDisabled ? undefined : "Hủy"}>
      <Form form={form} layout="vertical" className="mt-4">
        {/* Tương lai thêm Select Tỉnh ở đây. Hiện tại dùng Input tạm */}
        <Form.Item name="provinceId" label="ID Tỉnh/TP" rules={[{ required: !isDisabled, message: "Trường bắt buộc" }]}><Input disabled={isDisabled} placeholder="Nhập ID tỉnh" /></Form.Item>
        <Form.Item name="code" label="Mã Quận/Huyện" rules={[{ required: !isDisabled, message: "Trường bắt buộc" }]}><Input disabled={mode !== ActionMode.CREATE} placeholder="Nhập mã" /></Form.Item>
        <Form.Item name="name" label="Tên Quận/Huyện" rules={[{ required: !isDisabled, message: "Trường bắt buộc" }]}><Input disabled={isDisabled} placeholder="Nhập tên" /></Form.Item>
      </Form>
    </Modal>
  );
};