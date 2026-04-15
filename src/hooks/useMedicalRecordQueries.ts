import { useQuery } from "@tanstack/react-query";
import { medicalRecordService } from "@/services";
import type { IMedicalRecordParams } from "@/types";

export function useMedicalRecordList(params?: IMedicalRecordParams) {
  return useQuery({
    queryKey: ["medicalRecord", "list", params],
    queryFn: () => medicalRecordService.getList(params),
  });
}

export function useMedicalRecordById(cccd: string) {
  return useQuery({
    queryKey: ["medicalRecord", "detail", cccd],
    queryFn: () => medicalRecordService.getById(cccd),
    enabled: !!cccd, // Chỉ gọi khi có CCCD
  });
}