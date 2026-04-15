import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { IMedicalRecord } from "@/types";

interface UseColumnParams {
  onView: (cccd: string) => void;
}

export function useColumnMedicalRecord({ onView }: UseColumnParams) {
  const { t } = useTranslation();

  const columns = [
    { title: t("medicalRecord.table.cccd"), dataIndex: "cccd", key: "cccd", width: "15%" },
    { title: t("medicalRecord.table.fullName"), dataIndex: "fullName", key: "fullName", width: "20%" },
    { title: t("medicalRecord.table.dob"), dataIndex: "dob", key: "dob", width: "15%" },
    { title: t("medicalRecord.table.gender"), dataIndex: "gender", key: "gender", width: "10%" },
    { title: t("medicalRecord.table.profession"), dataIndex: "profession", key: "profession", width: "15%" },
    { title: t("medicalRecord.table.unit"), dataIndex: "unit", key: "unit", width: "15%" },
    {
      title: t("medicalRecord.table.action"),
      key: "action",
      width: "10%",
      align: "center" as const,
      render: (_: unknown, record: IMedicalRecord) => (
        <button
          onClick={() => onView(record.cccd)}
          className="inline-flex items-center gap-1 px-3 py-1 text-sm text-[#0008b0] bg-transparent border border-[#0008b0] rounded transition-colors hover:bg-[#f0f5ff]"
        >
          <Eye size={14} />
          {t("common.view")}
        </button>
      ),
    },
  ];

  return { columns };
}