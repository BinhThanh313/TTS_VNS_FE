import { useCallback } from 'react';
import { message } from 'antd';
import { useSocket } from '@/context/SocketContext';

export const useReceptionSocket = (roomId: string) => {
  const { socket } = useSocket();

  const addPatient = useCallback((patientName: string) => {
    if (!socket) {
      message.error("Lỗi: Chưa kết nối đến máy chủ Hàng đợi!");
      return false;
    }

    const newPatient = {
      id: Date.now(),
      name: patientName.toUpperCase(),
      stt: Math.floor(100 + Math.random() * 900), // Random số 100-999
    };
    
    socket.emit("add-patient", { roomId, patient: newPatient });
    message.success(`Đã cấp STT: ${newPatient.stt} cho bệnh nhân ${newPatient.name}`);
    return true; 
  }, [socket, roomId]);

  return { addPatient };
};