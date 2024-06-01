'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { io } from 'socket.io-client';
import type { Socket as SocketType } from 'socket.io-client';
import { toast } from 'sonner';
import { getAccessToken } from '@/app/utils/encryption';

const SocketContext = createContext<{
  socket: SocketType | null;
  setSocket: (socket: SocketType) => void;
  isConnected: boolean;
}>({
  socket: null,
  setSocket: () => {},
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: any) => {
  const [isConnected, setIsConnected] = useState(false);
  const isDisconnectedBefore = useRef(false);
  const [socketInstance, setSocketInstance] = useState<SocketType | null>(null);
  const token = getAccessToken();

  const onConnect = useCallback(() => {
    setIsConnected(true);
    if (!isDisconnectedBefore.current) return;
    toast.dismiss('socket-disconnect');
    toast.success("Back online! You're all set!", {
      id: 'socket-connected',
      position: 'bottom-right',
      closeButton: true,
      duration: 4000,
    });
  }, []);

  const onDisconnect = useCallback(() => {
    isDisconnectedBefore.current = true;
    setIsConnected(false);
    toast.dismiss('socket-connected');
    toast.error('Oh! we lost connection to our servers, connecting...', {
      duration: Infinity,
      id: 'socket-disconnect',
      position: 'bottom-right',
      closeButton: true,
    });
  }, []);

  const onConnectError = useCallback(() => {
    isDisconnectedBefore.current = true;
    toast.dismiss('socket-connected');
    toast.error('Oh! we lost connection to our servers, connecting...', {
      duration: 15000,
      id: 'socket-disconnect',
      position: 'bottom-right',
      closeButton: true,
    });
  }, []);

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

      socket.on('connect', onConnect);
      socket.on('disconnect', onDisconnect);
      socket.on('connect_error', onConnectError);

      return () => {
        socket.off('connect', onConnect);
        socket.off('disconnect', onDisconnect);
        socket.off('connect_error', onConnectError);
        socket.disconnect();
      };
    } else {
      setSocketInstance(null);
    }
  }, [token]);

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        socket: socketInstance,
        setSocket: setSocketInstance,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
