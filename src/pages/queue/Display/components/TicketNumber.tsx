import { Typography } from 'antd';

interface Props {
  patient: any;
}

export const TicketNumber: React.FC<Props> = ({ patient }) => {
  return (
    <>
      <Typography.Title style={{ color: '#fff', letterSpacing: 3 }}>
        MỜI BỆNH NHÂN VÀO PHÒNG
      </Typography.Title>
      
      <div style={{ 
        fontSize: 250, 
        color: '#fadb14', 
        fontWeight: 900, 
        textShadow: '0 0 40px rgba(250,219,20,0.4)', 
        margin: '20px 0' 
      }}>
        {patient ? patient.stt : "---"}
      </div>
      
      <Typography.Title level={1} style={{ color: '#fff', fontSize: 60 }}>
        {patient ? patient.name : "Vui lòng chờ tới lượt"}
      </Typography.Title>
    </>
  );
};