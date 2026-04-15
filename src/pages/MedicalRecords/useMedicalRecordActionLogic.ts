import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMedicalRecordList } from "@/hooks";
import type { IMedicalRecordParams } from "@/types";

export function useMedicalRecordActionLogic() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState<IMedicalRecordParams>({
    page: 1,
    pageSize: 15,
  });

  // Gọi React Query
  const { data, isPending } = useMedicalRecordList(searchParams);

  const handleSearch = (params: Partial<IMedicalRecordParams>) => {
    setSearchParams((prev) => ({ ...prev, ...params, page: 1 }));
  };

  const handleViewDetail = (cccd: string) => {
    navigate(`/medical-records/${cccd}`);
  };

  return {
    medicalRecordList: data?.data || [],
    total: data?.total || 0,
    searchParams,
    isLoadingList: isPending,
    handleSearch,
    handleViewDetail,
  };
}