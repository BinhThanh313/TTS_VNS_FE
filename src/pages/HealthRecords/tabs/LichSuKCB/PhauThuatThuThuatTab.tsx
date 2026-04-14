import React from 'react';
import { Table, Collapse, Row, Col } from 'antd';

const Field = ({ label, value }: { label: string, value?: React.ReactNode }) => (
  <div className="underline-field">
    <div className="underline-field-label">{label}</div>
    <div className="underline-field-value">{value || '...........................................'}</div>
  </div>
);

export const PhauThuatThuThuatTab = () => {
  const columns = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', width: 60, align: 'center' as const },
    { title: 'Ngày giờ thực hiện', dataIndex: 'ngay', key: 'ngay', align: 'center' as const },
    { title: 'Tên dịch vụ', dataIndex: 'ten', key: 'ten', align: 'left' as const },
  ];

  const data = [
    { key: '1', stt: 1, ngay: '.........', ten: '.........' },
    { key: '2', stt: 2, ngay: '.........', ten: '.........' },
  ];

  // Component hiển thị kết quả chi tiết bên trong
  const KetQuaChiTiet = () => (
    <Collapse 
      defaultActiveKey={['1']} 
      className="custom-detail-collapse"
      expandIconPosition="end"
      items={[
        {
          key: '1',
          label: <span style={{ color: '#0008b0', fontWeight: 'bold', textTransform: 'uppercase' }}>KẾT QUẢ CHI TIẾT</span>,
          children: (
            <div>
              <Row gutter={24}>
                <Col span={8}><Field label="Ngày giờ thực hiện" value="15/10/2024 11:14" /></Col>
                <Col span={8}><Field label="Người thực hiện" value="Lâm Trọng Hà" /></Col>
                <Col span={8}><Field label="Vị trí thực hiện" /></Col>
              </Row>
              
              <div style={{ marginTop: 8 }}>
                <div style={{ color: '#8c8c8c', fontSize: 13, marginBottom: 4 }}>Phương pháp vô cảm</div>
                <div style={{ fontWeight: 500, marginBottom: 16 }}>1: Gây mê</div>

                <div style={{ color: '#8c8c8c', fontSize: 13, marginBottom: 4 }}>Cách thức thực hiện</div>
                <ul style={{ paddingLeft: 20, margin: 0, fontWeight: 500 }}>
                  <li>Cách 1: ...............................................</li>
                  <li>Cách 2: ...............................................</li>
                  <li>Cách 3: ...............................................</li>
                </ul>
              </div>
            </div>
          )
        }
      ]}
    />
  );

  return (
    <div>
      {/* KHỐI 1: PHẪU THUẬT */}
      <Collapse 
        defaultActiveKey={['1']} 
        expandIconPosition="end" 
        className="custom-detail-collapse"
        items={[
          {
            key: '1',
            label: <span style={{ color: '#0008b0', fontWeight: 'bold', textTransform: 'uppercase' }}>PHẪU THUẬT</span>,
            children: (
              <div>
                <Table 
                  columns={columns} 
                  dataSource={data} 
                  pagination={false} 
                  size="small" 
                  className="custom-health-table" 
                  style={{ marginBottom: 24 }} 
                />
                <KetQuaChiTiet />
              </div>
            )
          }
        ]} 
      />

      {/* KHỐI 2: THỦ THUẬT */}
      <Collapse 
        expandIconPosition="end" 
        className="custom-detail-collapse"
        items={[
          {
            key: '1',
            label: <span style={{ color: '#0008b0', fontWeight: 'bold', textTransform: 'uppercase' }}>THỦ THUẬT</span>,
            children: (
              <div>
                <Table 
                  columns={columns} 
                  dataSource={data} 
                  pagination={false} 
                  size="small" 
                  className="custom-health-table" 
                />
              </div>
            )
          }
        ]} 
      />
    </div>
  );
};