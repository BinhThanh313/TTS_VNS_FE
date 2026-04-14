import { useQuery } from "@tanstack/react-query";
import { wardService } from "@/services";
import type { IWardSearchParams } from "@/types";

export function useWardList(params?: IWardSearchParams) {
  return useQuery({
    queryKey: ["ward", "list", params],
    queryFn: () => wardService.getList(params),
  });
}