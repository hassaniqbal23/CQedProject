import React, { FC } from 'react';
import { ChatHeader } from './ChatHeader/ChatHeader';
import iconMenu from '@/public/IconsMenu.svg';

import { ChatInput } from './ChatInput/ChatInput';
import ChatMessages from './Chatmessages/ChatMessages';
import { useChatGuard } from '../ChatProvider/ChatGuard';
import { useChatFeatures } from '../ChatProvider/ChatProvider';
import NoChatFound from './NoChatFound/NoChatFound';

const ChatContent: FC = () => {
  const { sendMessage } = useChatGuard();
  const { currentConvsersation } = useChatFeatures();

  const onSendMessage = (data: any) => {
    const messageData = {
      message: data.message,
      conversationId: currentConvsersation.id,
      attachment: data.file,
      toId: currentConvsersation.user.id,
      users: currentConvsersation.users,
    };
    sendMessage(messageData);
  };
  return (
    <>
      {currentConvsersation ? (
        <div className="flex flex-col w-full h-[95vh] overflow-hidden">
          <div className="sticky top-0 bg-white">
            <ChatHeader
              userImage={'/assets/profile/profile.svg'}
              userFullName={'ASArtist'}
              isOnline={true}
              iconMenu={iconMenu}
              Profile={'Profile'}
              Settings={'Settings'}
            />
          </div>
          <div className="flex-grow overflow-y-auto">
            <ChatMessages
              messages={currentConvsersation.messages}
              user={currentConvsersation.user}
            />
          </div>
          <div className="sticky bottom-0 bg-white py-3 px-6">
            <ChatInput onSendMessage={onSendMessage} />
          </div>
        </div>
      ) : (
        <div>
          <NoChatFound text="No Conversation found" />
        </div>
      )}
    </>
  );
};

export default ChatContent;
