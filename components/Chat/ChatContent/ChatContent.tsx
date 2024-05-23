import React, { FC } from 'react';
import { ChatHeader } from './ChatHeader/ChatHeader';
import iconMenu from '@/public/IconsMenu.svg';

import { ChatInput } from './ChatInput/ChatInput';
import ChatMessages from './Chatmessages/ChatMessages';

const ChatContent: FC = () => {
  return (
    <div className="flex flex-col w-full h-[95vh] overflow-hidden">
      <div className="sticky top-0 bg-white">
        <ChatHeader
          userImage={'/assets/profile/profile.svg'}
          userFullName={'ASArtist'}
          description={'Online..'}
          iconMenu={iconMenu}
          Profile={'Profile'}
          Settings={'Settings'}
        />
      </div>
      <div className="flex-grow overflow-y-auto">
        <ChatMessages />
      </div>
      <div className="sticky bottom-0 bg-white py-3 px-6">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatContent;
