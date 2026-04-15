import { Card, Badge, List, Typography } from "antd";
import { Volume2 } from "lucide-react";
import { AppButton } from "@/components/common";
import { useDoctorActionLogic } from "./useDoctorActionLogic";

export const DoctorScreen = () => {
  const { queueList, handleCallNext, isQueueEmpty, isCalling } = useDoctorActionLogic("PHONG_101");

  return (
    <div className="p-6 max-w-[600px] mx-auto bg-white h-full">
      <Card 
        title={<span className="text-blue-700 font-bold text-lg">👨‍⚕️ Bác sĩ - Phòng Khám 101</span>} 
        extra={<Badge count={queueList.length} showZero color="#52c41a" />}
        className="border-0 shadow-sm"
      >
        <AppButton type="primary" size="large" block icon={<Volume2 size={20} />} onClick={handleCallNext} disabled={isQueueEmpty} loading={isCalling} className="mb-6 h-14 text-lg font-bold bg-blue-600">
          GỌI BỆNH NHÂN TIẾP THEO
        </AppButton>

        <List
          bordered
          dataSource={queueList}
          locale={{ emptyText: "Chưa có bệnh nhân chờ" }}
          renderItem={(item, index) => (
            <List.Item className={index === 0 ? "bg-blue-50" : "bg-white"}>
              <Typography.Text strong className="text-red-500 text-lg w-20 inline-block">{item.stt}</Typography.Text>
              <Typography.Text className="text-base font-medium text-gray-700">{item.name}</Typography.Text>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};