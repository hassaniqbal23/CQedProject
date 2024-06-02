import { getAccessToken } from '@/app/utils/encryption';
import { io } from 'socket.io-client';

const URL = process.env.NEXT_PUBLIC_API_HOST || '';

const options = {
  autoConnect: false,
  auth: {
    token: typeof window !== 'undefined' ? getAccessToken() : '',
  },
  transport: ['websocket'],
  upgrade: false,
  forceNew: true,
  reconnectionDelay: 3000,
  reconnection: true,
  reconnectionAttempts: Infinity,
  jsonp: false,
};

console.log('Connecting to socket server', URL);
export const socket = io(URL, options);

export function connect() {
  const token = getAccessToken();
  if (socket.connected) {
    socket.disconnect();
  }
  socket.auth = { token };
  socket.connect();
}
