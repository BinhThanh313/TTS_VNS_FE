import React, { useState } from 'react';
import { Modal, Form, Select, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import ExcelJS from 'exceljs';
import type { IWard } from '../Ward'; // Đảm bảo import đúng interface

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: IWard[]) => void; // Thêm tham số data vào đây
}
const { Dragger } = Upload;
export const WardImportModal: React.FC<Props> = ({ open, onClose, onSuccess }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

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

    const importedData: IWard[] = [];
    const timestamp = Date.now();

    const districtMap: Record<string, string> = {
      'BD': 'Ba Đình',
      'CG': 'Cầu Giấy'
    };
    const selectedDistrictName = districtMap[values.districtId] || 'Không xác định';

    // --- HÀM LẤY GIÁ TRỊ Ô AN TOÀN ---
    const getSafeValue = (row: any, colIndex: number) => {
      const cell = row.getCell(colIndex);
      if (!cell || cell.value === null || cell.value === undefined) return "";
      
      // Nếu là ô chứa công thức, lấy kết quả của công thức
      if (typeof cell.value === 'object' && 'result' in cell.value) {
        return cell.value.result?.toString().trim() || "";
      }
      
      // Mọi trường hợp khác, chuyển về string và trim khoảng trắng
      return cell.value.toString().trim();
    };

    worksheet?.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // Bỏ qua tiêu đề
        // Sử dụng hàm getSafeValue thay vì gọi trực tiếp .text.toString()
        const maXa = getSafeValue(row, 1);
        const tenXa = getSafeValue(row, 2);

        // Chỉ thêm vào danh sách nếu cả 2 ô đều có dữ liệu
        if (maXa !== "" && tenXa !== "") {
          importedData.push({
            id: `ward-${timestamp}-${rowNumber}`,
            districtName: selectedDistrictName,
            code: maXa,
            name: tenXa,
          });
        }
      }
    });

    if (importedData.length === 0) {
      message.warning('File không có dữ liệu hoặc định dạng không đúng (Cột 1: Mã, Cột 2: Tên)!');
    } else {
      onSuccess(importedData);
      message.success(`Đã import thành công ${importedData.length} Xã/Phường!`);
      handleClose();
    }
  } catch (error) {
    console.error("Lỗi đọc file chi tiết:", error);
    message.error('Lỗi khi xử lý file Excel. Vui lòng kiểm tra lại định dạng!');
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
    <Modal 
      title="Import danh sách Xã/ Phường" 
      open={open} 
      onOk={handleImport} 
      onCancel={handleClose} 
      confirmLoading={uploading}
      okText="Import"
      cancelText="Hủy"
      destroyOnHidden // Hoặc dùng destroyOnHidden nếu Antd yêu cầu
    >
      <Form form={form} layout="vertical">
        <Form.Item 
          name="districtId" 
          label="Chọn Huyện/ Thị xã cần thêm" 
          rules={[{ required: true, message: 'Bắt buộc chọn Huyện!' }]}
        >
          <Select placeholder="-- Chọn Quận/Huyện --">
            <Select.Option value="BD">Ba Đình</Select.Option>
            <Select.Option value="CG">Cầu Giấy</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="File import (.xlsx)" required>
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
            <p className="ant-upload-text">Nhấn hoặc kéo thả file vào đây</p>
          </Dragger>
        </Form.Item>
      </Form>
    </Modal>
  );
};