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
import { ChatConversation } from '@/types/chat';
import { format, isValid } from 'date-fns';

interface IProps {
  isOnline: boolean;
  onDeleteConversations?: (id: string | number) => void;
  isTyping?: boolean;
  conversation: ChatConversation;
}

export const ChatHeader: FC<IProps> = ({
  isOnline,
  isTyping,
  conversation,
  onDeleteConversations,
}: IProps) => {
  let lastOnlineDate = 'last active unknown';
  if (isValid(new Date(conversation.user.last_active))) {
    lastOnlineDate =
      'last active at ' +
      format(
        new Date(conversation.user.last_active),
        "MMMM dd yyyy 'at' hh:mm a"
      ).toLowerCase();
  }
  return (
    <div className="flex justify-between bg-[#F4F4F4] items-center px-10 mx-0 py-2 w-full">
      <div className="flex gap-3 items-center">
        <ChatSidebarSheetDemo
          trigger={
            <div className="flex gap-3 items-center cursor-pointer">
              <Avatar className="w-14 h-14 md:w-[48px] md:h-[48px] rounded-full bg-lightgray">
                <AvatarImage
                  src={
                    conversation.user.attachment?.file_path ||
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
                  {conversation.user.name}
                </Typography>
                <Typography
                  variant="p"
                  weight="medium"
                  className={`text-sm  ${isOnline && !isTyping ? 'text-[#70C670]' : 'text-gray-400'}`}
                >
                  {isTyping
                    ? 'Typing....'
                    : isOnline
                      ? 'Online'
                      : lastOnlineDate}
                </Typography>
              </div>
            </div>
          }
        >
          <ConversationUserSheet
            conversation={conversation}
            onChatDelete={() => {
              onDeleteConversations &&
                onDeleteConversations(conversation.user.id);
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
                    onDeleteConversations &&
                    onDeleteConversations(conversation.user.id)
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
