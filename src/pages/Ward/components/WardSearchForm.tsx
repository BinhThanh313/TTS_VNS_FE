import { useState, useMemo } from "react";
import { Input, Button, Select } from "antd";
import { Search, Upload } from "lucide-react";
import type { IWardSearchParams } from "@/types";
import { useProvinceList } from "@/hooks"; 

export const WardSearchForm = ({ onSearch, onImport }: { onSearch: (params: IWardSearchParams) => void; onImport: () => void }) => {
  const [provinceId, setProvinceId] = useState<string | undefined>(undefined);
  const [name, setName] = useState("");

  const { data: provinceData } = useProvinceList({ pageSize: 1000 });
  const provinceOptions = useMemo(() => provinceData?.data?.map(p => ({ label: p.tenTinh, value: p.id })) || [], [provinceData]);

  const handleSearch = () => onSearch({ name: name || undefined });

  return (
    <div className="flex justify-between items-end mb-6">
      <div className="flex gap-4">
        <div className="w-[200px]">
          <div className="text-[13px] text-gray-800 font-medium mb-1.5">Tỉnh/TP</div>
          <Select showSearch allowClear placeholder="Chọn Tỉnh" options={provinceOptions} value={provinceId}
            onChange={(val) => setProvinceId(val)} 
            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            className="w-full h-[32px]" />
        </div>
        
        <div className="w-[300px]">
          <div className="text-[13px] text-gray-800 font-medium mb-1.5">Tên xã/phường</div>
          <Input placeholder="Nhập tên" maxLength={250} value={name} onChange={(e) => setName(e.target.value)} onPressEnter={handleSearch} allowClear />
        </div>
      </div>

      <div className="flex gap-3 ml-auto">
        <Button icon={<Upload size={14} />} onClick={onImport}>Import file</Button>
        <Button type="primary" className="bg-blue-800" icon={<Search size={14} />} onClick={handleSearch}>Tìm kiếm</Button>
      </div>
    </div>
  );
};