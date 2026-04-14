import { useState, useMemo } from "react";
import { Upload, message, Modal, Select } from "antd";
import { Inbox } from "lucide-react";
import { parseDistrictExcel } from "@/utils";
import type { IDistrict } from "@/types";
import { useProvinceList } from "@/hooks"; // Hook lấy danh sách Tỉnh

export const DistrictImportModal = ({ open, onClose, onSuccess }: { open: boolean, onClose:()=>void, onSuccess: (data: IDistrict[])=>void }) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [provinceId, setProvinceId] = useState<string | undefined>(undefined);

  // Gọi API lấy danh sách Tỉnh để đổ vào Dropdown
  const { data: provinceData } = useProvinceList({ pageSize: 1000 });
  const provinceOptions = useMemo(() => provinceData?.data?.map(p => ({ label: p.tenTinh, value: p.id })) || [], [provinceData]);

  const handleImport = async () => {
    if (!provinceId) return message.error("Vui lòng chọn Tỉnh/Thành phố trước khi Import!");
    if (!fileList.length) return message.error("Vui lòng chọn file Excel/CSV!");
    
    // Tìm tên Tỉnh tương ứng với ID vừa chọn
    const selectedProvince = provinceOptions.find(p => p.value === provinceId);

    setUploading(true);
    try {
      // Truyền đúng tên Tỉnh đã chọn vào hàm parse
      const data = await parseDistrictExcel(fileList[0] as File, selectedProvince?.label || "Không rõ");
      data.length ? onSuccess(data) : message.warning("Không có dữ liệu hợp lệ!");
    } catch { 
      message.error("Lỗi đọc file!"); 
    } finally { 
      setUploading(false); 
    }
  };

  const handleClose = () => {
    setFileList([]);
    setProvinceId(undefined);
    onClose();
  };

  return (
    <Modal title="Import Huyện/Thị xã" open={open} onOk={handleImport} confirmLoading={uploading} onCancel={handleClose} okText="Import">
      <div className="mt-4 flex flex-col gap-4">
        {/* Dropdown bắt buộc chọn Tỉnh */}
        <div>
           <div className="text-[13px] text-gray-800 font-medium mb-1.5">Tỉnh/ Thành phố <span className="text-red-500">*</span></div>
           <Select 
             showSearch allowClear placeholder="Chọn Tỉnh/TP áp dụng cho dữ liệu trong file" 
             options={provinceOptions} value={provinceId} onChange={setProvinceId} 
             filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())} 
             className="w-full" 
           />
        </div>

        {/* Upload File */}
        <Upload.Dragger accept=".xls,.xlsx,.csv" maxCount={1} beforeUpload={(f) => { setFileList([f]); return false; }} onRemove={() => setFileList([])} fileList={fileList}>
          <p className="flex justify-center mb-2"><Inbox className="text-blue-500 w-10 h-10" /></p>
          <p>Kéo thả hoặc click để chọn file</p>
        </Upload.Dragger>
      </div>
    </Modal>
  );
};