'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { socket, connect } from '@/lib/socket';

const SocketContext = createContext<{
  isConnected: boolean;
}>({
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: any) => {
  const { isAuthenticated } = useGlobalState();
  const [isConnected, setIsConnected] = useState(false);
  const isDisconnectedBefore = useRef(false);

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
    console.log('isAuthenticated', isAuthenticated);
    if (isAuthenticated) {
      connect();

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
      socket.disconnect();
    }
  }, [isAuthenticated]);

  return (
    <SocketContext.Provider
      value={{
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
