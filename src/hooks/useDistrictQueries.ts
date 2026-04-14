import { useQuery } from "@tanstack/react-query";
import { districtService } from "@/services";
import type { IDistrictSearchParams } from "@/types";

export function useDistrictList(params?: IDistrictSearchParams) {
  return useQuery({
    queryKey: ["district", "list", params],
    queryFn: () => districtService.getList(params),
  });
}