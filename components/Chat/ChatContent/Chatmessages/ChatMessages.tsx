import React from 'react';
import ChatMessage from './ChateMessage/ChatMessage';

interface Message {
  date: string;
  userImage: string;
  content: string;
  isUserMessage: boolean;
}

const messages: Message[] = [
  {
    date: '2021-10-10',
    userImage: '/assets/profile/profile.svg',
    content: '尽管我们的文化背景和生活方式完全不同',

    isUserMessage: false,
  },
  {
    date: '2021-10-10',
    userImage: '/assets/profile/profile.svg',
    content: '尽管我们的文化背景和生活方式完全不同',

    isUserMessage: true,
  },
  {
    date: '2021-10-10',
    userImage: '/assets/profile/profile.svg',
    content:
      'I’ve a beautiful family of penpals who write to me on a constant basis and they never fail to bring a smile to my face.',

    isUserMessage: false,
  },

  {
    date: '2021-10-10',
    userImage: '/assets/profile/profile.svg',
    content:
      'I’ve a beautiful family of penpals who write to me on a constant basis and they never fail to bring a smile to my face.',

    isUserMessage: true,
  },
];

const ChatMessages: React.FC = () => {
  return (
    <div className=" m-10 ">
      {messages.map((message, index) => (
        <ChatMessage
          key={index}
          date={message.date}
          userImage={message.userImage}
          content={message.content}
          isUserMessage={message.isUserMessage}
          translateImage={''}
          UserMessage={''}
        />
      ))}
    </div>
  );
};

export default ChatMessages;
