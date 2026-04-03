import React, { useState } from 'react';
import { Form, Select, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { AppModal } from '@/components/common';
import { parseDistrictExcel } from '../utils/excelParser';
import type { IDistrict } from '@/types/category'; 

const { Dragger } = Upload;
interface Props { open: boolean; onClose: () => void; onSuccess: (data: IDistrict[]) => void; }

export const DistrictImportModal: React.FC<Props> = ({ open, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImport = async () => {
    try {
      const values = await form.validateFields();
      if (fileList.length === 0) return message.error('Vui lòng chọn file!');
      setUploading(true);
      const rawFile = (fileList[0].originFileObj || fileList[0]) as unknown as File;
      const provinceMap: Record<string, string> = { 'HN': 'Hà Nội' };
      const data = await parseDistrictExcel(rawFile, provinceMap[values.provinceId] || 'Hà Nội');

      if (data.length === 0) { message.warning('File không có dữ liệu hợp lệ!'); } 
      else { onSuccess(data); message.success('Import thành công!'); handleClose(); }
    } catch (error) { message.error('Lỗi định dạng!'); } finally { setUploading(false); }
  };

  const handleClose = () => { setFileList([]); form.resetFields(); onClose(); };

  return (
    <AppModal title="Import danh sách Huyện/ Thị xã" open={open} onOk={handleImport} confirmLoading={uploading} onCancel={handleClose} okText="Import">
      <Form form={form} layout="vertical">
        <Form.Item name="provinceId" label="Tỉnh/ Thành phố" rules={[{ required: true }]}><Select><Select.Option value="HN">Hà Nội</Select.Option></Select></Form.Item>
        <Form.Item label="File import (.xlsx)" required>
          <Dragger accept=".xlsx" maxCount={1} beforeUpload={(file) => { setFileList([file]); return false; }} fileList={fileList} onRemove={() => setFileList([])}>
            <p className="ant-upload-drag-icon"><InboxOutlined /></p>
            <p className="ant-upload-text">Nhấn hoặc kéo thả file</p>
          </Dragger>
        </Form.Item>
      </Form>
    </AppModal>
  );
};