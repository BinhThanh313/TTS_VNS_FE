import { useState } from "react";
import { Upload, message, Modal } from "antd";
import { Inbox } from "lucide-react";
// 1. Đổi import thành parseWardExcel
import { parseWardExcel } from "@/utils"; 
import type { IWard } from "@/types";

export const WardImportModal = ({ open, onClose, onSuccess }: { open: boolean, onClose:()=>void, onSuccess: (data: IWard[])=>void }) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImport = async () => {
    if (!fileList.length) return message.error("Vui lòng chọn file!");
    setUploading(true);
    try {
      // 2. Gọi parseWardExcel và truyền vào Huyện giả định
      const data = await parseWardExcel(fileList[0] as File, "Huyện Mặc Định");
      data.length ? onSuccess(data) : message.warning("Không có dữ liệu hợp lệ!");
    } catch { 
      message.error("Lỗi đọc file!"); 
    } finally { 
      setUploading(false); 
    }
  };

  return (
    // 3. Đổi title thành "Import Xã/Phường"
    <Modal title="Import Xã/Phường" open={open} onOk={handleImport} confirmLoading={uploading} onCancel={() => { setFileList([]); onClose(); }} okText="Import">
      <div className="mt-4">
        <Upload.Dragger accept=".xlsx" maxCount={1} beforeUpload={(f) => { setFileList([f]); return false; }} onRemove={() => setFileList([])}>
          <p className="flex justify-center mb-2"><Inbox className="text-blue-500 w-10 h-10" /></p>
          <p>Kéo thả hoặc click để chọn file Excel</p>
        </Upload.Dragger>
      </div>
    </Modal>
  );
};