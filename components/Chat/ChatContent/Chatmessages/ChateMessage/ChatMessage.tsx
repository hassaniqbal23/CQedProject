import Image from 'next/image';
import React, { FC } from 'react';
import { Avatar, AvatarImage } from '@/components/ui';
import { Ellipsis } from 'lucide-react';
import { Dropdown } from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';

interface Iprops {
  date?: string;
  userImage: string;
  content?: string;
  translateImage?: string;
  isCurrentUser?: boolean;
  onDeleteMessage?: (id: string | number) => void;
  id: string | number;
}

const ChatMessage: FC<Iprops> = ({
  date,
  userImage,
  content,
  isCurrentUser,
  id,
  onDeleteMessage,
}: Iprops) => {
  return (
    <div
      className={`flex flex-col m-10 gap-4 ${isCurrentUser ? 'items-end' : 'items-start'}`}
    >
      <div
        className={`flex gap-4 items-start group ${isCurrentUser ? 'flex-row-reverse' : ''}`}
      >
        <Avatar className="w-14 h-14 rounded-full bg-lightgray">
          <AvatarImage src={userImage} alt="Profile Picture" />
        </Avatar>
        <div
          className={`flex items-center gap-2 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <Typography
            variant="h4"
            weight="medium"
            className={`font-medium font-montserrat max-w-lg rounded-sm text-14 leading-26 p-3 ${isCurrentUser ? 'text-[#4E5D78] bg-gray-50' : 'text-white bg-[#377DFF]'}`}
          >
            {content}
          </Typography>
          <div className="relative">
            <Dropdown
              trigger={
                <div>
                  <Ellipsis className="cursor-pointer group-hover:block hidden" />
                </div>
              }
              options={[
                {
                  content: (
                    <div onClick={() => onDeleteMessage && onDeleteMessage(id)}>
                      Delete Message
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>
      <Typography variant="p" weight="medium">
        {date}
      </Typography>
    </div>
  );
};

export default ChatMessage;
