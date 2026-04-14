import { useState } from "react";
import type { IDistrictSearchParams } from "@/types";
import { DEFAULT_PAGE_SIZE } from "@/constants";

export function useLogicDistrict() {
  const [searchParams, setSearchParams] = useState<IDistrictSearchParams>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const handleSearch = (params: IDistrictSearchParams) => {
    setSearchParams(params);
    setCurrentPage(1); // Reset về trang 1 khi search
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return { searchParams, currentPage, pageSize, handleSearch, handlePageChange };
}
