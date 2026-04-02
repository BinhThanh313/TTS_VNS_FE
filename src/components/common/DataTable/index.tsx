import { Table } from 'antd';
import type { TableProps } from 'antd';

// Kế thừa các props mặc định của Antd Table để có thể truyền thêm custom props nếu cần
interface DataTableProps<T extends object> extends TableProps<T> {
  columns: any[];
  dataSource: T[];
  totalRecords?: number;
  currentPage?: number;
  pageSize?: number;
  loading?: boolean;
  onPageChange?: (page: number, pageSize: number) => void;
}

export const DataTable = <T extends object>({
  columns,
  dataSource,
  totalRecords = 0,
  currentPage = 1,
  pageSize = 10,
  loading = false,
  onPageChange,
  ...restProps // Bắt các props còn lại (ví dụ rowKey, scroll, bordered...)
}: DataTableProps<T>) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      // Thiết lập phân trang đồng bộ
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: totalRecords,
        showSizeChanger: true, // Cho phép chọn số dòng/trang
        pageSizeOptions: ['10', '20', '50', '100'],
        onChange: onPageChange,
        showTotal: (total, range) => `Hiển thị ${range[0]}-${range[1]} của ${total} bản ghi`,
      }}
      bordered
      {...restProps}
    />
  );
};