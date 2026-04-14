import React from 'react';
import { Row, Col, Collapse, Table, Tag, Card } from 'antd';
import { MedicineBoxOutlined, HeartOutlined } from '@ant-design/icons';
import { UnderlineField } from '../../components/UnderlineField';

export const TienSuTab = () => {
  const chronicColumns = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', width: 60, align: 'center' as const },
    { title: 'Mã bệnh', dataIndex: 'code', key: 'code' },
    { title: 'Tên bệnh', dataIndex: 'name', key: 'name' },
    { title: 'Thời gian', dataIndex: 'time', key: 'time', align: 'center' as const },
    { 
      title: 'Trạng thái', dataIndex: 'status', key: 'status', align: 'center' as const,
      render: (status: string) => {
        let color = 'blue';
        if (status === 'Đang điều trị') color = 'orange';
        if (status === 'Đã hết bệnh') color = 'green';
        return <Tag color={color} style={{ borderRadius: 12, padding: '2px 12px' }}>{status}</Tag>;
      }
    },
  ];

  const chronicData = [
    { key: '1', stt: 1, code: 'ICD- 10: I10', name: 'Tiểu đường Type 2', time: '08/12/2024', status: 'Ổn định' },
    { key: '2', stt: 2, code: 'ICD- 10: E11', name: 'Tăng huyết áp', time: '09/10/2024', status: 'Đang điều trị' },
    { key: '3', stt: 3, code: 'ICD- 10: A15', name: 'Lao phổi', time: '03/05/2018', status: 'Đã hết bệnh' },
  ];

  const allergyColumns = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', width: 60, align: 'center' as const },
    { title: 'Nhóm dị ứng', dataIndex: 'group', key: 'group' },
    { title: 'Dị nguyên', dataIndex: 'allergen', key: 'allergen' },
    { title: 'Biểu hiện', dataIndex: 'symptom', key: 'symptom' },
    { title: 'Thời gian', dataIndex: 'time', key: 'time', align: 'center' as const },
  ];

  const collapseItems = [
    { 
      key: '1', 
      label: <span><MedicineBoxOutlined style={{marginRight: 8}}/> Tiền sử bệnh tật</span>,
      children: (
        <div>
          <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 'bold', marginBottom: 12, color: '#333' }}>Chỉ số sinh hiệu:</div>
              <Row gutter={24}>
                <Col span={6}><UnderlineField label="Mạch" value={<>82 <span style={{fontWeight: 'normal', color: '#888'}}>Nhịp/phút</span></>} /></Col>
                <Col span={6}><UnderlineField label="Nhịp thở" value={<>19 <span style={{fontWeight: 'normal', color: '#888'}}>Lần/phút</span></>} /></Col>
                <Col span={6}><UnderlineField label="SPO2" value={<>97 <span style={{fontWeight: 'normal', color: '#888'}}>%</span></>} /></Col>
                <Col span={6}><UnderlineField label="Cân nặng" value={<>72 <span style={{fontWeight: 'normal', color: '#888'}}>kg</span></>} /></Col>
                <Col span={6}><UnderlineField label="Nhiệt độ" value={<>36.6 <span style={{fontWeight: 'normal', color: '#888'}}>°C</span></>} /></Col>
                <Col span={6}><UnderlineField label="Huyết áp" value={<>130/85 <span style={{fontWeight: 'normal', color: '#888'}}>mmHg</span></>} /></Col>
                <Col span={6}><UnderlineField label="Chiều cao" value={<>168 <span style={{fontWeight: 'normal', color: '#888'}}>cm</span></>} /></Col>
                <Col span={6}><UnderlineField label="BMI" value={<>25.5 <span style={{fontWeight: 'normal', color: '#888'}}>kg/m²</span></>} /></Col>
              </Row>
            </div>
            
            <div style={{ width: 220 }}>
              <Card styles={{ body: { padding: 16, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' } }}>
                <div style={{ color: '#0008b0', fontWeight: 'bold', marginBottom: 16 }}><HeartOutlined /> Phân loại sức khỏe</div>
                <div style={{ background: '#e6f4ff', color: '#0008b0', fontSize: 24, fontWeight: 'bold', width: 100, height: 100, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  LOẠI 2
                </div>
                <div style={{ fontSize: 12, color: '#888', fontStyle: 'italic' }}>* Ngày khám: 31/03/2025</div>
              </Card>
            </div>
          </div>

          <div style={{ fontWeight: 'bold', marginBottom: 12, color: '#333' }}>Bệnh mãn tính & Điều trị dài ngày:</div>
          <Table columns={chronicColumns} dataSource={chronicData} pagination={false} bordered size="small" style={{ marginBottom: 24 }} />

          <div style={{ fontWeight: 'bold', marginBottom: 12, color: '#333' }}>Tiền sử dị ứng:</div>
          <Table columns={allergyColumns} dataSource={[]} pagination={false} bordered size="small" locale={{ emptyText: 'Không có dữ liệu' }} />
        </div>
      ) 
    }
  ];

  return <Collapse defaultActiveKey={['1']} items={collapseItems} expandIconPosition="end" ghost className="custom-detail-collapse" />;
};