import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChateMessage/ChatMessage';
import { useGlobalState } from '@/app/gobalContext/globalContext';
import { useChatFeatures } from '../../ChatProvider/ChatProvider';
import { useMutation } from 'react-query';
import { deleteMessage } from '@/app/api/chat';
import { toast } from 'react-toastify';

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
  const { currentConversationMessages, memoizedMessagesList } =
    useChatFeatures();
  const messages = [...currentConversationMessages];
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversationMessages]);

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
      {messages.map((message: any, index) => {
        const isMe = [message.senderId].includes(userInformation.id);
        return (
          <ChatMessage
            key={index}
            id={message.id}
            date={message.created_at}
            showProfile={message.showProfile}
            showDate={message.showDate}
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
          />
        );
      })}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatMessages;
