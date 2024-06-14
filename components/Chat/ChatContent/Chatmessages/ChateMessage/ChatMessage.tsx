import Image from 'next/image';
import React, { FC, useState } from 'react';
import { Avatar, AvatarImage, ChatSidebarSheetDemo } from '@/components/ui';
import { CircleX, Cross, Ellipsis, Languages } from 'lucide-react';
import { Dropdown } from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { ConversationUserSheet } from '../../ConversationUserSheet/ConversationUserSheet';
import { DELETE_CONVERSATION } from '@/components/Chat/EventBus/constants';
import { useEventBus } from '@/components/Chat/EventBus/EventBus';
import { useMutation } from 'react-query';
import { translateMessage } from '@/app/api/chat';
import Loading from '@/components/ui/button/loading';
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
  const attachments = messages?.attachments ?? [];
  const messageContent = messages?.message ?? '';
  const createdAt = messages?.created_at ?? '';

  const { dispatchEvent } = useEventBus();
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [translatedMessage, setTranslatedMessage] = useState<string | null>(
    null
  );
  const [showTranslatedMessage, setShowTranslatedMessage] = useState(false);
  if (hasDeleted) return null;

  const { isLoading, mutate: translate } = useMutation(
    ['translateMessage', messageContent, 'en'],
    (message: string, to: string = 'en') => translateMessage(message, to),
    {
      onSuccess: (data) => {
        const rawTranslation = data.translations[0].translation;
        const validJsonString = rawTranslation.replace(' and more"', '');

        try {
          const parsedTranslation = JSON.parse(validJsonString);
          const message = parsedTranslation.message;
          setTranslatedMessage(message);
        } catch (e) {
          console.error('Error parsing JSON:', e);
        }
      },
    }
  );

  const handleTranslate = () => {
    if (messageContent) {
      translate(messageContent);
      setShowTranslatedMessage(true);
    }
  };

  if (hasDeleted) return null;
  return (
    <div
      className={`flex flex-col group gap-1 mb-5 ${isCurrentUser ? 'items-end' : 'items-start'}`}
    >
      <div
        className={`flex gap-2 items-end group ${isCurrentUser ? 'flex-row-reverse' : ''}`}
      >
        {showProfile ? (
          isCurrentUser ? (
            <Avatar className="w-10 h-10 rounded-full bg-lightgray">
              <AvatarImage src={userImage} alt="Profile Picture" />
            </Avatar>
          ) : (
            <ChatSidebarSheetDemo
              trigger={
                <Avatar className="w-10 h-10 rounded-full bg-lightgray cursor-pointer">
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
          <div className="w-10 h-10 rounded-full" />
        )}
        <div
          className={`flex relative items-center ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
        >
          <div>
            <Typography
              variant="p"
              weight="semibold"
              className={`font-medium font-montserrat max-w-lg rounded-sm leading-26 p-3 ${isCurrentUser ? 'text-[#4E5D78] bg-gray-50' : 'text-white bg-[#377DFF]'}`}
            >
              {Array.isArray(attachments) && attachments.length > 0 && (
                <div
                  className={`grid mb-6 gap-2 ${attachments.length < 3 ? `grid-cols-${attachments.length}` : 'grid-cols-3'}`}
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
            {!isCurrentUser && showTranslatedMessage && (
              <Typography
                variant="p"
                weight="semibold"
                className={`font-medium font-montserrat max-w-lg rounded-sm leading-26 p-3 text-[#4E5D78] bg-gray-100`}
              >
                {isLoading ? (
                  <div className="flex gap-1">
                    <Loading /> Translating...
                  </div>
                ) : (
                  <div className="relative">
                    <div
                      className="absolute top-0  -right-2 cursor-pointer"
                      onClick={() => {
                        setShowTranslatedMessage(false);
                        setTranslatedMessage(null);
                      }}
                    >
                      <CircleX />
                    </div>
                    <span>{translatedMessage}</span>
                  </div>
                )}
              </Typography>
            )}
          </div>
          {!isCurrentUser && !translatedMessage && (
            <div
              className="bg-white absolute p-2 shadow-lg group-hover:block hidden z-20 cursor-pointer -bottom-11 right-0 rounded-3xl"
              onClick={() => handleTranslate()}
            >
              <Languages />
            </div>
          )}

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
        className={`${isCurrentUser ? 'mr-16' : 'ml-16'} text-[#A1A4B1] !text-[12px] `}
      >
        {showDate && dayjs(createdAt).fromNow()}
      </Typography>
    </div>
  );
};

export default ChatMessage;
