import Image from 'next/image';
import React, { FC } from 'react';
import { Avatar, AvatarImage } from '@/components/ui';
import { Ellipsis } from 'lucide-react';

interface Iprops {
  date: string;
  userImage: string;
  content: string;
  hoursago: string;
  Translate: string;
  translateImage: string;
  UserMessage: string;
  isUserMessage: boolean;
}

const ChatMessage: FC<Iprops> = ({
  date,
  userImage,
  content,
  hoursago,
  Translate,
  translateImage,
  UserMessage,
  isUserMessage,
}: Iprops) => {
  return (
    <div
      className={`flex flex-col gap-10 ${isUserMessage ? 'items-end' : 'items-start'}`}
    >
      <div className="flex gap-4 items-center">
        {!isUserMessage && (
          <Avatar className="w-14 h-14 md:w-54 md:h-54 lg:w-14 lg:h-14 sm:w-14 sm:h-14 rounded-full bg-lightgray">
            <AvatarImage src={userImage} alt="Profile Picture" />
          </Avatar>
        )}
        <div
          className={`flex items-center gap-2 ${isUserMessage ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <h1
            className={`font-medium font-montserrat w-1/3 rounded-sm text-14  leading-26 py-8 px-5 ${isUserMessage ? 'text-[#4E5D78] bg-[#FFF]' : 'text-white bg-[#377DFF]'}`}
          >
            {content}
          </h1>
          <Ellipsis />
        </div>
        {isUserMessage && (
          <Avatar className="w-14 h-14 md:w-54 md:h-54 rounded-full bg-lightgray">
            <AvatarImage src={userImage} alt="Profile Picture" />
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
