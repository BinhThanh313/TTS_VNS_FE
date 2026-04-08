import { List, Typography } from 'antd';

interface Props {
  dataSource: any[];
}

export const DoctorQueueList: React.FC<Props> = ({ dataSource }) => {
  return (
    <List
      bordered
      dataSource={dataSource}
      locale={{ emptyText: 'Chưa có bệnh nhân chờ' }}
      renderItem={(item, index) => (
        <List.Item style={{ background: index === 0 ? '#e6f7ff' : '#fff' }}>
          <Typography.Text strong style={{ color: '#f5222d', fontSize: 18, width: 80 }}>
            {item.stt}
          </Typography.Text>
          <Typography.Text style={{ fontSize: 16 }}>
            {item.name}
          </Typography.Text>
        </List.Item>
      )}
    />
  );
};