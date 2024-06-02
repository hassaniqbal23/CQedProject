import React, { FC } from 'react';
import {
  Avatar,
  AvatarImage,
  Dropdown,
  ChatSidebarSheetDemo,
} from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';
import { EllipsisVertical } from 'lucide-react';
import { ChatSideBar } from '../ChatSidebar/ChatSidebar';

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
      <div className="flex gap-3 items-center">
        <ChatSidebarSheetDemo
          trigger={
            <div className="flex gap-3 items-center cursor-pointer">
              <Avatar className="w-14 h-14 md:w-[48px] md:h-[48px] rounded-full bg-lightgray">
                <AvatarImage src={userImage} alt="Profile Picture" />
              </Avatar>
              <Typography
                variant="body"
                weight="medium"
                className="text-[#1E1F21] text-[17px] font-semibold -mt-5"
              >
                {userFullName}
              </Typography>
            </div>
          }
        >
          <ChatSideBar userImage={userImage} userFullName={userFullName} />
        </ChatSidebarSheetDemo>
        <Typography
          variant="body"
          weight="medium"
          className={`text-sm relative -left-24 top-4 w-[80px] h-[30px] ${isOnline && !isTyping ? 'text-[#70C670]' : 'text-gray-400'} ml-2`}
        >
          {isTyping ? 'Typing....' : isOnline ? 'Online' : 'Offline'}
        </Typography>
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
