import React, { FC, useEffect, useState } from 'react';
import { ChatHeader } from './ChatHeader/ChatHeader';
import { v4 as uuidv4 } from 'uuid';
import { ChatInput } from './ChatInput/ChatInput';
import ChatMessages from './Chatmessages/ChatMessages';
import { useChatGuard } from '../ChatProvider/ChatGuard';
import { useChatProvider } from '../ChatProvider/ChatProvider';
import NoChatFound from './NoChatFound/NoChatFound';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { deleteConversation } from '@/app/api/chat';
import { useMutation, useQueryClient } from 'react-query';
import { useEventBus } from '../EventBus/EventBus';
import { DELETE_CONVERSATION } from '../EventBus/constants';

const ChatContent: FC = () => {
  const { subscribeEvent, unsubscribeEvent } = useEventBus();
  const { sendMessage } = useChatGuard();
  const {
    currentConversation,
    inboxResponse,
    onConversationDelete,
    setInboxResponse,
    setSelectedConversationId,
  } = useChatProvider();
  const { realtimeConnectedUsersIds, realtimeTypingUsersIds } = useChatGuard();
  const { userInformation } = useGlobalState();

  const queryClient = useQueryClient();

  const onSendMessage = (data: any) => {
    const messageData = {
      clientID: uuidv4(),
      message: data.message,
      conversationId: currentConversation.id,
      attachments: data.attachments.map((file: any) => {
        return { file_path: file.file_path, id: file.id };
      }),
      receiverId: currentConversation.user.id,
      users: currentConversation.users,
      senderId: userInformation.id,
      created_at: new Date().toISOString(),
    };
    setInboxResponse(
      inboxResponse.map((conversation: any) => {
        if (conversation.id === currentConversation.id) {
          return {
            ...conversation,
            messages: [
              ...conversation.messages,
              JSON.parse(JSON.stringify(messageData)),
            ],
            lastMessageReceived: messageData.created_at,
          };
        }
        return conversation;
      })
    );
    sendMessage(messageData);
    const messagesEndRef = document.querySelector('.messagesEndRef');
    if (messagesEndRef) {
      setTimeout(() => {
        messagesEndRef.scrollIntoView({ behavior: 'smooth' });
      }, 10);
    }
  };
  let noChatMessage =
    inboxResponse && inboxResponse.length > 0
      ? 'No chat selected'
      : 'No Conversation found';

  const {
    mutate: handleDeleteConversation,
    isLoading: isDeletingConversation,
  } = useMutation((id: number | string) => deleteConversation(id), {
    onSuccess: (res, id) => {
      onConversationDelete(id);
    },
    onError: (error: any) => {
      console.log(error, 'Error =====> log');
    },
  });

  useEffect(() => {
    const deleteConversationHandler = (id: number) => {
      handleDeleteConversation(id);
    };
    subscribeEvent(DELETE_CONVERSATION, deleteConversationHandler);

    return () => {
      unsubscribeEvent(DELETE_CONVERSATION, deleteConversationHandler);
    };
  }, [currentConversation]);

  return (
    <>
      {currentConversation ? (
        <div className="flex flex-col w-full h-[calc(100vh_-_79px)] overflow-hidden bg-white ">
          <div className="sticky top-0 bg-white">
            <ChatHeader
              conversation={currentConversation}
              isOnline={realtimeConnectedUsersIds.includes(
                currentConversation.user.id
              )}
              isTyping={realtimeTypingUsersIds.includes(
                currentConversation.user.id
              )}
              onDeleteConversations={() => {
                handleDeleteConversation(currentConversation.id);
              }}
            />
          </div>
          <div className="flex-grow h-full overflow-auto">
            <ChatMessages conversation={currentConversation} />
          </div>
          <div className="bottom-0 bg-white py-3 px-6 border-t">
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
