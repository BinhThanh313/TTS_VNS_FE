import { useQuery } from "@tanstack/react-query";
import { revenueService } from "@/services";
import type { IRevenueSearchParams } from "@/types";

export function useRevenueReportData(params: IRevenueSearchParams, enabled: boolean) {
  return useQuery({
    queryKey: ["revenue", "report", params],
    queryFn: () => revenueService.getReportData(params),
    enabled: enabled, // Chỉ gọi API khi ấn tìm kiếm
  });
}