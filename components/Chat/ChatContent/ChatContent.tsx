import React, { FC, useEffect, useState } from 'react';
import { ChatHeader } from './ChatHeader/ChatHeader';
import iconMenu from '@/public/IconsMenu.svg';

import { ChatInput } from './ChatInput/ChatInput';
import ChatMessages from './Chatmessages/ChatMessages';
import { useChatGuard } from '../ChatProvider/ChatGuard';
import { useChatFeatures } from '../ChatProvider/ChatProvider';
import NoChatFound from './NoChatFound/NoChatFound';
import { useGlobalState } from '@/app/gobalContext/globalContext';
import { deleteConversation } from '@/app/api/chat';
import { useMutation, useQueryClient } from 'react-query';

const ChatContent: FC = () => {
  const { sendMessage } = useChatGuard();
  const { currentConversation, inboxResponse, onConversationDelete } =
    useChatFeatures();
  const { setSelectedConversationId, selectedConversationId } = useChatGuard();
  const { userInformation } = useGlobalState();
  const queryClient = useQueryClient();

  const onSendMessage = (data: any) => {
    const messageData = {
      message: data.message,
      conversationId: currentConversation.id,
      attachment: data.file,
      toId: currentConversation.user.id,
      users: currentConversation.users,
      senderId: userInformation.id,
      created_at: new Date().toISOString(),
    };
    sendMessage(messageData);
  };
  let noChatMessage =
    inboxResponse && inboxResponse.data.data.length > 0
      ? 'No chat selected'
      : 'No Conversation found';

  const {
    mutate: handleDeleteConversation,
    isLoading: isDeletingConversation,
  } = useMutation((id: number | string) => deleteConversation(id), {
    onSuccess: (res, id) => {
      onConversationDelete(id);
      setSelectedConversationId(null);
      queryClient.refetchQueries('get-all-conversations');
    },
    onError: (error: any) => {
      console.log(error, 'Error =====> log');
    },
  });

  return (
    <>
      {currentConversation ? (
        <div className="flex flex-col w-full h-[calc(100vh_-_79px)] overflow-hidden bg-white ">
          <div className="sticky top-0 bg-white">
            <ChatHeader
              userImage={
                currentConversation.user.attachment?.file_path ||
                '/assets/profile/profile.svg'
              }
              userFullName={currentConversation.user.name}
              isOnline={true}
              isTyping={false}
              userId={currentConversation.user.id}
              onDeleteConversations={() => {
                handleDeleteConversation(currentConversation.id);
              }}
            />
          </div>
          <div className="flex-grow overflow-y-auto">
            <ChatMessages user={currentConversation.user} />
          </div>
          <div className="sticky bottom-0 bg-white py-3 px-6 border-t">
            <ChatInput onSendMessage={onSendMessage} />
          </div>
        </div>
      ) : (
        <div className="w-full h-[calc(100vh_-_142px)] bg-white">
          <NoChatFound text={noChatMessage} />
        </div>
      )}
    </>
  );
};

export default ChatContent;
