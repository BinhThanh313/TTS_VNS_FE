import { useMutation, useQueryClient } from "@tanstack/react-query";
import { clinicServiceApi } from "@/services";
import type { IClinicService } from "@/types";

export function useCreateClinic() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: clinicServiceApi.create, onSuccess: () => qc.invalidateQueries({ queryKey: ["clinic"] }) });
}
export function useUpdateClinic() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, data }: { id: string | number; data: Partial<IClinicService> }) => clinicServiceApi.update(id, data), onSuccess: () => qc.invalidateQueries({ queryKey: ["clinic"] }) });
}
export function useDeleteClinic() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: clinicServiceApi.delete, onSuccess: () => qc.invalidateQueries({ queryKey: ["clinic"] }) });
}