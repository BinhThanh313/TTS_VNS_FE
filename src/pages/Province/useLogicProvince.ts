import { useState } from "react";
import type { IProvinceSearchParams } from "@/types";
import { DEFAULT_PAGE_SIZE } from "@/constants";

export function useLogicProvince() {
  const [searchParams, setSearchParams] = useState<IProvinceSearchParams>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const handleSearch = (params: IProvinceSearchParams) => {
    setSearchParams(params);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return { searchParams, currentPage, pageSize, handleSearch, handlePageChange };
}