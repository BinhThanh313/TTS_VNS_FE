import { Form, InputNumber, Input, Row, Col, Checkbox, Space, DatePicker } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { AppButton } from '@/components/common'; // Import từ common

interface Props {
  form: FormInstance;
}

export const BHYTFormSection: React.FC<Props> = ({ form }) => {
  const isOpenBHYT = Form.useWatch('moGiaBHYT', form);

  return (
    <div style={{ marginTop: 24, padding: 16, border: '1px solid #d9d9d9', borderRadius: 8 }}>
      <h3 style={{ color: '#1890ff', marginTop: 0 }}>Thông tin BHYT</h3>
      <Row gutter={16}>
        <Col span={12}><Form.Item name="maTheoTT" label="Mã theo TT" rules={[{ required: true }]}><Input maxLength={25} /></Form.Item></Col>
        <Col span={12}><Form.Item name="tenTheoTT" label="Tên theo TT" rules={[{ required: true }]}><Input maxLength={250} /></Form.Item></Col>
      </Row>

      <Row gutter={16} align="middle">
        <Col span={4}><Form.Item name="moGiaBHYT" valuePropName="checked"><Checkbox>Mở giá BHYT</Checkbox></Form.Item></Col>
        <Col span={5}><Form.Item name="giaDV" label="Giá DV" rules={[{ required: true }]}><InputNumber style={{ width: '100%' }} min={0} formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} /></Form.Item></Col>
        <Col span={5}><Form.Item name="giaBHYT" label="Giá BHYT"><InputNumber style={{ width: '100%' }} min={0} disabled={!isOpenBHYT} /></Form.Item></Col>
        <Col span={5}><Form.Item name="bhytChiTra" label="BHYT chi trả"><InputNumber style={{ width: '100%' }} min={0} disabled={!isOpenBHYT} /></Form.Item></Col>
        <Col span={5}><Form.Item name="tiLeBHYTChiTra" label="Tỉ lệ chi trả (%)"><InputNumber style={{ width: '100%' }} min={0} max={100} disabled={!isOpenBHYT} /></Form.Item></Col>
      </Row>

      <h4 style={{ marginTop: 16 }}>Danh sách giá</h4>
      <Form.List name="lichSuGia">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item {...restField} name={[name, 'giaDV']} rules={[{ required: true }]}><InputNumber placeholder="Giá DV" min={0} /></Form.Item>
                <Form.Item {...restField} name={[name, 'giaBHYT']}><InputNumber placeholder="Giá BHYT" disabled={!isOpenBHYT} /></Form.Item>
                <Form.Item {...restField} name={[name, 'tuNgay']} rules={[{ required: true }]}><DatePicker placeholder="Từ ngày" format="DD/MM/YYYY" /></Form.Item>
                <Form.Item {...restField} name={[name, 'denNgay']} rules={[{ required: true }]}><DatePicker placeholder="Đến ngày" format="DD/MM/YYYY" /></Form.Item>
                <AppButton type="text" danger icon={<DeleteOutlined />} onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <AppButton type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Thêm thông tin giá
              </AppButton>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};