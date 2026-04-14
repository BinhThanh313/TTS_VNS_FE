import React from 'react';
import { Input, Select, DatePicker, Button, Table, Collapse } from 'antd';
import { SearchOutlined, EyeOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { DataTable, AppButton } from '@/components/common';

const { RangePicker } = DatePicker;

interface Props {
  onSelectRecord: (id: string) => void;
}

export const LichSuList: React.FC<Props> = ({ onSelectRecord }) => {
  // Dữ liệu mẫu bảng Lịch sử
  const columns = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', width: 60, align: 'center' as const },
    { title: 'Tên khám', dataIndex: 'tenKham', key: 'tenKham', width: 200, align: 'center' as const },
    { title: 'Nơi KCB', dataIndex: 'noiKCB', key: 'noiKCB', align: 'center' as const },
    { title: 'Ngày vào viện', dataIndex: 'ngayVao', key: 'ngayVao', align: 'center' as const },
    { title: 'Ngày ra viện', dataIndex: 'ngayRa', key: 'ngayRa', align: 'center' as const },
    { title: 'Loại KCB', dataIndex: 'loaiKCB', key: 'loaiKCB', align: 'center' as const },
    {
      title: 'Thao tác',
      key: 'action',
      width: 100,
      align: 'center' as const,
      render: (_: any, record: any) => (
        <AppButton size="small" icon={<EyeOutlined />} className="btn-view-action" onClick={() => onSelectRecord(record.key)}>
          Xem
        </AppButton>
      ),
    },
  ];

  const data = [
    { key: '1', stt: 1, tenKham: 'Viêm họng cấp', noiKCB: 'Bệnh xá công an tỉnh Hà Nam', ngayVao: '01/01/2026 08:30', ngayRa: '01/01/2026 16:47', loaiKCB: 'Ngoại trú' },
    { key: '2', stt: 2, tenKham: 'Viêm dạ dày cấp tính có vi khuẩn HP (+)', noiKCB: 'Bệnh viện 19-8', ngayVao: '15/01/2026 08:30', ngayRa: '18/01/2026 09:00', loaiKCB: 'Nội trú' },
  ];

  return (
    <div>
      {/* Bộ lọc tìm kiếm */}
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, padding: 16, border: '1px solid #d9d9d9', borderRadius: 8 }}>
        <Input prefix={<SearchOutlined />} placeholder="Nhập Tên khám hoặc Nơi KCB" style={{ flex: 1.5 }} />
        <Select placeholder="Chọn loại KCB" style={{ flex: 1 }} options={[{ value: 'ngoaitru', label: 'Ngoại trú' }, { value: 'noitru', label: 'Nội trú' }]} />
        <RangePicker style={{ flex: 1.5 }} format="DD/MM/YYYY" placeholder={['Chọn từ ngày', 'Chọn đến ngày']} />
        <Button type="primary" icon={<SearchOutlined />} style={{ backgroundColor: '#0008b0' }} />
      </div>

      {/* Bảng Collapse */}
      <Collapse 
        defaultActiveKey={['1']} 
        className="custom-detail-collapse"
        expandIcon={({ isActive }) => <MinusCircleOutlined style={{ color: '#0008b0', transform: isActive ? 'rotate(180deg)' : '' }} />}
        items={[
          {
            key: '1',
            label: <span style={{ color: '#0008b0', fontWeight: 'bold', textTransform: 'uppercase' }}>LỊCH SỬ KHÁM CHỮA BỆNH THEO TỪNG ĐỢT KHÁM</span>,
            children: <DataTable columns={columns} dataSource={data} pagination={false} bordered size="small" />
          }
        ]} 
      />
    </div>
  );
};