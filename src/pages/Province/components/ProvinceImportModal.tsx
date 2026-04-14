import { useState } from "react";
import { Upload, message } from "antd";
import { Inbox } from "lucide-react";
import { AppModal } from "@/components/common"; // ← Đổi từ Modal antd sang AppModal
import { parseProvinceExcel } from "@/utils";
import type { IProvince } from "@/types";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: (data: IProvince[]) => void;
}

export const ProvinceImportModal = ({ open, onClose, onSuccess }: Props) => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleImport = async () => {
    if (!fileList.length) {
      message.error("Vui lòng chọn file!");
      return;
    }
    setUploading(true);
    try {
      const data = await parseProvinceExcel(fileList[0]);
      if (data.length) {
        onSuccess(data);
      } else {
        message.warning("Không có dữ liệu hợp lệ!");
      }
    } catch {
      message.error("Lỗi đọc file!");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setFileList([]);
    onClose();
  };

  return (
    <AppModal  
      title="Import Tỉnh/Thành phố"
      open={open}
      onOk={handleImport}
      confirmLoading={uploading}
      onCancel={handleClose}
      okText="Import"
    >
      <div className="mt-4">
        <Upload.Dragger
          accept=".xlsx"
          maxCount={1}
          beforeUpload={(f) => {
            setFileList([f]);
            return false;
          }}
          onRemove={() => setFileList([])}
        >
          {/* className="flex justify-center mb-2" đã là Tailwind - giữ nguyên */}
          <p className="flex justify-center mb-2">
            <Inbox className="text-blue-500 w-10 h-10" />
          </p>
          <p>Kéo thả hoặc click để chọn file Excel</p>
        </Upload.Dragger>
      </div>
    </AppModal>
  );
};