// src\pages\Ward\components\WardImportModal.tsx
import { useState, useMemo } from "react";
import { Upload, message, Modal, Select } from "antd";
import { Inbox } from "lucide-react";
import { parseWardExcel } from "@/utils";
import type { IWard } from "@/types";
import { useProvinceList, useDistrictList } from "@/hooks";

export const WardImportModal = ({ open, onClose, onSuccess }: { open: boolean, onClose:()=>void, onSuccess: (data: IWard[])=>void }) => {
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [provinceId, setProvinceId] = useState<string | undefined>(undefined);
  const [districtId, setDistrictId] = useState<string | undefined>(undefined);

  // Lấy data Tỉnh và Huyện
  const { data: provinceData } = useProvinceList({ pageSize: 1000 });
  const { data: districtData } = useDistrictList({ provinceId, pageSize: 1000 });

  const provinceOptions = useMemo(() => provinceData?.data?.map(p => ({ label: p.tenTinh, value: p.id })) || [], [provinceData]);
  const districtOptions = useMemo(() => districtData?.data?.map(d => ({ label: d.name, value: d.id })) || [], [districtData]);

  const handleImport = async () => {
    if (!districtId) return message.error("Vui lòng chọn Quận/Huyện trước khi Import!");
    if (!fileList.length) return message.error("Vui lòng chọn file Excel/CSV!");
    
    // Tìm tên Huyện tương ứng
    const selectedDistrict = districtOptions.find(d => d.value === districtId);

    setUploading(true);
    try {
      // Truyền đúng tên Huyện đã chọn vào hàm parse
      const data = await parseWardExcel(fileList[0] as File, selectedDistrict?.label || "Không rõ");
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
    setDistrictId(undefined);
    onClose();
  };

  return (
    <Modal title="Import Xã/Phường" open={open} onOk={handleImport} confirmLoading={uploading} onCancel={handleClose} okText="Import">
      <div className="mt-4 flex flex-col gap-4">
        
        {/* Dropdown Tỉnh -> Huyện */}
        <div className="flex gap-4">
            <div className="flex-1">
               <div className="text-[13px] text-gray-800 font-medium mb-1.5">Tỉnh/ Thành phố</div>
               <Select 
                 showSearch allowClear placeholder="Chọn Tỉnh" options={provinceOptions} value={provinceId} 
                 onChange={(val) => { setProvinceId(val); setDistrictId(undefined); }} // Đổi tỉnh thì xóa trắng huyện đã chọn
                 filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())} className="w-full" 
               />
            </div>
            <div className="flex-1">
               <div className="text-[13px] text-gray-800 font-medium mb-1.5">Quận/ Huyện <span className="text-red-500">*</span></div>
               <Select 
                 showSearch allowClear placeholder="Chọn Huyện" options={districtOptions} value={districtId} 
                 disabled={!provinceId} onChange={setDistrictId} 
                 filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())} className="w-full" 
               />
            </div>
        </div>

        {/* Upload File */}
        <Upload.Dragger accept=".xls,.xlsx,.csv" maxCount={1} beforeUpload={(f) => { setFileList([f]); return false; }} onRemove={() => setFileList([])} fileList={fileList}>
          <p className="flex justify-center mb-2"><Inbox className="text-blue-500 w-10 h-10" /></p>
          <p>Kéo thả hoặc click để chọn file Excel/CSV</p>
        </Upload.Dragger>

      </div>
    </Modal>
  );
};