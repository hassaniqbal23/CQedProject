import React, { FC, useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui';
import { ExpandableText } from '@/components/common/ExpandableText/ExpandableText';
import { Typography } from '@/components/common/Typography/Typography';
import { useChatGuard } from '../../ChatProvider/ChatGuard';
import { useChatFeatures } from '../../ChatProvider/ChatProvider';
import { useGlobalState } from '@/app/gobalContext/globalContext';

interface IProps {
  conversations: any[];
}

export const ChatUserList: FC<IProps> = ({ conversations }: IProps) => {
  const { userInformation } = useGlobalState();
  const {
    joinConversation,
    realtimeConnectedUsersIds,
    realtimeTypingUsersIds,
  } = useChatGuard();
  const {
    currentConversation,
    selectedConversationId,
    setSelectedConversationId,
  } = useChatFeatures();

  const handleSelectConversation = (conversationId: string | number) => {
    if (currentConversation && currentConversation.id === conversationId) {
      setSelectedConversationId(currentConversation.id);
      return;
    }
    joinConversation(conversationId);
  };

  const sortedConversation = React.useMemo(() => {
    return conversations.sort((a, b) => {
      return (
        new Date(b.lastMessageReceived).getTime() -
        new Date(a.lastMessageReceived).getTime()
      );
    });
  }, [conversations]);

  return (
    <div className="flex flex-col gap-3">
      {sortedConversation.map((conversation) => {
        let lastMessage = conversation.messages[0];
        let lastMessageTXT = '';

        if (
          realtimeTypingUsersIds.includes(conversation.user.id) &&
          userInformation.id !== conversation.user.id &&
          selectedConversationId !== conversation.id
        ) {
          lastMessageTXT = 'Typing...';
        } else if (lastMessage) {
          if (lastMessage.senderId == userInformation.id) {
            lastMessageTXT = `You: ${lastMessage.message}`;
          } else {
            lastMessageTXT = lastMessage.message;
          }
        }

        return (
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
                  text={lastMessageTXT}
                  maxLength={20}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
