import { useState } from "react";
import { Input } from "antd";
import { Search, Upload } from "lucide-react";
import { AppButton } from "@/components/common"; 
import type { IProvinceSearchParams } from "@/types";

interface Props {
  onSearch: (params: IProvinceSearchParams) => void;
  onImport: () => void;
}

export const ProvinceSearchForm = ({ onSearch, onImport }: Props) => {
  const [tenTinh, setTenTinh] = useState("");
  const [maTinh, setMaTinh] = useState("");

  const handleSearch = () =>
    onSearch({ tenTinh: tenTinh || undefined, maTinh: maTinh || undefined });

  return (
    <div className="flex justify-between items-end mb-6">
      <div className="flex gap-6">
        <div>
          <div className="text-sm font-medium text-gray-700 mb-1.5">Tên tỉnh/TP</div>
           <Input placeholder="Nhập tên tỉnh/TP" value={tenTinh} onChange={(e) => setTenTinh(e.target.value)} onPressEnter={handleSearch} allowClear className="!w-64" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-700 mb-1.5">Mã tỉnh/TP</div>
          <Input placeholder="Nhập mã (Tối đa 6 số)" maxLength={6} value={maTinh} onChange={(e) => setMaTinh(e.target.value)} onPressEnter={handleSearch} allowClear className="!w-64" />
        </div>
      </div>

       <div className="flex gap-3">
        <AppButton icon={<Upload size={14} />} onClick={onImport}>Import file</AppButton>
        <AppButton type="primary" icon={<Search size={14} />} onClick={handleSearch}>Tìm kiếm</AppButton>
      </div>
    </div>
  );
};