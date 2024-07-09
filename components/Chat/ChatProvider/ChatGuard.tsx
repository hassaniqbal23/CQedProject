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
  EVENT_BUS_ON_DELETE_MESSAGE,
  USERS_DISCONNECTED,
} from '../EventBus/constants';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { socket } from '@/lib/socket';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';
import { useRouter } from 'next/navigation';
import { useQueryClient } from 'react-query';

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
  userIsTyping: (conversationId: number, userIds: number[]) => void;
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
  userIsTyping: () => {},
});
export const useChatGuard = () => useContext(ChatGuardContext);

export const ChatGuardProvider = ({ children }: any) => {
  const { module } = useModule();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { userInformation, isAuthenticated } = useGlobalState();
  const { dispatchEvent } = useEventBus();
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
    const onMessageDelete = (message: any) => {
      dispatchEvent(EVENT_BUS_ON_DELETE_MESSAGE, message);
    };

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
      let disconnectedUsers: number[] = [];
      setRealtimeConnectedUsersIds((prevUsers) => {
        prevUsers.forEach((element) => {
          if (!users.includes(element)) {
            disconnectedUsers.push(element);
          }
        });

        if (disconnectedUsers.length > 0) {
          dispatchEvent(USERS_DISCONNECTED, disconnectedUsers);
        }

        return users;
      });
    };

    const onUserIsNotTyping = ({ userId }: { userId: number }) => {
      setRealtimeTypingUsersIds(
        realtimeTypingUsersIds.filter((id) => id !== userId)
      );
    };

    const onUserBlocked = () => {
      ['userInformation', 'get-users-i-blocked', 'MyPenPals'].map((c) => {
        queryClient.refetchQueries(c);
      });
    };

    if (socket) {
      socket.on('SOCKET_USER_IS_TYPING', onUserIsTyping);
      socket.on('SOCKET_ONLINE_USERS_LIST', onOnlineUsersList);
      socket.on('SOCKET_USER_IS_NOT_TYPING', onUserIsNotTyping);
      socket.on('MESSAGE', onMessage);
      socket.on('DELETE_MESSAGE', onMessageDelete);
      socket.on('disconnect', () => {
        setRealtimeConnectedUsersIds([]);
      });
      socket.on('SOCKET_USER_BLOCKED', onUserBlocked);
      return () => {
        socket.off('SOCKET_USER_IS_TYPING', onUserIsTyping);
        socket.off('SOCKET_ONLINE_USERS_LIST', onOnlineUsersList);
        socket.off('SOCKET_USER_IS_NOT_TYPING', onUserIsNotTyping);
        socket.off('MESSAGE', onMessage);
        socket.off('DELETE_MESSAGE', onMessageDelete);
        socket.off('SOCKET_USER_BLOCKED', onUserBlocked);
      };
    }
  }, [isAuthenticated]);

  const sendMessage = (message: { ['key']: string | number | any } | any) => {
    if (socket) {
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
      router.push(`/${module}/chats/${conversationId}`);
    }
  };

  const userIsTyping = (conversationId: number, users: number[]) => {
    if (socket) {
      socket.emit('SOCKET_USER_IS_TYPING', {
        userId: userInformation.id,
        conversationId: conversationId,
        users: users,
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
        userIsTyping,
      }}
    >
      {children}
    </ChatGuardContext.Provider>
  );
};
