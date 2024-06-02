import React, { FC, useEffect } from 'react';
import { ChatSideBar } from './ChatSideBar/ChatSideBar';
import ChatContent from './ChatContent/ChatContent';
import { useQueryClient } from 'react-query';
import { useChatFeatures } from './ChatProvider/ChatProvider';
import { useChatGuard } from './ChatProvider/ChatGuard';

export const Chat: FC = () => {
  const queryClient = useQueryClient();
  const { selectedConversationId } = useChatFeatures();

  useEffect(() => {
    const handleOnline = () => {
      queryClient.refetchQueries('get-all-conversations');
      if (selectedConversationId) {
        queryClient.refetchQueries('get-current-chat');
      }
    };
    const handleOffline = () => {};

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [selectedConversationId]);

  return (
    <div className="flex w-full">
      <ChatSideBar chat={'Chats'} />
      <ChatContent />
    </div>
  );
};
