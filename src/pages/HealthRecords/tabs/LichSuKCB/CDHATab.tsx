import React from 'react';
import { Table, Collapse, Typography } from 'antd';

const { Text } = Typography;

export const CDHATab = () => {
  const columns = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', width: 60, align: 'center' as const },
    { title: 'Ngày giờ chỉ định', dataIndex: 'ngay', key: 'ngay', align: 'center' as const },
    { title: 'Nhóm dịch vụ', dataIndex: 'nhom', key: 'nhom', align: 'left' as const },
    { title: 'Tên dịch vụ', dataIndex: 'ten', key: 'ten', align: 'left' as const },
  ];

  const data = [
    { key: '1', stt: 1, ngay: '15/10/2024 11:14', nhom: 'X-Quang', ten: 'X-quang ngực thẳng' },
    { key: '2', stt: 2, ngay: '15/10/2024 10:30', nhom: 'Siêu âm', ten: 'Siêu âm ổ bụng' },
  ];

  const collapseItems = [
    {
      key: '1',
      label: <span style={{ color: '#0008b0', fontWeight: 'bold', textTransform: 'uppercase' }}>KẾT QUẢ CHI TIẾT</span>,
      children: (
        <div>
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontWeight: 'bold' }}>Ngày giờ kết quả: </span>
            <span>15/10/2024 10:30</span>
          </div>
          
          <div style={{ fontWeight: 'bold', marginBottom: 8 }}>Mô tả chi tiết:</div>
          <ul style={{ paddingLeft: 20, marginBottom: 16 }}>
            <li>Lồng ngực cân đối.</li>
            <li>Hai trường phổi sáng, không thấy hình ảnh tổn thương khu trú mô phổi.</li>
            <li>Rốn phổi hai bên đậm. Bóng tim không to.</li>
            <li>Vòm hoành hai bên nhẵn, góc sườn hoành hai bên nhọn.</li>
          </ul>

          <div style={{ fontWeight: 'bold', marginBottom: 4 }}>Kết luận:</div>
          <Text style={{ color: '#0008b0', textTransform: 'uppercase', fontWeight: 500 }}>
            Hiện tại chưa thấy hình ảnh bất thường trên phim chụp X-quang ngực thẳng
          </Text>
        </div>
      )
    }
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} size="small" className="custom-health-table" style={{ marginBottom: 24 }} />
      <Collapse defaultActiveKey={['1']} items={collapseItems} expandIconPosition="end" className="custom-detail-collapse" />
    </div>
  );
};