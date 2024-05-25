import React from 'react';
import ChatMessage from './ChateMessage/ChatMessage';
interface Message {
  id: string | number;
  conversationId: string | number;
  attachment: any;
  message: string;
  receiverId: number | string;
  senderId: number | string;
}

interface IChatMessages {
  messages: Message[];
  user: any;
}

const ChatMessages: React.FC<IChatMessages> = ({ messages, user }) => {
  return (
    <div className="">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          // date={message.date}
          userImage={user.user.attachment.file_name}
          content={message.message}
          // isCurrentUser={message.isUserMessage}
          // translateImage={''}
          // UserMessage={''}
        />
      ))}
    </div>
  );
};

export default ChatMessages;
