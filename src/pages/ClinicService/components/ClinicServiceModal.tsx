import React, { useEffect } from 'react';
import { Form, Input, Select, Row, Col, Checkbox, message, Space } from 'antd';
import type { IClinicService } from '@/types';
import { ActionMode } from '@/types';
import { BHYTFormSection } from './BHYTFormSection';
import { Save, RotateCcw, X } from 'lucide-react';
import { AppModal, AppButton } from '@/components/common';

interface Props {
  open: boolean;
  mode: ActionMode;
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
  const isEdit = mode === ActionMode.UPDATE;

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
    } catch (error) {
      message.error('Vui lòng điền đầy đủ thông tin bắt buộc!');
    }
  };

  const CustomTitle = (
    <div className="flex justify-between items-center w-full pr-6">
      <span className="font-semibold text-lg">
        {isEdit ? "Cập nhật Dịch vụ phòng khám" : "Thêm mới Dịch vụ phòng khám"}
      </span>
      <Space>
        <AppButton type="primary" icon={<Save size={16} />} onClick={handleOk}>Đồng ý</AppButton>
        <AppButton icon={<RotateCcw size={16} />} onClick={() => form.resetFields()}>Làm mới</AppButton>
        <AppButton type="primary" danger icon={<X size={16} />} onClick={onClose}>Thoát</AppButton>
      </Space>
    </div>
  );

  return (
    <AppModal
      title={CustomTitle} open={open} onCancel={onClose} width={1000} footer={null} closable={false} centered
    >
      <Form form={form} layout="vertical" className="mt-4">
        <Row gutter={16}>
          <Col span={8}><Form.Item name="tenDichVu" label="Tên dịch vụ" rules={[{ required: true }]}><Input maxLength={250} /></Form.Item></Col>
          <Col span={8}><Form.Item name="maDichVu" label="Mã dịch vụ" rules={[{ required: true, message: 'Bắt buộc nhập' }, { pattern: /^\S+$/, message: 'Mã dịch vụ không được chứa khoảng trắng' }]}><Input disabled={isEdit} maxLength={25} /></Form.Item></Col>
          <Col span={8}><Form.Item name="loaiDichVu" label="Loại dịch vụ" rules={[{ required: true }]}><Select options={[{ value: 'CAN_LAM_SANG', label: 'Cận lâm sàng' }]} /></Form.Item></Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}><Form.Item name="nhomDichVu" label="Nhóm dịch vụ" rules={[{ required: true }]}><Select options={[{ value: 'XET_NGHIEM', label: 'Xét nghiệm' }]} /></Form.Item></Col>
          <Col span={8}><Form.Item name="chiTietNhomDichVu" label="Chi tiết nhóm dịch vụ"><Select /></Form.Item></Col>
          <Col span={8}><Form.Item name="donViTinh" label="ĐVT" rules={[{ required: true }]}><Select options={[{ value: 'LAN', label: 'Lần' }]} /></Form.Item></Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}><Form.Item name="maDVBHYT" label="Mã DV BHYT"><Input maxLength={25} /></Form.Item></Col>
          <Col span={8}><Form.Item name="tenDVBHYT" label="Tên DV BHYT"><Input maxLength={250} /></Form.Item> </Col>
          <Col span={8}><Form.Item name="loaiPTTT" label="Loại PT - TT"><Select showSearch placeholder="Chọn" /></Form.Item></Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}><Form.Item name="coSo" label="Cơ sở"><Select showSearch placeholder="Chọn" /></Form.Item></Col>
          <Col span={8}><Form.Item name="nhomDVBHYT" label="Nhóm dịch vụ BHYT"><Select showSearch placeholder="Chọn" /></Form.Item></Col>
        </Row>
        <Row gutter={16} className="mb-3">
          {CHECKBOX_OPTIONS.map(item => (
            <Col span={4} key={item.name}><Form.Item name={item.name} valuePropName="checked" noStyle><Checkbox>{item.label}</Checkbox></Form.Item></Col>
          ))}
        </Row>
        <BHYTFormSection form={form} />
      </Form>
    </AppModal>
  );
};