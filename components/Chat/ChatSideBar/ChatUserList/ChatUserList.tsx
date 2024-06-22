import React, { FC, useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '@/components/ui';
import { ExpandableText } from '@/components/common/ExpandableText/ExpandableText';
import { Typography } from '@/components/common/Typography/Typography';
import { useChatGuard } from '../../ChatProvider/ChatGuard';
import { useChatProvider } from '../../ChatProvider/ChatProvider';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { useSearchParams } from 'next/navigation';

interface IProps {
  conversations: any[];
}

export const ChatUserList: FC<IProps> = ({ conversations }: IProps) => {
  const { userInformation } = useGlobalState();
  const searchParams = useSearchParams();
  const {
    joinConversation,
    realtimeConnectedUsersIds,
    realtimeTypingUsersIds,
  } = useChatGuard();
  const {
    currentConversation,
    selectedConversationId,
    setSelectedConversationId,
  } = useChatProvider();

  useEffect(() => {
    const param = new URLSearchParams(searchParams?.toString()).get(
      'conversation'
    );
    if (param) {
      const conversation = conversations.find(
        (conversation) => conversation.id === +param
      );
      if (conversation && conversation.id === +param) {
        setSelectedConversationId(conversation.id);
        return;
      }
      joinConversation(+param);
    }
  }, [searchParams]);

  useEffect(() => {
    const param = new URLSearchParams(searchParams?.toString()).get(
      'conversation'
    );
    if (param) {
      const conversation = conversations.find(
        (conversation) => conversation.id === +param
      );
      if (conversation && conversation.id === +param) {
        setSelectedConversationId(conversation.id);
        return;
      }
      joinConversation(+param);
    }
  }, [searchParams]);

  const handleSelectConversation = (conversationId: string | number) => {
    if (currentConversation && currentConversation.id === conversationId) {
      return;
    }
    setCurrentConversationToParams(conversationId);
    joinConversation(conversationId);
  };

  function setCurrentConversationToParams(conversationId: number | string) {
    if (searchParams) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('conversation', conversationId as string);
      window.history.pushState(null, '', `?${params.toString()}`);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      {conversations.map((conversation) => {
        let lastMessage =
          conversation.messages[conversation.messages.length - 1];

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
