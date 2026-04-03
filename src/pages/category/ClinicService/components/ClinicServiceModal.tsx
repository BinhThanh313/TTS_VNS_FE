import React, { useEffect } from 'react';
import { Form, Input, Select, Row, Col, Checkbox, message } from 'antd';
import type { IClinicService } from '@/types/category';
import { BHYTFormSection } from './BHYTFormSection';
import { AppModal } from '@/components/common'; // Import từ common

interface Props {
  open: boolean;
  mode: 'create' | 'edit';
  initialValues: IClinicService | null;
  onClose: () => void;
  onSave: (values: any) => void;
}

const CHECKBOX_OPTIONS = [
  { name: 'chiDinhTrung', label: 'Chỉ định trùng' },
  { name: 'ngungSuDung', label: 'Ngưng sử dụng' },
  { name: 'kyThuatCao', label: 'Kỹ thuật cao' },
  { name: 'batBuocNhapTT', label: 'Bắt buộc nhập TT' },
  { name: 'ngoaiTru', label: 'Ngoại trú' },
  { name: 'noiTru', label: 'Nội trú' },
];

export const ClinicServiceModal: React.FC<Props> = ({ open, mode, initialValues, onClose, onSave }) => {
  const [form] = Form.useForm();
  const isEdit = mode === 'edit';

  useEffect(() => {
    if (open) {
      if (isEdit && initialValues) {
        form.setFieldsValue(initialValues);
      } else {
        form.setFieldsValue({ ngoaiTru: true, moGiaBHYT: false });
      }
    }
  }, [open, isEdit, initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave(values);
      onClose();
    } catch (error) {
      message.error('Vui lòng điền đầy đủ thông tin bắt buộc!');
    }
  };

  return (
    <AppModal
      title={isEdit ? "Cập nhật Dịch vụ phòng khám" : "Thêm mới Dịch vụ phòng khám"}
      open={open}
      onOk={handleOk}
      onCancel={onClose}
      width={1000} 
      okText="Lưu"
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={8}><Form.Item name="tenDichVu" label="Tên dịch vụ" rules={[{ required: true }]}><Input maxLength={250} /></Form.Item></Col>
          <Col span={8}><Form.Item name="maDichVu" label="Mã dịch vụ" rules={[{ required: true }]}><Input disabled={isEdit} maxLength={25} /></Form.Item></Col>
          <Col span={8}><Form.Item name="loaiDichVu" label="Loại dịch vụ" rules={[{ required: true }]}><Select options={[{ value: 'CAN_LAM_SANG', label: 'Cận lâm sàng' }]} /></Form.Item></Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}><Form.Item name="nhomDichVu" label="Nhóm dịch vụ" rules={[{ required: true }]}><Select options={[{ value: 'XET_NGHIEM', label: 'Xét nghiệm' }]} /></Form.Item></Col>
          <Col span={8}><Form.Item name="chiTietNhomDichVu" label="Chi tiết nhóm dịch vụ"><Select /></Form.Item></Col>
          <Col span={8}><Form.Item name="donViTinh" label="ĐVT" rules={[{ required: true }]}><Select options={[{ value: 'LAN', label: 'Lần' }]} /></Form.Item></Col>
        </Row>
        <Row gutter={16}>
          {CHECKBOX_OPTIONS.map(item => (
            <Col span={4} key={item.name}><Form.Item name={item.name} valuePropName="checked"><Checkbox>{item.label}</Checkbox></Form.Item></Col>
          ))}
        </Row>
        <BHYTFormSection form={form} />
      </Form>
    </AppModal>
  );
};