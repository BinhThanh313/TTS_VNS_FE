import { Table } from 'antd';
import type { TableProps, TableColumnType } from 'antd';

// Định nghĩa Props mở rộng từ TableProps của Antd
interface DataTableProps<T extends object> extends TableProps<T> {
  columns: TableColumnType<T>[];
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
  pageSize = 15, 
  loading = false,
  onPageChange,
  rowKey = "id",
  bordered = false, 
  ...restProps 
}: DataTableProps<T>) => {
  return (
    <Table
      {...restProps} // Cho phép ghi đè mọi thứ nếu cần thiết
      rowKey={rowKey}
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      bordered={bordered}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: totalRecords,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20', '50', '100'],
        onChange: (page, size) => {
          if (onPageChange) onPageChange(page, size);
        },
        // Định dạng hiển thị tổng số bản ghi ở góc dưới bên trái 
        showTotal: (total) => `Tổng: ${total} bản ghi`,
        position: ['bottomRight'], // Phân trang nằm bên phải 
      }}
      // Class để bạn dễ dàng custom CSS cho cả dự án
      className="custom-data-table" 
    />
  );
};