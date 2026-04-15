import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSocket } from "@/context/SocketContext";
import { queueService } from "@/services";
import { speakVietnamese } from "@/utils";
import type { IPatient } from "@/types";

// Hook lấy danh sách hàng đợi (Dùng cho Bác sĩ)
export function useQueueList(roomId: string) {
  const { socket } = useSocket();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["queue", roomId],
    queryFn: () => queueService.getInitialQueue(roomId),
    initialData: [],
  });

  useEffect(() => {
    if (!socket) return;
    socket.emit("join-room", roomId);
    
    const handleUpdate = (data: IPatient[]) => {
      queryClient.setQueryData(["queue", roomId], data); // Ghi đè Cache ngay lập tức
    };

    socket.on("update-queue", handleUpdate);
    return () => { socket.off("update-queue", handleUpdate); };
  }, [socket, roomId, queryClient]);

  return query;
}

// Hook lắng nghe bệnh nhân đang gọi (Dùng cho Tivi)
export function useDisplayListener(roomId: string, isReady: boolean) {
  const { socket } = useSocket();
  const [callingPatient, setCallingPatient] = useState<IPatient | null>(null);

  useEffect(() => {
    if (!socket) return;
    socket.emit("join-room", roomId);

    const handleCall = (patient: IPatient) => {
      setCallingPatient(patient);
      if (isReady) {
        speakVietnamese(`Mời bệnh nhân ${patient.name}, số ${patient.stt}, vào phòng khám.`);
      }
    };

    socket.on("patient-calling", handleCall);
    return () => { socket.off("patient-calling", handleCall); };
  }, [socket, roomId, isReady]);

  return callingPatient;
}