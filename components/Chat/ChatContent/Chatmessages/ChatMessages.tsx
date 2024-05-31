import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChateMessage/ChatMessage';
import { useGlobalState } from '@/app/gobalContext/globalContext';
import { useChatFeatures } from '../../ChatProvider/ChatProvider';
import { useMutation } from 'react-query';
import {
  deleteMessage,
} from '@/app/api/chat';
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
  const { currentConversationMessages, memoizedMessagesList } =
    useChatFeatures();
  console.log(memoizedMessagesList, 'memoizedMessagesList');
  const messages = [...currentConversationMessages];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const { mutate: removeThread, isLoading: isDeletingThread } =
    useMutation((id: number) => deleteMessage(id), {
      onSuccess: (res) => {
        toast.success(`${res.data.message}`, {
          position: 'bottom-center',
        });
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
        toast.error(`Failed to delete thread: ${error.message}`, {
          position: 'bottom-center',
        });
      },
    });

  const handleDeleteMessage = (id: string | number) => {
    const numericId = typeof id === 'string' ? parseInt(id) : id;
    removeThread(numericId);
  };

  return (
    <div className="p-3">
      {messages.map((message: any, index) => {
        return (
          <ChatMessage
            key={index}
            id={message.id}
<<<<<<< HEAD
            date={message.created_at}
            showProfile={message.showProfile}
            showDate={message.showDate}
=======
>>>>>>> 0aba0247bd2fbecd405efcdc5e44981dcf664691
            userImage={
              (message.toId && message.toId !== userInformation.id) ||
                message.senderId === userInformation.id
                ? userInformation.attachment.file_path
                : user?.attachment?.file_path || '/assets/profile/profile.svg'
            }
            content={message.message}
            onDeleteMessage={handleDeleteMessage}
            isCurrentUser={
              (message.toId && message.toId !== userInformation.id) ||
              message.senderId === userInformation.id
            }
          />
        );
      })}
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatMessages;