import Image from 'next/image';
import React, { FC, useState } from 'react';
import { Avatar, AvatarImage, ChatSidebarSheetDemo } from '@/components/ui';
import { Ellipsis } from 'lucide-react';
import { Dropdown } from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { ConversationUserSheet } from '../../ConversationUserSheet/ConversationUserSheet';
import { DELETE_CONVERSATION } from '@/components/Chat/EventBus/constants';
import { useEventBus } from '@/components/Chat/EventBus/EventBus';
import { IAttachment, IMessage } from '@/app/globalContext/types';
import { ChatConversation } from '@/types/chat';

interface Iprops {
  userImage?: string;
  isCurrentUser?: boolean;
  onDeleteMessage?: (id: string | number) => void;
  showProfile?: boolean;
  showDate?: boolean;
  hasDeleted?: boolean;
  conversation: ChatConversation;
  messages?: IMessage;
}

dayjs.extend(relativeTime);

const ChatMessage: FC<Iprops> = ({
  userImage,
  isCurrentUser,
  onDeleteMessage,
  showDate,
  showProfile,
  hasDeleted,
  conversation,
  messages,
}: Iprops) => {
  const { dispatchEvent } = useEventBus();
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const attachments = messages?.attachments ?? [];
  const messageContent = messages?.message ?? '';
  const createdAt = messages?.created_at ?? '';

  if (hasDeleted) return null;
  return (
    <div
      className={`flex flex-col gap-1 mb-5 ${isCurrentUser ? 'items-end' : 'items-start'}`}
    >
      <div
        className={`flex gap-2 items-start group ${isCurrentUser ? 'flex-row-reverse' : ''}`}
      >
        {showProfile ? (
          isCurrentUser ? (
            <Avatar className="w-14 h-14 rounded-full bg-lightgray">
              <AvatarImage src={userImage} alt="Profile Picture" />
            </Avatar>
          ) : (
            <ChatSidebarSheetDemo
              trigger={
                <Avatar className="w-14 h-14 rounded-full bg-lightgray cursor-pointer">
                  <AvatarImage src={userImage} alt="Profile Picture" />
                </Avatar>
              }
            >
              <ConversationUserSheet
                conversation={conversation}
                onChatDelete={() => {
                  dispatchEvent(DELETE_CONVERSATION, null);
                }}
              />
            </ChatSidebarSheetDemo>
          )
        ) : (
          <div className="w-14 h-14 rounded-full" />
        )}
        <div
          className={`flex items-center ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <Typography
            variant="p"
            weight="medium"
            className={`font-medium font-montserrat max-w-lg rounded-sm text-14 leading-26 p-3 ${isCurrentUser ? 'text-[#4E5D78] bg-gray-100' : 'text-white bg-primary-500'}`}
          >
            {Array.isArray(attachments) && attachments.length > 0 && (
              <div
                className={`grid mb-6 ${attachments.length < 3 ? `grid-cols-${attachments.length}` : 'grid-cols-3'}`}
              >
                {attachments.map((item: IAttachment, index: number) => (
                  <Image
                    key={index}
                    src={item.file_path}
                    alt={item.file_path}
                    width={100}
                    height={100}
                    className="w-28 h-28 object-cover rounded-md cursor-pointer"
                    onClick={() => {
                      setPhotoIndex(index);
                      setIsOpen(true);
                    }}
                    unoptimized={true}
                  />
                ))}
                {isOpen && (
                  <Lightbox
                    mainSrc={attachments[photoIndex].file_path}
                    nextSrc={
                      attachments[(photoIndex + 1) % attachments.length]
                        .file_path
                    }
                    prevSrc={
                      attachments[
                        (photoIndex + attachments.length - 1) %
                          attachments.length
                      ].file_path
                    }
                    onCloseRequest={() => setIsOpen(false)}
                    onMovePrevRequest={() =>
                      setPhotoIndex(
                        (photoIndex + attachments.length - 1) %
                          attachments.length
                      )
                    }
                    onMoveNextRequest={() =>
                      setPhotoIndex((photoIndex + 1) % attachments.length)
                    }
                  />
                )}
              </div>
            )}
            <span>{messageContent}</span>
          </Typography>
          {isCurrentUser && (
            <div className="relative">
              <Dropdown
                trigger={
                  <div className="mr-2 cursor-pointer">
                    <Ellipsis size={16} />
                  </div>
                }
                options={[
                  {
                    content: (
                      <div
                        onClick={() =>
                          onDeleteMessage && onDeleteMessage(messages?.id ?? '')
                        }
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
        className={isCurrentUser ? 'mr-16' : 'ml-16'}
      >
        {showDate && dayjs(createdAt).fromNow()}
      </Typography>
    </div>
  );
};

export default ChatMessage;
