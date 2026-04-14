// src/hooks/useProvinceMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { provinceService } from "@/services";
import type { IProvinceRequest } from "@/types";

export function useCreateProvince() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IProvinceRequest) => provinceService.createNew(data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["province"] }); },
  });
}

export function useUpdateProvince() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: IProvinceRequest }) => provinceService.updateNew(id, data),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["province"] }); },
  });
}

export function useDeleteProvince() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => provinceService.deleteNew(id),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["province"] }); },
  });
}