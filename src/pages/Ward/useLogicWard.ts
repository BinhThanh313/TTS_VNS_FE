import { useState } from "react";
import type { IWardSearchParams } from "@/types";
import { DEFAULT_PAGE_SIZE } from "@/constants";

export function useLogicWard() {
  const [searchParams, setSearchParams] = useState<IWardSearchParams>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const handleSearch = (params: IWardSearchParams) => {
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return { searchParams, currentPage, pageSize, handleSearch, handlePageChange };
}