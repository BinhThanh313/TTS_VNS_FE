import { message } from "antd";
import { useQueueList, useCallNextPatient } from "@/hooks";

export function useDoctorActionLogic(roomId: string) {
  const { data: queueList } = useQueueList(roomId);
  const callMutation = useCallNextPatient();

  const handleCallNext = async () => {
    if (queueList.length === 0) return;
    try {
      await callMutation.mutateAsync(roomId);
    } catch (error) {
      message.error("Lỗi gọi bệnh nhân!");
    }
  };

  return { queueList, handleCallNext, isQueueEmpty: queueList.length === 0, isCalling: callMutation.isPending };
}