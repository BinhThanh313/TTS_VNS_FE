import { useMutation, useQueryClient } from "@tanstack/react-query";
import { wardService } from "@/services";
import type { IWardRequest } from "@/types";

export function useCreateWard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IWardRequest) => wardService.createNew(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ward"] }),
  });
}

export function useUpdateWard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string | number; data: IWardRequest }) => 
      wardService.updateNew(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ward"] }),
  });
}

export function useDeleteWard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => wardService.deleteNew(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["ward"] }),
  });
}