import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChateMessage/ChatMessage';
import { useGlobalState } from '@/app/gobalContext/globalContext';
import { useChatFeatures } from '../../ChatProvider/ChatProvider';
import { useMutation } from 'react-query';
import { deleteMessage } from '@/app/api/chat';
import dayjs from 'dayjs';

interface Message {
  id: string | number;
  conversationId: string | number;
  attachment: any;
  message: string;
  receiverId: number | string;
  senderId: number | string;
}

interface IChatMessages {
  user: any;
}

const ChatMessages: React.FC<IChatMessages> = ({ user }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { userInformation } = useGlobalState();
  const [deletedMessage, setDeletedMessage] = React.useState<Number[]>([]);
  const { memoizedMessagesList } = useChatFeatures();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [memoizedMessagesList]);

  const { mutate: removeThread, isLoading: isDeletingThread } = useMutation(
    (id: number) => deleteMessage(id),
    {
      onSuccess: (res, message_id) => {
        setDeletedMessage([...deletedMessage, message_id]);
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const handleDeleteMessage = (id: string | number) => {
    const numericId = typeof id === 'string' ? parseInt(id) : id;
    removeThread(numericId);
  };
  return (
    <div className="p-3">
      {memoizedMessagesList.map((message: any, index) => {
        let showProfile = false;
        const isMe = [message.senderId].includes(userInformation.id);
        const sender = message.senderId;
        const nextMessage = memoizedMessagesList[index + 1];
        const isNextMessageBySameSender = nextMessage?.senderId === sender;

        if (sender && isNextMessageBySameSender) {
          showProfile = false;
        } else {
          showProfile = true;
        }

        return (
          <ChatMessage
            key={index}
            id={message.id}
            date={message.created_at}
            showProfile={showProfile}
            showDate={
              // differenceInMinutesWithPrevious > 5 ||
              // differenceInMinutesWithNext > 5 ||
              // memoizedMessagesList.length - 1 === index
              true
            }
            userFullName={user?.name}
            userId={user?.id}
            userImage={
              isMe
                ? userInformation.attachment?.file_path
                : user.attachment?.file_path
            }
            content={message.message}
            onDeleteMessage={handleDeleteMessage}
            isCurrentUser={isMe}
            hasDeleted={deletedMessage.includes(message.id)}
            attachments={message.attachments || []}
          />
        );
      })}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatMessages;
