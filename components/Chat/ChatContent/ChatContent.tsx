import React, { FC } from 'react';
import { ChatHeader } from './ChatHeader/ChatHeader';
import iconMenu from '@/public/IconsMenu.svg';
import ChatMessages from './Chatmessages/ChatMessages';
const ChatContent: FC = () => {
  return (
    <div className="m-4 w-full">
      <ChatHeader
        userImage={'/assets/profile/profile.svg'}
        userFullName={'ASArtist'}
        description={'Online..'}
        iconMenu={iconMenu}
        Profile={'Profile'}
        Settings={'Settings'}
      />
      <ChatMessages />
    </div>
  );
};

export default ChatContent;
