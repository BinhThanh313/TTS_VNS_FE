import React, { useEffect } from 'react';
import { Form, Input, Select, Row, Col, Checkbox, message, Space } from 'antd';
import type { IClinicService } from '@/types/category';
import { BHYTFormSection } from './BHYTFormSection';
import { SaveOutlined, ReloadOutlined, CloseOutlined } from '@ant-design/icons'; // Các icon theo ảnh
import { AppModal, AppButton } from '@/components/common'; 

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

  // 1. Cập nhật thứ tự nút: Đồng ý (Blue), Làm mới (White), Thoát (Blue) và thêm Icon
  const CustomTitle = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <span style={{ fontWeight: 600 }}>
        {isEdit ? "Cập nhật Dịch vụ phòng khám" : "Thêm mới Dịch vụ phòng khám"}
      </span>
      <Space>
        <AppButton type="primary" icon={<SaveOutlined />} onClick={handleOk}>
          Đồng ý
        </AppButton>
        <AppButton icon={<ReloadOutlined />} onClick={() => form.resetFields()}>
          Làm mới
        </AppButton>
        <AppButton type="primary" icon={<CloseOutlined />} onClick={onClose}>
          Thoát
        </AppButton>
      </Space>
    </div>
  );

  return (
    <AppModal
      title={CustomTitle}
      open={open}
      onCancel={onClose}
      width={1000} 
      footer={null}
      closable={false}
      centered
    >
      <Form form={form} layout="vertical" style={{ marginTop: 10 }}>
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
        <Row gutter={16} style={{ marginBottom: 12 }}>
          {CHECKBOX_OPTIONS.map(item => (
            <Col span={4} key={item.name}><Form.Item name={item.name} valuePropName="checked" noStyle><Checkbox>{item.label}</Checkbox></Form.Item></Col>
          ))}
        </Row>
        <BHYTFormSection form={form} />
      </Form>
    </AppModal>
  );
};