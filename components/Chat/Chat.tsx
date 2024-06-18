import React, { FC, useEffect } from 'react';
import { ChatSideBar } from './ChatSideBar/ChatSideBar';
import ChatContent from './ChatContent/ChatContent';
import { useQueryClient } from 'react-query';
import { useChatProvider } from './ChatProvider/ChatProvider';
import { Suspense } from 'react';

export interface ChatPageProps {}

export const Chat: FC<ChatPageProps> = (props) => {
  const queryClient = useQueryClient();
  const {
    selectedConversationId,
    conversationFromParams,
    setSelectedConversationId,
    currentConversation,
  } = useChatProvider();

  useEffect(() => {
    setTimeout(() => {
      queryClient.refetchQueries('get-all-conversations');
    });
    return () => {};
  }, []);

  useEffect(() => {
    if (conversationFromParams) {
      setSelectedConversationId(conversationFromParams);
    }
    return () => {};
  }, [conversationFromParams]);

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
    <Suspense>
      <div className="flex w-full">
        <ChatSideBar chat={'Chats'} />
        <ChatContent />
      </div>
    </Suspense>
  );
};
