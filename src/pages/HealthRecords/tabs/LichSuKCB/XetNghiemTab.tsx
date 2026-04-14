import React from 'react';
import { Table, Collapse, Typography } from 'antd';
import { TeamOutlined } from '@ant-design/icons';

const { Text } = Typography;

export const XetNghiemTab = () => {
  const columns = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', width: 60, align: 'center' as const },
    { title: 'Tên chỉ số', dataIndex: 'ten', key: 'ten', align: 'left' as const },
    { title: 'Kết quả', dataIndex: 'kq', key: 'kq', align: 'center' as const },
    { title: 'Đơn vị đo', dataIndex: 'donvi', key: 'donvi', align: 'center' as const },
    { title: 'Ngày giờ kết quả', dataIndex: 'ngay', key: 'ngay', align: 'center' as const },
    { title: 'Bác sĩ thực hiện', dataIndex: 'bs', key: 'bs', align: 'center' as const },
  ];

  const data = [
    { key: '1', stt: 1, ten: 'Glucose', kq: '5.4', donvi: 'mmol/L', ngay: '.........', bs: '.........' },
    { key: '2', stt: 2, ten: 'Ure', kq: '4.2', donvi: 'mmol/L', ngay: '.........', bs: '.........' },
  ];

  const ChiDinhContent = () => (
    <div>
      <div style={{ fontWeight: 'bold', marginBottom: 12 }}>Chỉ số chi tiết:</div>
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={false} 
        size="small" 
        className="custom-health-table" 
      />
      <div style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Kết luận:</div>
        <Text style={{ color: '#0008b0', textTransform: 'uppercase', fontWeight: 500 }}>
          Hiện tại chưa thấy bất thường
        </Text>
      </div>
    </div>
  );

  const innerItemStyle = {
    marginBottom: 12,
    border: '1px solid #d9d9d9', // Dùng màu d9d9d9 cho thanh mảnh hơn
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden'
  };

  const innerCollapseItems = [
    { 
      key: '1', 
      label: <span style={{ fontWeight: 600, color: '#0008b0' }}>Chỉ định 1: Xét nghiệm sinh hóa máu</span>, 
      children: <ChiDinhContent />,
      style: innerItemStyle
    },
    { 
      key: '2', 
      label: <span style={{ fontWeight: 600, color: '#0008b0' }}>Chỉ định 2: Huyết học</span>, 
      children: <div>Nội dung...</div>,
      style: innerItemStyle
    },
    { 
      key: '3', 
      label: <span style={{ fontWeight: 600, color: '#0008b0' }}>Chỉ định 3: ...................</span>, 
      children: <div>Nội dung...</div>,
      style: innerItemStyle
    },
  ];

  return (
    <div>
      {/* KHỐI 1: Bác sĩ Khoa */}
      <Collapse 
        defaultActiveKey={['1']} 
        expandIconPosition="end" 
        className="custom-detail-collapse"
        items={[
          {
            key: '1',
            label: <span style={{ color: '#0008b0', fontWeight: 'bold' }}><TeamOutlined style={{ marginRight: 8 }}/> Ngày: 01/01/2026 - BS: Nguyễn Minh Khoa</span>,
            children: <Collapse defaultActiveKey={['1']} items={innerCollapseItems} ghost expandIconPosition="end" />
          }
        ]} 
      />

      {/* KHỐI 2: Bác sĩ Hiếu */}
      <Collapse 
        // Bỏ defaultActiveKey đi nếu bạn muốn mặc định khối này đóng lại lúc mới vào
        expandIconPosition="end" 
        className="custom-detail-collapse"
        items={[
          {
            key: '1',
            label: <span style={{ color: '#0008b0', fontWeight: 'bold' }}><TeamOutlined style={{ marginRight: 8 }}/> Ngày: 01/01/2026 - BS: Trần Minh Hiếu</span>,
            children: <Collapse items={innerCollapseItems} ghost expandIconPosition="end" />
          }
        ]} 
      />
    </div>
  );
};