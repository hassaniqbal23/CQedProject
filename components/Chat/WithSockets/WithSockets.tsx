'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import type { Socket as SocketType } from 'socket.io-client';
// import { parseCookies } from 'nookies';
import { getAccessToken } from '@/app/utils/encryption';

const SocketContext = createContext<{
  socket: SocketType | null;
  setSocket: (socket: SocketType) => void;
}>({
  socket: null,
  setSocket: () => {},
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: any) => {
  const [socketInstance, setSocketInstance] = useState<SocketType | null>(null);
  const token = getAccessToken();

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_HOST || '';
    const options = {
      auth: {
        token: typeof window !== 'undefined' ? token : '',
      },
      transport: ['websocket'],
      upgrade: false,
      forceNew: true,
      reconnectionDelay: 3000,
      reconnection: true,
      reconnectionAttempts: Infinity,
      jsonp: false,
    };
    if (token) {
      const socket = io(url, options);

      setSocketInstance(socket);

      console.log(socket);

      // Cleanup function
      return () => {
        socket.disconnect();
      };
    } else {
      setSocketInstance(null);
    }
  }, [token]);

  return (
    <SocketContext.Provider
      value={{ socket: socketInstance, setSocket: setSocketInstance }}
    >
      {children}
    </SocketContext.Provider>
  );
};
