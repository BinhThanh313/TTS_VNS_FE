import { useState } from "react";
import type { IClinicServiceSearchParams } from "@/types";
import { DEFAULT_PAGE_SIZE } from "@/constants"; // Đảm bảo bạn có file constants này, hoặc dùng số 15

export function useLogicClinicService() {
  const [searchParams, setSearchParams] = useState<IClinicServiceSearchParams>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE || 15);

  const handleSearch = (params: IClinicServiceSearchParams) => {
    setSearchParams(params);
    setCurrentPage(1); // Reset về trang 1 khi search
  };

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return { searchParams, currentPage, pageSize, handleSearch, handlePageChange };
}