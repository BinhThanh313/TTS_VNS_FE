import React from 'react';
import { Table, Collapse, Typography } from 'antd';

const { Text } = Typography;

export const DonThuocTab = () => {
  // --- BẢNG 1: DANH SÁCH LẦN KÊ ĐƠN ---
  const dsDonThuocColumns = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', width: 60, align: 'center' as const },
    { title: 'Ngày giờ kê đơn', dataIndex: 'ngay', key: 'ngay', align: 'center' as const },
    { title: 'Bác sĩ chỉ định', dataIndex: 'bs', key: 'bs', align: 'center' as const },
  ];

  const dsDonThuocData = [
    { key: '1', stt: 1, ngay: '.........', bs: '.........' },
    { key: '2', stt: 2, ngay: '.........', bs: '.........' },
  ];

  // --- BẢNG 2: CHI TIẾT CÁC LOẠI THUỐC TRONG 1 ĐƠN ---
  const chiTietThuocColumns = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', width: 60, align: 'center' as const },
    { title: 'Tên thuốc', dataIndex: 'ten', key: 'ten', align: 'left' as const },
    { title: 'Hàm lượng', dataIndex: 'hamluong', key: 'hamluong', align: 'center' as const },
    { title: 'Liều dùng', dataIndex: 'lieudung', key: 'lieudung', align: 'center' as const },
    { title: 'Số lượng', dataIndex: 'soluong', key: 'soluong', align: 'center' as const },
    { title: 'Đơn vị', dataIndex: 'donvi', key: 'donvi', align: 'center' as const },
    { title: 'Cách dùng', dataIndex: 'cachdung', key: 'cachdung', align: 'left' as const },
  ];

  const chiTietThuocData = [
    { key: '1', stt: 1, ten: '.........', hamluong: '.........', lieudung: '.........', soluong: '.........', donvi: '.........', cachdung: '.........' },
    { key: '2', stt: 2, ten: '.........', hamluong: '.........', lieudung: '.........', soluong: '.........', donvi: '.........', cachdung: '.........' },
  ];

  // --- NỘI DUNG BÊN TRONG COLLAPSE CHI TIẾT ---
  const KetQuaChiTiet = () => (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Text strong style={{ color: '#0008b0', marginRight: 8 }}>Ngày giờ kê đơn:</Text>
        <Text>...........................................</Text>
      </div>

      <div style={{ fontWeight: 'bold', marginBottom: 12, color: '#333' }}>
        Đơn thuốc chi tiết:
      </div>

      <Table 
        columns={chiTietThuocColumns} 
        dataSource={chiTietThuocData} 
        pagination={false} 
        size="small" 
        className="custom-health-table" 
      />
    </div>
  );

  return (
    <div>
      {/* BẢNG DANH SÁCH LẦN KÊ ĐƠN */}
      <Table 
        columns={dsDonThuocColumns} 
        dataSource={dsDonThuocData} 
        pagination={false} 
        size="small" 
        className="custom-health-table" 
        style={{ marginBottom: 24 }} 
      />

      {/* KHUNG COLLAPSE HIỂN THỊ CHI TIẾT ĐƠN THUỐC */}
      <Collapse 
        defaultActiveKey={['1']} 
        className="custom-detail-collapse"
        expandIconPosition="end"
        items={[
          {
            key: '1',
            label: <span style={{ color: '#0008b0', fontWeight: 'bold', textTransform: 'uppercase' }}>KẾT QUẢ CHI TIẾT</span>,
            children: <KetQuaChiTiet />
          }
        ]}
      />
    </div>
  );
};