import { useState } from "react";
import { Upload, message, Modal } from "antd";
import { Inbox } from "lucide-react";
import { parseDistrictExcel } from "@/utils";
import type { IDistrict } from "@/types";

export const DistrictImportModal = ({ open, onClose, onSuccess }: { open: boolean, onClose:()=>void, onSuccess: (data: IDistrict[])=>void }) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImport = async () => {
    if (!fileList.length) return message.error("Vui lòng chọn file!");
    setUploading(true);
    try {
      // Giả định import cho Tỉnh hiện tại (sau này chọn tỉnh cụ thể)
      const data = await parseDistrictExcel(fileList[0] as File, "Tỉnh Mặc Định");
      data.length ? onSuccess(data) : message.warning("Không có dữ liệu hợp lệ!");
    } catch { message.error("Lỗi đọc file!"); } finally { setUploading(false); }
  };

  return (
    <Modal title="Import Quận/Huyện" open={open} onOk={handleImport} confirmLoading={uploading} onCancel={() => { setFileList([]); onClose(); }} okText="Import">
      <div className="mt-4">
        <Upload.Dragger accept=".xlsx" maxCount={1} beforeUpload={(f) => { setFileList([f]); return false; }} onRemove={() => setFileList([])}>
          <p className="flex justify-center mb-2"><Inbox className="text-blue-500 w-10 h-10" /></p>
          <p>Kéo thả hoặc click để chọn file Excel</p>
        </Upload.Dragger>
      </div>
    </Modal>
  );
};