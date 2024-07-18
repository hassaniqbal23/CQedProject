import { Chat } from '@/components/Chat/Chat';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Chats - Teacher - GCED',
  description: 'Chats - Teacher - GCED',
  icons: '/favi.png',
};

export default function TeacherChatsCommunities() {
  return (
    <div>
      <Chat />
    </div>
  );
}
