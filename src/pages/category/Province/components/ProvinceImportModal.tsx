import React, { useState } from 'react';
import { Form, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { AppModal } from '@/components/common';
import { parseProvinceExcel } from '../utils/excelParser';
import type { IProvince } from '@/types/category'; 

const { Dragger } = Upload;

interface Props { open: boolean; onClose: () => void; onSuccess: (data: IProvince[]) => void; }

export const ProvinceImportModal: React.FC<Props> = ({ open, onClose, onSuccess }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImport = async () => {
    if (fileList.length === 0) return message.error('Vui lòng chọn file!');
    setUploading(true);
    try {
      const rawFile = (fileList[0].originFileObj || fileList[0]) as unknown as File;
      const importedData = await parseProvinceExcel(rawFile);
      if (importedData.length === 0) {
        message.warning('Không tìm thấy dữ liệu hợp lệ!');
      } else {
        onSuccess(importedData);
        message.success(`Đã import ${importedData.length} bản ghi!`);
        handleClose();
      }
    } catch (error) { message.error('Lỗi đọc file!'); } finally { setUploading(false); }
  };

  const handleClose = () => { setFileList([]); onClose(); };

  return (
    <AppModal title="Import danh sách Tỉnh/ Thành phố" open={open} onOk={handleImport} confirmLoading={uploading} onCancel={handleClose} okText="Import">
      <div style={{ marginTop: 10 }}>
        <p style={{ marginBottom: 15 }}>Vui lòng chọn file .xlsx đúng định dạng template.</p>
        <Dragger accept=".xlsx" maxCount={1} beforeUpload={(file) => { setFileList([file]); return false; }} fileList={fileList} onRemove={() => setFileList([])}>
          <p className="ant-upload-drag-icon"><InboxOutlined /></p>
          <p className="ant-upload-text">Kéo thả file vào đây hoặc click để chọn</p>
        </Dragger>
      </div>
    </AppModal>
  );
};