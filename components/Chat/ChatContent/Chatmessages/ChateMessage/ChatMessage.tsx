import Image from 'next/image';
import React, { FC, useState } from 'react';
import { Avatar, AvatarImage, Button } from '@/components/ui';
import { Ellipsis } from 'lucide-react';

interface Iprops {
  date: string;
  userImage: string;
  content: string;

  translateImage: string;
  UserMessage: string;
  isUserMessage: boolean;
}

const ChatMessage: FC<Iprops> = ({
  date,
  userImage,
  content,

  isUserMessage,
}: Iprops) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <div
      className={`flex flex-col gap-10  ${isUserMessage ? 'items-end' : 'items-start'}`}
    >
      <div className="md:flex gap-4 md:items-center sm:flex  sm:items-start">
        {!isUserMessage && (
          <Avatar className="w-14 h-14 md:w-54 md:h-54  rounded-full bg-lightgray mb-4 self-end">
            <AvatarImage src={userImage} alt="Profile Picture" />
          </Avatar>
        )}
        <div
          className={`flex items-center gap-2 ${isUserMessage ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <h1
            className={`font-medium font-montserrat w-full rounded-sm text-14 mb-10 leading-26 py-8 px-5 ${isUserMessage ? 'text-[#4E5D78] bg-gray-50 ' : 'text-white bg-[#377DFF] '}`}
          >
            {content}
          </h1>
          <div className="relative">
            <Ellipsis onClick={toggleDropdown} className="" />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg">
                <Button
                  className="block px-4 py-2 bg-white text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => console.log('Edit clicked')}
                >
                  Edit
                </Button>
                <Button
                  className="block px-4 py-2 text-sm bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => console.log('Delete clicked')}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
        {isUserMessage && (
          <Avatar className="w-14 h-14 md:w-54 md:h-54 rounded-full sm:items-end mb-6 bg-lightgray">
            <AvatarImage src={userImage} alt="Profile Picture" />
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
