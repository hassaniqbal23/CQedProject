import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSocket } from '../WithSockets/WithSockets';
import { useEventBus } from '../EventBus/EventBus';
import {
  EVENT_BUS_ADD_NEW_INCOMING_MESSAGE_TO_INBOX_RESPONSE,
  JOIN_TO_CHAT_ROOM,
  SEND_MESSAGE,
} from '../EventBus/constants';
import { useGlobalState } from '@/app/gobalContext/globalContext';
import { socket } from '@/lib/socket';
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
  userIsTyping: (conversationId: number) => void;
  setRealtimeConnectedUsersIds: React.Dispatch<React.SetStateAction<number[]>>;
}

export const ChatGuardContext = createContext<ChatGuardContextProps>({
  realtimeConnectedUsersIds: [],
  setRealtimeConnectedUsersIds: () => {},
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
  userIsTyping: () => {},
});
export const useChatGuard = () => useContext(ChatGuardContext);

export const ChatGuardProvider = ({ children }: any) => {
  const { userInformation } = useGlobalState();
  const { dispatchEvent } = useEventBus();
  const [selectedConversationId, setSelectedConversationId] =
    useState<any>(null);
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
    const onMessage = (message: any) => {
      dispatchEvent(
        EVENT_BUS_ADD_NEW_INCOMING_MESSAGE_TO_INBOX_RESPONSE,
        message
      );
    };
    const onUserIsTyping = ({ userId }: { userId: number }) => {
      if (userId !== userInformation.id) {
        setRealtimeTypingUsersIds([...realtimeTypingUsersIds, userId]);
      }
    };

    const onOnlineUsersList = (users: number[]) => {
      setRealtimeConnectedUsersIds(users);
    };

    const onUserIsNotTyping = ({ userId }: { userId: number }) => {
      setRealtimeTypingUsersIds(
        realtimeTypingUsersIds.filter((id) => id !== userId)
      );
    };

    if (socket) {
      socket.on('SOCKET_USER_IS_TYPING', onUserIsTyping);
      socket.on('SOCKET_ONLINE_USERS_LIST', onOnlineUsersList);
      socket.on('SOCKET_USER_IS_NOT_TYPING', onUserIsNotTyping);
      socket.on('MESSAGE', onMessage);

      socket.on('disconnect', () => {
        setRealtimeConnectedUsersIds([]);
      });

      return () => {
        socket.off('SOCKET_USER_IS_TYPING', onUserIsTyping);
        socket.off('SOCKET_ONLINE_USERS_LIST', onOnlineUsersList);
        socket.off('SOCKET_USER_IS_NOT_TYPING', onUserIsNotTyping);
        socket.off('MESSAGE', onMessage);
      };
    }
  }, [socket]);

  const sendMessage = (message: { ['key']: string | number | any } | any) => {
    if (socket) {
      dispatchEvent(SEND_MESSAGE, JSON.parse(JSON.stringify(message)));
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

  const userIsTyping = (conversationId: number) => {
    if (socket) {
      socket.emit('SOCKET_USER_IS_TYPING', {
        userId: userInformation.id,
        conversationId: conversationId,
      });
    }
  };

  return (
    <ChatGuardContext.Provider
      value={{
        realtimeConnectedUsersIds: realtimeConnectedUsersIds,
        setRealtimeConnectedUsersIds,
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
        userIsTyping,
      }}
    >
      {children}
    </ChatGuardContext.Provider>
  );
};
