import React from 'react';
import { Row, Col, Collapse, Table } from 'antd';
import { EnvironmentOutlined, IdcardOutlined, TeamOutlined } from '@ant-design/icons';
import { UnderlineField } from '../../components/UnderlineField';

export const ThongTinHanhChinhTab = () => {
  const familyColumns = [
    { title: 'STT', dataIndex: 'stt', key: 'stt', width: 60, align: 'center' as const },
    { title: 'Loại quan hệ', dataIndex: 'relation', key: 'relation', align: 'center' as const },
    { title: 'Họ và tên', dataIndex: 'name', key: 'name', align: 'left' as const },
    { title: 'Số BHXH', dataIndex: 'bhxh', key: 'bhxh', align: 'center' as const },
  ];

  const familyData = [
    { key: '1', stt: 1, relation: 'Bố', name: 'Nguyễn Văn Tâm', bhxh: '0801503677' },
    { key: '2', stt: 2, relation: 'Mẹ', name: 'Hán Thị Lan', bhxh: '0123456789' },
    { key: '3', stt: 3, relation: 'Vợ', name: 'Bùi Thị Mận', bhxh: '0524548451' },
    { key: '4', stt: 4, relation: 'Con', name: 'Nguyễn Thanh Đan', bhxh: '455423543' },
    { key: '5', stt: 5, relation: 'Con', name: 'Nguyễn Thanh Nguyên', bhxh: '7454254345' },
  ];

  return (
    <div>
      {/* KHỐI 1: ĐỊA CHỈ HÀNH CHÍNH */}
      <Collapse 
        defaultActiveKey={['1']} 
        expandIconPosition="end" // Đưa mũi tên sang phải
        className="custom-detail-collapse"
        items={[
          { 
            key: '1', 
            label: <span><EnvironmentOutlined style={{marginRight: 8}}/> Địa chỉ hành chính & thẻ BHYT</span>,
            children: (
              <div>
                <UnderlineField label="Thường trú" value="Số 103-105 Nguyễn Tuân, Phường Thanh Xuân, Thành phố Hà Nội, Việt Nam" />
                <UnderlineField label="Tạm trú" value="Số 103-105 Nguyễn Tuân, Phường Thanh Xuân, Thành phố Hà Nội, Việt Nam" />
                <Row gutter={24}>
                  <Col span={6}><UnderlineField label="Số thẻ BHYT" value="024548454245" /></Col>
                  <Col span={6}><UnderlineField label="Thời hạn thẻ" value="01/07/2027" /></Col>
                  <Col span={6}><UnderlineField label="Đến ngày" value="01/07/2030" /></Col>
                  <Col span={6}><UnderlineField label="Mã" value="01-123" /></Col>
                </Row>
                <UnderlineField label="Nơi đăng ký KCB ban đầu" value="Số 103-105 Nguyễn Tuân, Phường Thanh Xuân, Thành phố Hà Nội, Việt Nam" />
              </div>
            ) 
          }
        ]} 
      />

      {/* KHỐI 2: THÔNG TIN NGHỀ NGHIỆP */}
      <Collapse 
        defaultActiveKey={['1']} 
        expandIconPosition="end" // Đưa mũi tên sang phải
        className="custom-detail-collapse"
        items={[
          { 
            key: '1', 
            label: <span><IdcardOutlined style={{marginRight: 8}}/> Thông tin nghề nghiệp</span>,
            children: (
              <Row gutter={24}>
                <Col span={6}><UnderlineField label="Nghề nghiệp" value="Công an" /></Col>
                <Col span={6}><UnderlineField label="Chức vụ" value="Trưởng phòng" /></Col>
                <Col span={6}><UnderlineField label="Cấp bậc" value="Đại tá" /></Col>
                <Col span={6}><UnderlineField label="Đơn vị công tác" value="Phòng PX01" /></Col>
              </Row>
            ) 
          }
        ]} 
      />

      {/* KHỐI 3: THÔNG TIN THÂN NHÂN */}
      <Collapse 
        defaultActiveKey={['1']} 
        expandIconPosition="end" // Đưa mũi tên sang phải
        className="custom-detail-collapse"
        items={[
          { 
            key: '1', 
            label: <span><TeamOutlined style={{marginRight: 8}}/> Thông tin thân nhân</span>,
            children: (
              <Table 
                columns={familyColumns} 
                dataSource={familyData} 
                pagination={false} 
                bordered={false} // Bỏ viền đôi vì khung Collapse đã có viền
                size="small" 
                className="custom-health-table" // Đồng bộ style bảng
              />
            ) 
          }
        ]} 
      />
    </div>
  );
};