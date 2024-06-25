import { IMessage } from '@/app/globalContext/types';
import { IUser } from './global';

export interface ChatConversation {
  user: IUser;
  id: number;
  lastMessageReceived: string;
  messages: IMessage[];
  schoolId: number | string;
  users: number[];
  unread_count: number;
}
