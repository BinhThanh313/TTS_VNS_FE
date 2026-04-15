import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMedicalRecordById } from "@/hooks";

export function useMedicalRecordDetailActionLogic() {
  const { cccd } = useParams<{ cccd: string }>();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("hoso");

  const { data: recordInfo, isPending } = useMedicalRecordById(cccd || "");

  const goBack = () => navigate(-1); // Quy tắc mục 13: navigate(-1)

  return {
    cccd,
    recordInfo,
    isLoading: isPending,
    activeMenu,
    setActiveMenu,
    goBack,
  };
}