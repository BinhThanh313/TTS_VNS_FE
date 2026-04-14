// Không thay đổi gì, file này đã đúng
import { useEffect } from "react";
import { Form, Input, Modal } from "antd";
import type { IProvince, IProvinceRequest, ActionMode } from "@/types";
import { ActionMode as AM } from "@/types";

interface Props {
  open: boolean;
  mode: ActionMode;
  initialValues: IProvince | null;
  confirmLoading?: boolean;
  onClose: () => void;
  onSave: (values: IProvinceRequest) => void;
}

export const ProvinceEditModal = ({
  open,
  mode,
  initialValues,
  confirmLoading,
  onClose,
  onSave,
}: Props) => {
  const [form] = Form.useForm<IProvinceRequest>();
  const isDisabled = mode === AM.VIEW;

  useEffect(() => {
    if (open) {
      initialValues ? form.setFieldsValue(initialValues) : form.resetFields();
    }
  }, [open, initialValues, form]);

  return (
    <Modal
      title={
        mode === AM.CREATE
          ? "Thêm mới Tỉnh/TP"
          : mode === AM.UPDATE
          ? "Cập nhật Tỉnh/TP"
          : "Xem Tỉnh/TP"
      }
      open={open}
      onOk={() => {
        if (!isDisabled) form.validateFields().then(onSave);
        else onClose();
      }}
      onCancel={onClose}
      confirmLoading={confirmLoading}
      okText={isDisabled ? "Đóng" : "Lưu lại"}
      cancelText={isDisabled ? undefined : "Hủy"}
    >
      <Form form={form} layout="vertical" className="mt-4">
        <Form.Item
          name="maTinh"
          label="Mã Tỉnh/TP"
          rules={[{ required: !isDisabled, message: "Trường bắt buộc" }]}
        >
          <Input disabled={mode !== AM.CREATE} />
        </Form.Item>
        <Form.Item
          name="tenTinh"
          label="Tên Tỉnh/TP"
          rules={[{ required: !isDisabled, message: "Trường bắt buộc" }]}
        >
          <Input disabled={isDisabled} />
        </Form.Item>
      </Form>
    </Modal>
  );
};