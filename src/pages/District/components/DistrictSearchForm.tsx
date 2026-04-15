import { useState, useMemo } from "react";
import { Input, Button, Select } from "antd";
import { Search, Upload } from "lucide-react";
import { useProvinceList } from "@/hooks"; // Import hook lấy danh sách Tỉnh
import type { IDistrictSearchParams } from "@/types";

// ĐÃ XÓA: onCreate: () => void
interface Props { 
  onSearch: (params: IDistrictSearchParams) => void; 
  onImport: () => void; 
}

export const DistrictSearchForm = ({ onSearch, onImport }: Props) => {
  const [name, setName] = useState("");
  const [provinceId, setProvinceId] = useState<string | undefined>(undefined);

  // Gọi API lấy danh sách Tỉnh/TP (lấy max 1000 để đổ full vào dropdown)
  const { data: provinceData } = useProvinceList({ pageSize: 1000 });
  
  // Chuyển đổi dữ liệu Tỉnh sang format { label, value } cho thẻ Select của Ant Design
  const provinceOptions = useMemo(() => {
    return provinceData?.data?.map(p => ({ label: p.tenTinh, value: p.id })) || [];
  }, [provinceData]);

  const handleSearch = () => onSearch({ name: name || undefined, provinceId });

  return (
    <div className="flex justify-between items-end mb-6">
      <div className="flex gap-6">
        
        {/* THÊM MỚI: Cột chọn Tỉnh/TP */}
        <div className="w-[250px]">
          <div className="text-[13px] text-gray-800 font-medium mb-1.5">Tỉnh/TP</div>
          <Select
            showSearch // Bật tính năng gõ để tìm kiếm
            allowClear
            placeholder="Chọn Tỉnh/TP"
            options={provinceOptions}
            value={provinceId}
            onChange={(val) => setProvinceId(val)}
            filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
            className="w-full"
          />
        </div>

        {/* Ô nhập tên Huyện/Thị xã */}
        <div className="w-[250px]">
          <div className="text-[13px] text-gray-800 font-medium mb-1.5">Tên Huyện/thị xã</div>
          <Input 
            placeholder="Nhập tên" 
            maxLength={250} // Ràng buộc tối đa 250 ký tự
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            onPressEnter={handleSearch} 
            allowClear 
          />
        </div>

      </div>

      <div className="flex gap-3">
        <Button icon={<Upload size={14} />} onClick={onImport}>
          Import file
        </Button>
        <Button type="primary" className="bg-blue-800" icon={<Search size={14} />} onClick={handleSearch}>
          Tìm kiếm
        </Button>
        {/* ĐÃ XÓA: Nút Thêm mới ở đây */}
      </div>
    </div>
  );
};