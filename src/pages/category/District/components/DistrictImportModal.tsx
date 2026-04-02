import React, { useState } from 'react';
import { Modal, Form, Select, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import ExcelJS from 'exceljs';
import type { IDistrict } from '@/types/category'; 

const { Dragger } = Upload;

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: IDistrict[]) => void;
}

export const DistrictImportModal: React.FC<Props> = ({ open, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  // Hàm lấy giá trị ô an toàn (chống lỗi toString của null)
  const getSafeValue = (row: any, colIndex: number) => {
    const cell = row.getCell(colIndex);
    if (!cell || cell.value === null || cell.value === undefined) return "";
    if (typeof cell.value === 'object' && 'result' in cell.value) {
      return cell.value.result?.toString().trim() || "";
    }
    return cell.value.toString().trim();
  };

  const handleImport = async () => {
    try {
      const values = await form.validateFields();
      if (fileList.length === 0) return message.error('Vui lòng chọn file!');

      setUploading(true);
      const fileObj = fileList[0];
      const rawFile = (fileObj.originFileObj || fileObj) as unknown as File;
      
      const buffer = await rawFile.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(buffer);
      const worksheet = workbook.getWorksheet(1);

      const importedData: IDistrict[] = [];
      const timestamp = Date.now();

      // Ánh xạ ID tỉnh sang tên hiển thị
      const provinceMap: Record<string, string> = { 'HN': 'Hà Nội' };
      const selectedProvinceName = provinceMap[values.provinceId] || 'Hà Nội';

      worksheet?.eachRow((row, rowNumber) => {
        if (rowNumber > 1) { // Bỏ qua tiêu đề
          const code = getSafeValue(row, 1);
          const name = getSafeValue(row, 2);

          if (code !== "" && name !== "") {
            importedData.push({
              id: `dist-${timestamp}-${rowNumber}`,
              provinceName: selectedProvinceName,
              code: code,
              name: name,
            });
          }
        }
      });

      if (importedData.length === 0) {
        message.warning('File không có dữ liệu hợp lệ!');
      } else {
        onSuccess(importedData);
        message.success(`Đã import thành công ${importedData.length} Quận/Huyện!`);
        handleClose();
      }
    } catch (error) {
      message.error('Vui lòng chọn Tỉnh và file Excel đúng định dạng!');
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFileList([]);
    form.resetFields();
    onClose();
  };

  return (
    <Modal title="Import danh sách Huyện/ Thị xã" open={open} onOk={handleImport} confirmLoading={uploading} onCancel={handleClose} okText="Import">
      <Form form={form} layout="vertical">
        <Form.Item name="provinceId" label="Tỉnh/ Thành phố" rules={[{ required: true, message: 'Bắt buộc chọn Tỉnh!' }]}>
          <Select placeholder="-- Chọn Tỉnh/ Thành phố --">
            <Select.Option value="HN">Hà Nội</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="File import (.xlsx)" required>
          <Dragger 
            accept=".xlsx"
            beforeUpload={(file) => { setFileList([file]); return false; }} 
            fileList={fileList} 
            onRemove={() => setFileList([])}
            maxCount={1}
          >
            <p className="ant-upload-drag-icon"><InboxOutlined /></p>
            <p className="ant-upload-text">Nhấn hoặc kéo thả file vào đây</p>
          </Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
};