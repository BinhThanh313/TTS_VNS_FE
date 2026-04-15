import { useQuery } from "@tanstack/react-query";
import { clinicServiceApi } from "@/services";
import type { IClinicServiceSearchParams } from "@/types";

export function useClinicList(params: IClinicServiceSearchParams) {
  return useQuery({
    queryKey: ["clinic", "list", params],
    queryFn: () => clinicServiceApi.getList(params),
  });
}