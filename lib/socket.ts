import { getAccessToken } from '@/app/utils/encryption';
import { io } from 'socket.io-client';

let URL = process.env.NEXT_PUBLIC_API_HOST || '';

if (process.env.NODE_ENV === 'production') {
  URL = 'https://cqed-dev.staginguconnect.com';
}

console.log('Connecting to socket server', URL);
export const socket = io(URL, {
  autoConnect: false,
  auth: {
    token: typeof window !== 'undefined' ? getAccessToken() : '',
  },
  transports: ['websocket'],
  upgrade: false,
  forceNew: true,
  reconnectionDelay: 3000,
  reconnection: true,
  reconnectionAttempts: Infinity,
  path: '/api/socket.io',
});

export function connect() {
  const token = getAccessToken();
  if (socket.connected) {
    socket.disconnect();
  }
  socket.auth = { token };
  socket.connect();
}
