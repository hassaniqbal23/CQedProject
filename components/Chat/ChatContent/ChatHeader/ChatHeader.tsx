import React, { FC } from 'react';
import {
  Avatar,
  AvatarImage,
  Dropdown,
  ChatSidebarSheetDemo,
} from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';
import { EllipsisVertical } from 'lucide-react';
import { ConversationUserSheet } from '../ConversationUserSheet/ConversationUserSheet';
import { ChatUser } from '@/app/gobalContext/types';

interface IProps {
  isOnline: boolean;
  onDeleteConversations?: (id: string | number) => void;
  isTyping?: boolean;
  user: ChatUser;
}

export const ChatHeader: FC<IProps> = ({
  isOnline,
  isTyping,
  user,
  onDeleteConversations,
}: IProps) => {
  return (
    <div className="flex justify-between bg-[#F4F4F4] items-center px-10 mx-0 py-2 w-full">
      <div className="flex gap-3 items-center">
        <ChatSidebarSheetDemo
          trigger={
            <div className="flex gap-3 items-center cursor-pointer">
              <Avatar className="w-14 h-14 md:w-[48px] md:h-[48px] rounded-full bg-lightgray">
                <AvatarImage
                  src={
                    user.user.attachment?.file_path ||
                    '/assets/profile/profile.svg'
                  }
                  alt="Profile Picture"
                />
              </Avatar>
              <div>
                <Typography
                  variant="p"
                  weight="medium"
                  className="text-[#1E1F21] !text-[17px] font-semibold"
                >
                  {user.user.name}
                </Typography>
                <Typography
                  variant="p"
                  weight="medium"
                  className={`text-sm  ${isOnline && !isTyping ? 'text-[#70C670]' : 'text-gray-400'}`}
                >
                  {isTyping ? 'Typing....' : isOnline ? 'Online' : 'Offline'}
                </Typography>
              </div>
            </div>
          }
        >
          <ConversationUserSheet
            user={user}
            onChatDelete={() => {
              onDeleteConversations && onDeleteConversations(user.user.id);
            }}
          />
        </ChatSidebarSheetDemo>
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
                    onDeleteConversations && onDeleteConversations(user.user.id)
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
