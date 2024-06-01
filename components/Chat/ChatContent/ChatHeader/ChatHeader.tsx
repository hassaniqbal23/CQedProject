import React, { FC, useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dropdown,
} from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/common/Typography/Typography';
import { Ellipsis, EllipsisVertical } from 'lucide-react';
interface IProps {
  userImage: string;
  userFullName: string;
  isOnline: boolean;
  onDeleteConversations?: (id: string | number) => void;
  userId: string | number;
  isTyping?: boolean;
}

export const ChatHeader: FC<IProps> = ({
  userImage,
  userFullName,
  isOnline,
  userId,
  isTyping,
  onDeleteConversations,
}: IProps) => {
  return (
    <div className="flex justify-between bg-[#F4F4F4] items-center px-10 mx-0 py-2 w-full">
      <div className="flex gap-3 justify-center items-center">
        <div>
          <Avatar className="w-14 h-14 md:w-[48px] md:h-[48px] rounded-full bg-lightgray">
            <AvatarImage src={userImage} alt="Profile Picture" />
          </Avatar>
        </div>
        <div>
          <Typography
            variant="body"
            weight="medium"
            className="text-[#1E1F21] text-[17px] font-semibold"
          >
            {userFullName}
          </Typography>
          <Typography
            variant="body"
            weight="medium"
            className={`text-sm ${isOnline && !isTyping ? 'text-[#70C670]' : 'text-gray-400'}`}
          >
            {isTyping ? 'Typing....' : isOnline ? 'Online' : 'Offline'}
          </Typography>
        </div>
      </div>

      <div className="relative">
        <Dropdown
          trigger={
            <div>
              <EllipsisVertical className="cursor-pointer" />
            </div>
          }
          options={[
            {
              content: (
                <div
                  onClick={() =>
                    onDeleteConversations && onDeleteConversations(userId)
                  }
                >
                  Delete Conversation
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};
