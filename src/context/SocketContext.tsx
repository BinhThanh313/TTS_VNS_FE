import React, { createContext, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_SERVER_URL } from "@/constants"; 

const socketInstance = io(SOCKET_SERVER_URL, {
  autoConnect: true,
  // 🔥 THÊM 2 DÒNG NÀY ĐỂ TRÁNH SPAM CONSOLE KHI SERVER TẮT
  reconnectionAttempts: 3, // Chỉ thử kết nối lại tối đa 3 lần rồi bỏ cuộc
  reconnectionDelay: 3000, // Khoảng cách giữa các lần thử là 3 giây
});

interface ISocketContext {
  socket: Socket | null;
}

const SocketContext = createContext<ISocketContext>({ socket: socketInstance });

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    socketInstance.on("connect", () =>
      console.log("✅ FE đã kết nối Socket Server")
    );

    socketInstance.on("connect_error", () => {
      console.warn("⚠️ Socket Server đang tắt. Các tính năng realtime sẽ không hoạt động.");
    });

    return () => {
      socketInstance.off("connect");
      socketInstance.off("connect_error");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketInstance }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);