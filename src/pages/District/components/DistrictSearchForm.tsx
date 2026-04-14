import { useState } from "react";
import { Input, Button } from "antd";
import { Search, Upload, Plus } from "lucide-react";
import type { IDistrictSearchParams } from "@/types";

interface Props { onSearch: (params: IDistrictSearchParams) => void; onImport: () => void; onCreate: () => void; }

export const DistrictSearchForm = ({ onSearch, onImport, onCreate }: Props) => {
  const [name, setName] = useState("");

  const handleSearch = () => onSearch({ name: name || undefined });

  return (
    <div className="flex justify-between items-end mb-6">
      <div className="flex gap-6">
        <div className="w-[250px]">
          <div className="text-[13px] text-gray-800 font-medium mb-1.5">Tên Quận/Huyện</div>
          <Input placeholder="Nhập tên quận/huyện" value={name} onChange={(e) => setName(e.target.value)} onPressEnter={handleSearch} allowClear />
        </div>
        {/* Tương lai có thể thêm ComboBox chọn Tỉnh ở đây */}
      </div>

      <div className="flex gap-3">
        <Button icon={<Upload size={14} />} onClick={onImport}>Import file</Button>
        <Button type="primary" className="bg-blue-800" icon={<Search size={14} />} onClick={handleSearch}>Tìm kiếm</Button>
        <Button type="primary" className="bg-blue-800" icon={<Plus size={14}/>} onClick={onCreate}>Thêm mới</Button>
      </div>
    </div>
  );
};