import React, { createContext, useContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

// Đưa ra ngoài: Đảm bảo chỉ kết nối ĐÚNG 1 LẦN duy nhất
const socketInstance = io('http://localhost:3000', {
  autoConnect: true,
});

interface SocketContextType { socket: Socket | null; }
const SocketContext = createContext<SocketContextType>({ socket: socketInstance });

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    socketInstance.on('connect', () => console.log('✅ FE đã thông với BE'));
    return () => { socketInstance.off('connect'); };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketInstance }}>
      {children}
    </SocketContext.Provider>
  );
};
export const useSocket = () => useContext(SocketContext);