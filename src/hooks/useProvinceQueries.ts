// src/hooks/useProvinceQueries.ts
import { useQuery } from "@tanstack/react-query";
import { provinceService } from "@/services";
import type { IProvinceSearchParams } from "@/types";

export function useProvinceList(params?: IProvinceSearchParams) {
  return useQuery({
    queryKey: ["province", "list", params],
    queryFn: () => provinceService.getList(params),
  });
}

export function useProvinceById(id: string | number) {
  return useQuery({
    queryKey: ["province", "detail", id],
    queryFn: () => provinceService.getById(id),
    enabled: !!id,
  });
}