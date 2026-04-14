import React from 'react';
import { Table, Collapse, Row, Col } from 'antd';

const Field = ({ label, value }: { label: string, value?: React.ReactNode }) => (
  <div className="underline-field">
    <div className="underline-field-label">{label}</div>
    <div className="underline-field-value">{value || '...........................................'}</div>
  </div>
);

export const HoiChanTab = () => {
  const columns = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', width: 60, align: 'center' as const },
    { title: 'Ngày giờ hội chẩn', dataIndex: 'ngay', key: 'ngay', align: 'center' as const },
    { title: 'Nhóm dịch vụ', dataIndex: 'nhom', key: 'nhom', align: 'left' as const },
    { title: 'Tên dịch vụ', dataIndex: 'ten', key: 'ten', align: 'left' as const },
  ];

  const data = [
    { key: '1', stt: 1, ngay: '.........', nhom: '.........', ten: '.........' },
    { key: '2', stt: 2, ngay: '.........', nhom: '.........', ten: '.........' },
  ];

  return (
    <div>
      <Table 
        columns={columns} 
        dataSource={data} 
        pagination={false} 
        size="small" 
        className="custom-health-table" 
        style={{ marginBottom: 24 }} 
      />

      <Collapse 
        defaultActiveKey={['1']} 
        className="custom-detail-collapse"
        expandIconPosition="end"
        items={[
          {
            key: '1',
            label: <span style={{ color: '#0008b0', fontWeight: 'bold', textTransform: 'uppercase' }}>KẾT QUẢ CHI TIẾT</span>,
            children: (
              <Row gutter={24}>
                <Col span={12}><Field label="Ngày giờ hội chẩn" /></Col>
                <Col span={12}><Field label="Người thực hiện" /></Col>
                <Col span={24}><Field label="Kết quả hội chẩn" /></Col>
              </Row>
            )
          }
        ]}
      />
    </div>
  );
};