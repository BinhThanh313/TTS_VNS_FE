import { useState, useMemo } from "react";
import { Input, Button, Select } from "antd";
import { Search, Upload } from "lucide-react";
import type { IWardSearchParams } from "@/types";
import { useProvinceList, useDistrictList } from "@/hooks"; 

export const WardSearchForm = ({ onSearch, onImport }: { onSearch: (params: IWardSearchParams) => void; onImport: () => void }) => {
  const [provinceId, setProvinceId] = useState<string | undefined>(undefined);
  const [districtId, setDistrictId] = useState<string | undefined>(undefined);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const { data: provinceData } = useProvinceList({ pageSize: 1000 });
  const { data: districtData } = useDistrictList({ provinceId, pageSize: 1000 });

  const provinceOptions = useMemo(() => provinceData?.data?.map(p => ({ label: p.tenTinh, value: p.id })) || [], [provinceData]);
  const districtOptions = useMemo(() => districtData?.data?.map(d => ({ label: d.name, value: d.id })) || [], [districtData]);

  const handleSearch = () => onSearch({ districtId, code: code || undefined, name: name || undefined });

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex gap-4 items-end">
        <div className="w-[180px]">
          <div className="text-[13px] text-gray-800 font-medium mb-1.5">Tỉnh/ Thành phố</div>
          <Select showSearch allowClear placeholder="Chọn Tỉnh" options={provinceOptions} value={provinceId}
            onChange={(val) => { setProvinceId(val); setDistrictId(undefined); }} 
            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            className="w-full h-[32px]" />
        </div>
        <div className="w-[180px]">
          <div className="text-[13px] text-gray-800 font-medium mb-1.5">Quận/ Huyện</div>
          <Select showSearch allowClear placeholder="Chọn Huyện" options={districtOptions} value={districtId} disabled={!provinceId}
            onChange={(val) => setDistrictId(val)}
            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            className="w-full h-[32px]" />
        </div>
        <div className="w-[150px]">
          <div className="text-[13px] text-gray-800 font-medium mb-1.5">Mã Xã/ Phường</div>
          <Input placeholder="Nhập mã" maxLength={25} value={code} onChange={(e) => setCode(e.target.value)} onPressEnter={handleSearch} allowClear />
        </div>
        <div className="w-[200px]">
          <div className="text-[13px] text-gray-800 font-medium mb-1.5">Tên Xã/ Phường</div>
          <Input placeholder="Nhập tên" maxLength={250} value={name} onChange={(e) => setName(e.target.value)} onPressEnter={handleSearch} allowClear />
        </div>
        
        {/* Nút bấm nằm cùng dòng, dạt sang phải */}
        <div className="flex gap-3 ml-auto">
          <Button icon={<Upload size={14} />} onClick={onImport}>Import file</Button>
          <Button type="primary" className="bg-blue-800" icon={<Search size={14} />} onClick={handleSearch}>Tìm kiếm</Button>
        </div>
      </div>
    </div>
  );
};