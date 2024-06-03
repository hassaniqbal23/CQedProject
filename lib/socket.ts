import { getAccessToken } from '@/app/utils/encryption';
import { io } from 'socket.io-client';

let NEXT_PUBLIC_API_HOST = process.env.NEXT_PUBLIC_API_HOST || '';
let URL = process.env.NEXT_PUBLIC_API_HOST || '';

if (URL.includes('/api')) {
  URL = URL.replace('/api', '');
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
  path: NEXT_PUBLIC_API_HOST.includes('/api') ? '/api/socket.io' : '/socket.io',
});

export function connect() {
  const token = getAccessToken();
  if (socket.connected) {
    socket.disconnect();
  }
  socket.auth = { token };
  socket.connect();
}
