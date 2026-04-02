import React, { useState } from 'react';
import { Modal, Form, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import ExcelJS from 'exceljs';
import type { IProvince } from '../Province'; // Import interface từ file Province

const { Dragger } = Upload;

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: IProvince[]) => void;
}

export const ProvinceImportModal: React.FC<Props> = ({ open, onClose, onSuccess }) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImport = async () => {
  if (fileList.length === 0) return message.error('Vui lòng chọn file!');
  
  setUploading(true);
  try {
    // 1. Lấy file object một cách an toàn
    const fileObj = fileList[0];
    
    // Kiểm tra xem file thực sự nằm ở đâu (đôi khi là originFileObj, đôi khi là chính nó)
    const rawFile = (fileObj.originFileObj || fileObj) as unknown as File;

    // 2. Kiểm tra lại lần nữa xem rawFile có tồn tại và có phải là Blob/File không
    if (!rawFile || typeof rawFile.arrayBuffer !== 'function') {
      console.error("File object không hợp lệ:", rawFile);
      message.error('Dữ liệu file không hợp lệ, vui lòng chọn lại file!');
      setUploading(false);
      return;
    }

    // 3. Tiến hành đọc buffer
    const buffer = await rawFile.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);
    
    const worksheet = workbook.getWorksheet(1);
    const importedData: IProvince[] = [];

    // Hàm lấy giá trị ô an toàn, tránh lỗi .text hay .value bị undefined
    const getCellValue = (row: any, colIndex: number) => {
      const cell = row.getCell(colIndex);
      if (!cell || cell.value === null || cell.value === undefined) return "";
      if (typeof cell.value === 'object') {
        return (cell.value as any).result || cell.text || "";
      }
      return cell.value.toString().trim();
    };

    worksheet?.eachRow((row, rowNumber) => {
      // Chỉ đọc từ dòng thứ 2 (bỏ qua tiêu đề)
      if (rowNumber > 1) { 
        const maTinh = getCellValue(row, 1); // Cột A
        const tenTinh = getCellValue(row, 2); // Cột B
        
        if (maTinh && tenTinh) {
          importedData.push({
            id: `temp-${Date.now()}-${rowNumber}`,
            maTinh: maTinh,
            tenTinh: tenTinh
          });
        }
      }
    });

    if (importedData.length === 0) {
      message.warning('Không tìm thấy dữ liệu hợp lệ. Hãy kiểm tra lại file!');
    } else {
      onSuccess(importedData);
      message.success(`Đã đọc xong ${importedData.length} dòng dữ liệu!`);
      onClose();
      setFileList([]);
    }
  } catch (error) {
    // In lỗi ra Console để chúng ta biết chính xác nó chết ở đâu
    console.error("Lỗi đọc file chi tiết:", error);
    message.error('Không thể đọc file Excel này. Vui lòng thử lại!');
  } finally {
    setUploading(false);
  }
};

  return (
    <Modal 
      title="Import danh sách Tỉnh/ Thành phố" 
      open={open} 
      onOk={handleImport} 
      confirmLoading={uploading}
      onCancel={onClose} 
      okText="Import"
      cancelText="Hủy"
      destroyOnHidden
    >
      <div style={{ marginTop: 10 }}>
        <p style={{ marginBottom: 15 }}>Vui lòng chọn file .xlsx đúng định dạng template.</p>
        <Dragger 
          accept=".xlsx"
          maxCount={1}
          beforeUpload={(file) => {
            setFileList([file]);
            return false;
          }}
          fileList={fileList}
          onRemove={() => setFileList([])}
        >
          <p className="ant-upload-drag-icon"><InboxOutlined /></p>
          <p className="ant-upload-text">Kéo thả file vào đây hoặc click để chọn file</p>
        </Dragger>
      </div>
    </Modal>
  );
};