import { useEffect, useState, useCallback } from 'react';
import { useSocket } from '@/context/SocketContext';

export const useDoctorSocket = (roomId: string) => {
  const { socket } = useSocket();
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.emit("join-room", roomId);

    const handleUpdate = (data: any[]) => {
      setList([...data]);
    };

    socket.on("update-queue", handleUpdate);
    
    return () => { 
      socket.off("update-queue", handleUpdate); 
    };
  }, [socket, roomId]);

  // Đóng gói hàm gọi số
  const callNextPatient = useCallback(() => {
    if (list.length > 0) {
      socket?.emit("call-next", roomId);
    }
  }, [socket, roomId, list]);

  return {
    list,
    callNextPatient,
    isQueueEmpty: list.length === 0
  };
};