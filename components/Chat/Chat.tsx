import React, { FC } from 'react';
import { ChatSideBar } from './ChatSideBar/ChatSideBar';
import ChatContent from './ChatContent/ChatContent';

export const Chat: FC = () => {
  return (
    <div className="flex w-full">
      <ChatSideBar chat={'Chats'} />
      <ChatContent />
    </div>
  );
};
