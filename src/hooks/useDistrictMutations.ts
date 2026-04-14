import { useMutation, useQueryClient } from "@tanstack/react-query";
import { districtService } from "@/services";
import type { IDistrictRequest } from "@/types";

export function useCreateDistrict() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IDistrictRequest) => districtService.createNew(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["district"] });
    },
  });
}

export function useUpdateDistrict() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: IDistrictRequest }) => 
      districtService.updateNew(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["district"] });
    },
  });
}

export function useDeleteDistrict() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => districtService.deleteNew(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["district"] });
    },
  });
}