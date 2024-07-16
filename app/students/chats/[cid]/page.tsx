import { Chat } from '@/components/Chat/Chat';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chat - GCED',
  description: 'Chat - GCED',
};

export default function TeacherChatsCommunities() {
  return (
    <div>
      <Chat />
    </div>
  );
}
