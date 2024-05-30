// create chat context
// import { http } from '../../http/http';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
// import get from 'lodash.get';
// import moment from 'moment';
// import { useSelector } from 'react-redux';
// import { UserProps, getCurrentUser } from '../../store/User.reducer';
import { useEventBus } from '../EventBus/EventBus';
import {
  EVENT_BUS_ADD_NEW_INCOMING_MESSAGE_TO_INBOX_RESPONSE,
  JOIN_TO_CHAT_ROOM,
  SEND_MESSAGE,
} from '../EventBus/constants';
import { useChatGuard } from './ChatGuard';
import { useSocket } from '../WithSockets/WithSockets';
import {
  getAllConversations,
  getConversationMessages,
  deleteMessage,
} from '@/app/api/chat';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useGlobalState } from '@/app/gobalContext/globalContext';
import { toast } from 'react-toastify';

interface ChatInterface {
  currentThread?: any;
  fetchConversations?: () => void;
  memorizedConversationsList?: any[];
  memorizedMessagesList?: any[];
  setSearchQuery?: Dispatch<SetStateAction<string>>;
  inboxLoading?: boolean;
  memorizedTotalUnreadMessages?: any[];
  unSendMessage?: (chatId: number) => void;
  currentThreadId?: number | null;
  inboxResponse?: any;
  currentConvsersation: any;
  currentConversationMessages: any[];
}

const ChatContext = createContext<ChatInterface>({
  currentThread: null,
  fetchConversations: () => { },
  memorizedConversationsList: [],
  memorizedMessagesList: [],
  setSearchQuery: () => { },
  memorizedTotalUnreadMessages: [],
  unSendMessage: () => { },
  currentThreadId: null,
  inboxResponse: null,
  currentConvsersation: null,
  currentConversationMessages: [],
});

export const useChatFeatures = () => useContext(ChatContext);

let timeoutSearchChat: any;

export const ChatProvider = ({ children }: any) => {
  const { socket } = useSocket();
  const [searchQuery, setSearchQuery] = useState('');
  const {
    realtimeConnectedUsersIds,
    realtimeTypingUsersIds,
    setButtonLoading,
    setTotalUnreadMessageCount,
    totalUnreadMessageCount,
  }: any = useChatGuard();
  const { subscribeEvent, unsubscribeEvent } = useEventBus();
  const [inboxResponse, setInboxResponse] = useState<any>(null);
  const [convsersationId, setConversationId] = useState<
    number | string | undefined
  >();

  const { userInformation } = useGlobalState();

  const [currentConversationMessages, setCurrentConversationMessages] =
    useState<any[]>([]);
  const [currentConvsersation, setCurrentConvsersation] = useState<any>();

  const { data, isLoading: inboxLoading } = useQuery(
    ['get-all-conversations'],
    () => getAllConversations(),
    {
      onSuccess(data) {
        console.log(data, 'data');
        setInboxResponse(data);
      },
    }
  );

  const { isLoading: conversationLoading } = useQuery(
    ['get-current-chat', convsersationId],
    () => getConversationMessages(convsersationId as number),
    {
      enabled: !!convsersationId,
      onSuccess(data) {
        setCurrentConversationMessages(data.data.data);
      },
    }
  );

  useEffect(() => {
    const handleSendMessage = (message: any) => {
      if (message) {
        setCurrentConversationMessages((prev) => [...prev, message]);
      }
    };

    subscribeEvent(SEND_MESSAGE, handleSendMessage);

    return () => {
      unsubscribeEvent(SEND_MESSAGE, handleSendMessage);
    };
  }, [subscribeEvent, unsubscribeEvent, convsersationId, currentConvsersation]);

  useEffect(() => {
    const handleJoinRoom = (id: number | string) => {
      setConversationId(id);
      if (!inboxLoading && inboxResponse.data) {
        const current = inboxResponse?.data?.data.find((item: any) => {
          return item.id === id;
        });
        setCurrentConvsersation(current);
      }
    };

    subscribeEvent(JOIN_TO_CHAT_ROOM, handleJoinRoom);

    return () => {
      unsubscribeEvent(JOIN_TO_CHAT_ROOM, handleJoinRoom);
    };
  }, [subscribeEvent, unsubscribeEvent, inboxLoading, inboxResponse]);

  useEffect(() => {
    const handleAddMessageToInbox = (message: any) => {
      if (message) {
        if (userInformation.id !== message.toId) {
          setCurrentConversationMessages((prev) => {
            const filteredMessages = prev.filter((msg) => {
              if (msg.id) {
                return msg;
              }
            });
            return [...filteredMessages, message];
          });
        } else {
          setCurrentConversationMessages((prev) => [...prev, message]);
        }
      }
    };

    subscribeEvent(
      EVENT_BUS_ADD_NEW_INCOMING_MESSAGE_TO_INBOX_RESPONSE,
      handleAddMessageToInbox
    );

    return () => {
      unsubscribeEvent(
        EVENT_BUS_ADD_NEW_INCOMING_MESSAGE_TO_INBOX_RESPONSE,
        handleAddMessageToInbox
      );
    };
  }, [subscribeEvent, unsubscribeEvent, currentConversationMessages]);

  // const memorizedMessagesList = useMemo(() => {
  //     if (!currentThreadId) return [];

  //     const messages = currentThread?.messages;

  //     return messages || [];
  // }, [currentThread?.messages, currentThreadId]);

  // const unSendMessage = (chatId) => {
  //     const inbox = get(inboxResponse, 'data.result.inbox', []).map((item) => {
  //         const idx = item.messages.findIndex((message) => message.id === chatId);
  //         if (idx > -1) {
  //             item.messages.splice(idx, 1);
  //         }
  //         return item;
  //     });

  //     setInboxResponse({
  //         ...inboxResponse,
  //         data: {
  //             ...inboxResponse.data,
  //             result: {
  //                 ...inboxResponse.data.result,
  //                 inbox: inbox,
  //             },
  //         },
  //     });
  // };

  // const deleteThread = (id) => {
  //     const thread = get(inboxResponse, 'data.result.inbox', []).filter(
  //         (c) => c.id !== id,
  //     );

  //     setInboxResponse({
  //         ...inboxResponse,
  //         data: {
  //             ...inboxResponse.data,
  //             result: {
  //                 ...inboxResponse.data.result,
  //                 inbox: thread,
  //             },
  //         },
  //     });
  // };

  // useEffect(() => {
  //     if (currentThreadId) {
  //         const unread = get(inboxResponse, 'data.result.unread', []).find(
  //             (item) => {
  //                 return item.chat_thread_id === currentThreadId;
  //             },
  //         );

  //         if (unread) {
  //             setTotalUnreadMessageCount((prev) => {
  //                 if (prev > 0) {
  //                     return prev - +unread?.count;
  //                 }

  //                 return prev;
  //             });

  //             unread.count = 0;

  //             setInboxResponse({
  //                 ...inboxResponse,
  //                 data: {
  //                     ...inboxResponse.data,
  //                     result: {
  //                         ...inboxResponse.data.result,
  //                         unread: [...inboxResponse.data.result.unread, unread],
  //                     },
  //                 },
  //             });
  //         }
  //     }
  // }, [currentThreadId]);

  return (
    <ChatContext.Provider
      value={{
        // currentThread,
        // setCurrentThreadId,
        currentConversationMessages,
        // memorizedConversationsList,
        // memorizedMessagesList,
        setSearchQuery,
        inboxLoading,
        inboxResponse,
        // memorizedTotalUnreadMessages,
        // unSendMessage,
        // deleteThread,
        currentConvsersation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
