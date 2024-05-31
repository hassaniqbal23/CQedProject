import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChateMessage/ChatMessage';
import { useGlobalState } from '@/app/gobalContext/globalContext';
import { useChatFeatures } from '../../ChatProvider/ChatProvider';
interface Message {
  id: string | number;
  conversationId: string | number;
  attachment: any;
  message: string;
  receiverId: number | string;
  senderId: number | string;
}

interface IChatMessages {
  user: any;
}

const ChatMessages: React.FC<IChatMessages> = ({ user }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { userInformation } = useGlobalState();
  const { currentConversationMessages, memoizedMessagesList } =
    useChatFeatures();
  console.log(memoizedMessagesList, 'memoizedMessagesList');
  const messages = [...currentConversationMessages];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="p-3">
      {messages.map((message: any, index) => {
        return (
          <ChatMessage
            key={index}
            id={message.id}
            date={message.created_at}
            showProfile={message.showProfile}
            showDate={message.showDate}
            userImage={
              (message.toId && message.toId !== userInformation.id) ||
              message.senderId === userInformation.id
                ? userInformation.attachment.file_path
                : user?.attachment?.file_path || '/assets/profile/profile.svg'
            }
            content={message.message}
            isCurrentUser={
              (message.toId && message.toId !== userInformation.id) ||
              message.senderId === userInformation.id
            }
          />
        );
      })}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatMessages;
