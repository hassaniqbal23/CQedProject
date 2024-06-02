import React, { FC, useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui';
import { ExpandableText } from '@/components/common/ExpandableText/ExpandableText';
import { Typography } from '@/components/common/Typography/Typography';
import { useChatGuard } from '../../ChatProvider/ChatGuard';
import { useChatFeatures } from '../../ChatProvider/ChatProvider';

interface IProps {
  conversations: any[];
}

export const ChatUserList: FC<IProps> = ({ conversations }: IProps) => {
  const {
    joinConversation,
    selectedConversationId,
    realtimeConnectedUsersIds,
  } = useChatGuard();
  const { currentConversation } = useChatFeatures();

  const handleSelectConversation = (conversationId: string | number) => {
    if (currentConversation && currentConversation.id === conversationId)
      return;
    joinConversation(conversationId);
  };

  return (
    <div className="flex flex-col gap-3">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          onClick={() => handleSelectConversation(conversation.id)}
        >
          <div
            className={`flex gap-3 p-3 items-center transition-all cursor-pointer rounded-l-lg 
              ${selectedConversationId === conversation.id ? 'bg-primary-50 text-primary-600' : 'hover:bg-primary-50 hover:text-primary-500 active:bg-primary-50'}
            `}
          >
            <div className="relative">
              <Avatar className="w-14 h-14 md:w-[48px] md:h-[48px] rounded-full bg-lightgray">
                <AvatarImage
                  src={
                    conversation.user.attachment?.file_path ||
                    '/assets/profile/profile.svg'
                  }
                  alt="Profile Picture"
                />
              </Avatar>
              {realtimeConnectedUsersIds.includes(conversation.user.id) && (
                <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-[5px] right-0"></div>
              )}
            </div>
            <div>
              <Typography
                className="text-lg font-semibold"
                variant="body"
                weight="medium"
              >
                {conversation.user.name}
              </Typography>
              <ExpandableText
                className="text-sm font-medium"
                text={conversation.lastMessageReceived}
                maxLength={12}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
