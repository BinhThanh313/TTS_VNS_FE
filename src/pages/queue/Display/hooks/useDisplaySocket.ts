import { useEffect, useState } from 'react';
import { useSocket } from '@/context/SocketContext';
import { speakVietnamese } from '../utils/speech';

export const useDisplaySocket = (roomId: string) => {
  const { socket } = useSocket();
  const [callingPatient, setCallingPatient] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!socket) return;
    
    socket.emit("join-room", roomId);

    const handleCall = (patient: any) => {
      setCallingPatient(patient);
      if (isReady) {
        speakVietnamese(`Mời bệnh nhân ${patient.name}, số ${patient.stt}, vào phòng khám.`);
      }
    };

    socket.on("patient-calling", handleCall);
    return () => { socket.off("patient-calling", handleCall); };
  }, [socket, roomId, isReady]);

  return { callingPatient, isReady, setIsReady };
};