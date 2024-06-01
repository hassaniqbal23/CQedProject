import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSocket } from '../WithSockets/WithSockets';
import { useEventBus } from '../EventBus/EventBus';
import {
  EVENT_BUS_ADD_NEW_INCOMING_MESSAGE_TO_INBOX_RESPONSE,
  JOIN_TO_CHAT_ROOM,
  SEND_MESSAGE,
} from '../EventBus/constants';
// import { UserProps, getCurrentUser } from '../../store/User.reducer';
// import { useSelector } from 'react-redux';
// import { incomingMessageToast } from '@gilgit-app-nx/ui';

interface ChatGuardContextProps {
  realtimeConnectedUsersIds: number[];
  realtimeTypingUsersIds: number[];
  sendMessage: (message: any) => void;
  onMessageSeen: (id: any, ownerId: any) => void;
  isTyping: (value: boolean, user_id: any) => void;
  setButtonLoading: React.Dispatch<React.SetStateAction<boolean>>;
  buttonLoading: boolean;
  setTotalUnreadMessageCount: React.Dispatch<React.SetStateAction<number>>;
  totalUnreadMessageCount: number;
  joinConversation: (conversationId: string | number) => void;
  setSelectedConversationId: React.Dispatch<
    React.SetStateAction<string | number | null>
  >;
  selectedConversationId: string | number | null;
}

export const ChatGuardContext = createContext<ChatGuardContextProps>({
  realtimeConnectedUsersIds: [],
  realtimeTypingUsersIds: [],
  sendMessage: () => {},
  onMessageSeen: () => {},
  isTyping: () => {},
  setButtonLoading: () => {},
  buttonLoading: false,
  setTotalUnreadMessageCount: () => {},
  totalUnreadMessageCount: 0,
  joinConversation: () => {},
  setSelectedConversationId: () => {},
  selectedConversationId: null,
});
export const useChatGuard = () => useContext(ChatGuardContext);

export const ChatGuardProvider = ({ children }: any) => {
  const { dispatchEvent } = useEventBus();
  const { socket } = useSocket();
  const [selectedConversationId, setSelectedConversationId] =
    useState<any>(null);
  // const currentUser: Partial<UserProps> = useSelector(getCurrentUser);
  // @todo we need to remove this.
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [realtimeTypingUsersIds, setRealtimeTypingUsersIds] = useState<
    number[]
  >([]);
  const [realtimeConnectedUsersIds, setRealtimeConnectedUsersIds] = useState<
    number[]
  >([]);
  const [totalUnreadMessageCount, setTotalUnreadMessageCount] =
    useState<number>(0);

  useEffect(() => {
    if (socket) {
      // typing
      // socket.on('typing', (userId: number) => {
      //   if (!realtimeTypingUsersIds.includes(userId)) {
      //     setRealtimeTypingUsersIds([...realtimeTypingUsersIds, userId]);
      //   }
      // });
      // typingStop
      // socket.on('typingStop', (userId: number) => {
      //   setRealtimeTypingUsersIds(
      //     realtimeTypingUsersIds.filter((id) => id !== userId)
      //   );
      // });
      socket.on('ONLINE_USERS', (userId: number) => {
        console.log(userId);
        // setRealtimeConnectedUsersIds(
        //   realtimeConnectedUsersIds.filter((id) => id !== userId)
        // );
      });

      socket.on('MESSAGE', (message: any) => {
        console.log(message, 'message in chat guard');
        dispatchEvent(
          EVENT_BUS_ADD_NEW_INCOMING_MESSAGE_TO_INBOX_RESPONSE,
          message
        );
        // console.log({ message }, 'message')
        // if (!window.location.pathname.includes('/chat')) {
        //     if (
        //         true
        //     ) {
        //         // const audio = new Audio('/sounds/assets_audio_notification.mp3');
        //         // audio.play();
        //         setTotalUnreadMessageCount((prev) => prev + 1);
        //         if (message.isNewThread) {
        //             // const messagingWith = message?.data?.user?.find(
        //             //     (item: { ['key']: string | number }) => item.id !== currentUser?.id,
        //             // );
        //             //   incomingMessageToast(
        //             //     message?.data?.messages[0].messages,
        //             //     'bottom-right',
        //             //     messagingWith?.profile?.full_name || 'Unknown',
        //             //   );
        //         } else {
        //             console.log('here')
        //             //   incomingMessageToast(
        //             //     message?.data?.messages,
        //             //     'bottom-right',
        //             //     message ? message.data.user.profile.full_name : 'Unknown',
        //             //   );
        //         }
        //     }
        // } else {
        //     dispatchEvent(
        //         EVENT_BUS_ADD_NEW_INCOMING_MESSAGE_TO_INBOX_RESPONSE,
        //         message,
        //     );
        // }
      });
    }
  }, [socket]);

  const sendMessage = (message: { ['key']: string | number | any } | any) => {
    if (socket) {
      dispatchEvent(SEND_MESSAGE, message);
      delete message?.senderId;
      delete message?.created_at;
      socket.emit('MESSAGE', { ...message });
    }
  };

  const onMessageSeen = (id: number, ownerId: number) => {
    if (socket) {
      socket.emit('messageSeen', {
        thread_id: id,
        user_id: ownerId,
      });
    }
  };

  const isTyping = (value: boolean, user_id: number) => {
    if (value === true) {
      socket?.emit('onTyping', { user_id });
    } else if (value === false) {
      socket?.emit('onTypingStopped', { user_id });
    }
  };

  const joinConversation = (conversationId: string | number) => {
    if (socket) {
      socket.emit('JOIN_ROOM', { id: conversationId });
      dispatchEvent(JOIN_TO_CHAT_ROOM, conversationId);
      setSelectedConversationId(conversationId);
    }
  };

  return (
    <ChatGuardContext.Provider
      value={{
        realtimeConnectedUsersIds,
        realtimeTypingUsersIds,
        sendMessage,
        onMessageSeen,
        isTyping,
        setButtonLoading,
        buttonLoading,
        setTotalUnreadMessageCount,
        totalUnreadMessageCount,
        joinConversation,
        selectedConversationId,
        setSelectedConversationId,
      }}
    >
      {children}
    </ChatGuardContext.Provider>
  );
};
