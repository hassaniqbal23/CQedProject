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

interface Iprops {
  date?: string;
  userImage: string;
  content?: string;
  isCurrentUser?: boolean;
  onDeleteMessage?: (id: string | number) => void;
  id: string | number;
  showProfile?: boolean;
  showDate?: boolean;
  hasDeleted?: boolean;
  userFullName?: string;
  userId?: number;
  attachments?: IAttachment[];
}

interface IAttachment {
  id: number;
  file_path: string;
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
  hasDeleted,
  attachments = [],
  userFullName,
  userId,
}: Iprops) => {
  const { dispatchEvent } = useEventBus();
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
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
                userImage={userImage}
                userFullName={userFullName}
                userId={userId}
                onChatDelete={() => {
                  dispatchEvent(DELETE_CONVERSATION);
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
            variant="h4"
            weight="medium"
            className={`font-medium font-montserrat max-w-lg rounded-sm text-14 leading-26 p-3 ${isCurrentUser ? 'text-[#4E5D78] bg-gray-50' : 'text-white bg-[#377DFF]'}`}
          >
            {Array.isArray(attachments) && attachments.length > 0 && (
              <div
                className={`grid mb-6 ${attachments.length < 3 ? `grid-cols-${attachments.length}` : 'grid-cols-3'}`}
              >
                {attachments.map((item: IAttachment, index: number) => (
                  <Image
                    src={item.file_path}
                    alt={item.file_path}
                    width={100}
                    height={100}
                    className="w-28 h-28 object-cover rounded-md cursor-pointer "
                    onClick={() => {
                      setPhotoIndex(index);
                      setIsOpen(true);
                    }}
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
            <span>{content}</span>
          </Typography>
          {isCurrentUser && (
            <div className="relative">
              <Dropdown
                trigger={
                  <div>
                    <Ellipsis />
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
        className={isCurrentUser ? 'mr-16' : 'ml-16'}
      >
        {showDate && dayjs(date).fromNow()}
      </Typography>
    </div>
  );
};

export default ChatMessage;
