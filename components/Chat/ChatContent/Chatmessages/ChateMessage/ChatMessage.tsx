import Image from 'next/image';
import React, { FC } from 'react';
import { Avatar, AvatarImage } from '@/components/ui';
import { Ellipsis } from 'lucide-react';
import { Dropdown } from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

interface Iprops {
  date?: string;
  userImage: string;
  content?: string;
  translateImage?: string;
  isCurrentUser?: boolean;
  onDeleteMessage?: (id: string | number) => void;
  id: string | number;
  showProfile?: boolean;
  showDate?: boolean;
}

dayjs.extend(relativeTime);

const ChatMessage: FC<Iprops> = ({
  date,
  userImage,
  content,
  isCurrentUser,
  id,
  onDeleteMessage,
  showDate,
  showProfile,
}: Iprops) => {
  return (
    <div
      className={`flex flex-col gap-1 mb-5 ${isCurrentUser ? 'items-end' : 'items-start'}`}
    >
      <div
        className={`flex gap-2 items-start group ${isCurrentUser ? 'flex-row-reverse' : ''}`}
      >
        {showProfile ? (
          <Avatar className="w-14 h-14 rounded-full bg-lightgray">
            <AvatarImage src={userImage} alt="Profile Picture" />
          </Avatar>
        ) : (
          <div className="w-14 h-14 rounded-full" />
        )}
        <div
          className={`flex items-center ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <Typography
            variant="h4"
            weight="medium"
            className={`font-medium font-montserrat max-w-lg rounded-sm text-14 leading-26 p-3 ${isCurrentUser ? 'text-[#4E5D78] bg-gray-50' : 'text-white bg-[#377DFF]'}`}
          >
            {content}
          </Typography>
          {isCurrentUser && (
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
                      <div
                        onClick={() => onDeleteMessage && onDeleteMessage(id)}
                      >
                        Delete Message
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          )}
        </div>
      </div>
      <Typography
        variant="p"
        weight="medium"
        className={isCurrentUser ? 'mr-14' : 'ml-14'}
      >
        {showDate && dayjs(date).fromNow()}
      </Typography>
    </div>
  );
};

export default ChatMessage;
