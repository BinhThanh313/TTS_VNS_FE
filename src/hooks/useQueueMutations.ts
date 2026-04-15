import { useMutation } from "@tanstack/react-query";
import { useSocket } from "@/context/SocketContext";
import type { IAddPatientPayload } from "@/types";

export function useAddPatientQueue() {
  const { socket } = useSocket();
  return useMutation({
    mutationFn: async (payload: IAddPatientPayload) => {
      if (!socket) throw new Error("Mất kết nối máy chủ");
      socket.emit("add-patient", payload);
      return payload;
    },
  });
}

export function useCallNextPatient() {
  const { socket } = useSocket();
  return useMutation({
    mutationFn: async (roomId: string) => {
      if (!socket) throw new Error("Mất kết nối máy chủ");
      socket.emit("call-next", roomId);
      return true;
    },
  });
}