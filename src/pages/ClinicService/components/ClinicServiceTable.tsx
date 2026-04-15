import { DataTable } from '@/components/common';
import type { IClinicService } from '@/types';

interface Props {
  columns: any[]; // Bổ sung prop columns
  data: IClinicService[];
  currentPage: number; 
  pageSize: number; 
  totalRecords: number; 
  loading: boolean;
  onPageChange: (page: number, size: number) => void;
}

export const ClinicServiceTable = ({ columns, data, currentPage, pageSize, totalRecords, loading, onPageChange }: Props) => {
  return (
    <DataTable 
      columns={columns} 
      dataSource={data} 
      loading={loading} 
      totalRecords={totalRecords} 
      currentPage={currentPage} 
      pageSize={pageSize} 
      onPageChange={onPageChange} 
      rowKey="id" 
    />
  );
};