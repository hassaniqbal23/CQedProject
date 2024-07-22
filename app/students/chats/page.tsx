import { Chat } from '@/components/Chat/Chat';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat - GCED',
  description: 'Chat - GCED',
  icons: '/favi.png',
};

export default function TeacherChatsCommunities() {
  return (
    <div>
      <Chat />
    </div>
  );
}
