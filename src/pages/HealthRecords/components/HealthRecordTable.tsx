import React from 'react';
import { EyeOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { CBCSRecord } from '@/types/HealthRecord'; 
import { DataTable, AppButton } from '@/components/common'; 

interface Props {
  dataSource: CBCSRecord[];
  onView: (cccd: string) => void; // THÊM DÒNG NÀY: Báo lên component cha mã CCCD được chọn
}

export const HealthRecordTable: React.FC<Props> = ({ dataSource, onView }) => {
  const columns: ColumnsType<CBCSRecord> = [
    { title: 'CCCD', dataIndex: 'cccd', key: 'cccd', width: '15%' },
    { title: 'Họ và tên', dataIndex: 'fullName', key: 'fullName', width: '20%' },
    { title: 'Ngày sinh', dataIndex: 'dob', key: 'dob', width: '15%' },
    { title: 'Giới tính', dataIndex: 'gender', key: 'gender', width: '10%' },
    { title: 'Nghề nghiệp', dataIndex: 'profession', key: 'profession', width: '15%' },
    { title: 'Đơn vị', dataIndex: 'unit', key: 'unit', width: '15%' },
    {
      title: 'Thao tác',
      key: 'action',
      width: '10%',
      align: 'center',
      render: (_, record) => (
        <AppButton 
          size="small" 
          icon={<EyeOutlined />} 
          className="btn-view-action"
          // ĐÃ SỬA: Khi bấm sẽ gọi hàm onView và truyền CCCD ra ngoài
          onClick={() => onView(record.cccd)} 
        >
          Xem
        </AppButton>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      dataSource={dataSource}
      pagination={false} 
      className="custom-health-table"
    />
  );
};