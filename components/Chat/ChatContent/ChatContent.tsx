import React, { FC, useEffect, useState } from 'react';
import { ChatHeader } from './ChatHeader/ChatHeader';
import iconMenu from '@/public/IconsMenu.svg';

import { ChatInput } from './ChatInput/ChatInput';
import ChatMessages from './Chatmessages/ChatMessages';
import { useChatGuard } from '../ChatProvider/ChatGuard';
import { useChatFeatures } from '../ChatProvider/ChatProvider';
import NoChatFound from './NoChatFound/NoChatFound';
import { useGlobalState } from '@/app/gobalContext/globalContext';

const ChatContent: FC = () => {
  const { sendMessage } = useChatGuard();
  const { currentConvsersation, inboxResponse } = useChatFeatures();
  const { userInformation } = useGlobalState();

  const onSendMessage = (data: any) => {
    const messageData = {
      message: data.message,
      conversationId: currentConvsersation.id,
      attachment: data.file,
      toId: currentConvsersation.user.id,
      users: currentConvsersation.users,
      senderId: userInformation.id,
      created_at: new Date().toISOString(),
    };
    sendMessage(messageData);
  };
  let NoChatfound =
    inboxResponse && inboxResponse.data.data.length > 0
      ? 'No chat selected'
      : 'No Conversation found';

  return (
    <>
      {currentConvsersation ? (
        <div className="flex flex-col w-full h-[calc(100vh_-_79px)] overflow-hidden bg-white ">
          <div className="sticky top-0 bg-white">
            <ChatHeader
              userImage={
                currentConvsersation.user.attachment?.file_path ||
                '/assets/profile/profile.svg'
              }
              userFullName={currentConvsersation.user.name}
              isOnline={true}
              isTyping={false}
              userId={currentConvsersation.user.id}
            />
          </div>
          <div className="flex-grow overflow-y-auto">
            <ChatMessages user={currentConvsersation.user} />
          </div>
          <div className="sticky bottom-0 bg-white py-3 px-6 border-t">
            <ChatInput onSendMessage={onSendMessage} />
          </div>
        </div>
      ) : (
        <div className="w-full h-[calc(100vh_-_142px)] bg-white">
          <NoChatFound text={NoChatfound} />
        </div>
      )}
    </>
  );
};

export default ChatContent;
