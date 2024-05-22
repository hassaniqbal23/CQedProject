import React, { FC } from 'react';
import { ChatHeader } from './ChatHeader/ChatHeader';
import iconMenu from '@/public/IconsMenu.svg';
import ChatMessages from './Chatmessages/ChatMessages';
import { ChatInput } from './ChatInput/ChatInput';
const ChatContent: FC = () => {
  return (
    <div className=" w-full">
      <ChatHeader
        userImage={'/assets/profile/profile.svg'}
        userFullName={'ASArtist'}
        description={'Online..'}
        iconMenu={iconMenu}
        Profile={'Profile'}
        Settings={'Settings'}
      />
      <ChatMessages />
      <ChatInput />
    </div>
  );
};

export default ChatContent;
