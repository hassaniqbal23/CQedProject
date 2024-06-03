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
  currentConversation: any;
  currentConversationMessages: any[];
  memoizedMessagesList: any[];
  onConversationDelete: (id: number | string) => void;
}

const ChatContext = createContext<ChatInterface>({
  currentThread: null,
  fetchConversations: () => {},
  memorizedConversationsList: [],
  memorizedMessagesList: [],
  setSearchQuery: () => {},
  memorizedTotalUnreadMessages: [],
  unSendMessage: () => {},
  currentThreadId: null,
  inboxResponse: null,
  currentConversation: null,
  currentConversationMessages: [],
  memoizedMessagesList: [],
  onConversationDelete: (id) => {},
});

export const useChatFeatures = () => useContext(ChatContext);

let timeoutSearchChat: any;

const handleShowProfileAndDate = (messages: any) => {
  return messages.map((item: any, index: number) => {
    const nextMessage = messages[index + 1];

    // Initialize the properties
    item.showProfile = true;
    item.showDate = true;

    if (nextMessage) {
      const currentTime = new Date(item.created_at).getTime();
      const nextMessageTime = new Date(nextMessage.created_at).getTime();

      const isLessThan30MinutesFromNext =
        Math.abs(currentTime - nextMessageTime) < 30 * 60 * 1000;

      const itemSenderId = item.receiverId;
      const nextMessageSenderId = nextMessage.receiverId;

      // If current and next message are from the same user and within 30 minutes, hide profile and date for the current message
      if (itemSenderId === nextMessageSenderId && isLessThan30MinutesFromNext) {
        item.showProfile = false;
        item.showDate = false;
        nextMessage.showProfile = true;
        nextMessage.showDate = true;
      }

      // If current and next message are from different users, show profile on both
      if (itemSenderId !== nextMessageSenderId) {
        item.showProfile = true;
        nextMessage.showProfile = true;
        item.showDate = true;
        nextMessage.showDate = true;
      }

      // If the time between current and next message is greater than 30 mins, show profile and date for both messages
      if (!isLessThan30MinutesFromNext) {
        item.showProfile = true;
        item.showDate = true;
        nextMessage.showProfile = true;
        nextMessage.showDate = true;
      }
    }

    return item;
  });
};

export const ChatProvider = ({ children }: any) => {
  const {
    selectedConversationId,
    setSelectedConversationId,
    joinConversation,
  } = useChatGuard();
  const [searchQuery, setSearchQuery] = useState('');
  const { realtimeConnectedUsersIds, setRealtimeConnectedUsersIds }: any =
    useChatGuard();
  const { subscribeEvent, unsubscribeEvent } = useEventBus();
  const [inboxResponse, setInboxResponse] = useState<any>(null);
  const [lastMessagesList, setLastMessagesList] = useState<
    { ['key']: string }[]
  >([]);
  const queryClient = useQueryClient();
  const { userInformation } = useGlobalState();

  const [currentConversationMessages, setCurrentConversationMessages] =
    useState<any[]>([]);
  const [currentConversation, setCurrentConversation] = useState<any>();

  const { isLoading: messagesLoading, refetch: refetchConversationMessages } =
    useQuery(
      ['get-current-chat', selectedConversationId],
      () => getConversationMessages(selectedConversationId),
      {
        enabled: false,
        onSuccess(data) {
          setCurrentConversationMessages((prev) => {
            return handleShowProfileAndDate(data.data.data);
          });
        },
        retry: false,
        cacheTime: 0,
        staleTime: 0,
      }
    );

  const { isLoading: inboxLoading, data: allConversationResponse } = useQuery(
    ['get-all-conversations'],
    () => getAllConversations(),
    {
      onSuccess(res) {
        setInboxResponse(res);
        setTimeout(() => {
          if (selectedConversationId) {
            joinConversation(selectedConversationId);
            setCurrentConversation(
              res?.data?.data?.find((c: any) => c.id === selectedConversationId)
            );
          }
        }, 10);
      },
      retry: 100,
      retryDelay: 5000,
      cacheTime: 0,
      staleTime: 0,
    }
  );

  const memoizedMessagesList = useMemo(() => {
    return currentConversationMessages;
  }, [
    currentConversation,
    selectedConversationId,
    messagesLoading,
    currentConversationMessages,
  ]);

  useEffect(() => {
    if (selectedConversationId) {
      refetchConversationMessages();
    }
  }, [selectedConversationId]);

  useEffect(() => {
    const handleSendMessage = (message: any) => {
      console.log(message);
      if (message) {
        setInboxResponse((prev: any) => {
          const inbox = prev.data.data.map((item: any) => {
            if (item.id === message.conversationId) {
              return {
                ...item,
                lastMessageReceived: new Date().toISOString(),
                messages: [...item.messages, message],
              };
            }
            return item;
          });

          return {
            ...prev,
            data: {
              ...prev.data,
              data: inbox,
            },
          };
        });
        setCurrentConversationMessages((prev) => {
          return handleShowProfileAndDate([...prev, message]);
        });
      }
    };

    subscribeEvent(SEND_MESSAGE, handleSendMessage);

    return () => {
      unsubscribeEvent(SEND_MESSAGE, handleSendMessage);
    };
  }, [
    subscribeEvent,
    unsubscribeEvent,
    selectedConversationId,
    currentConversation,
  ]);

  useEffect(() => {
    const handleJoinRoom = (id: number | string | null) => {
      if (id == selectedConversationId) return;
      setCurrentConversationMessages([]);
      setSelectedConversationId(id);
      if (!inboxLoading && inboxResponse.data) {
        const current = inboxResponse?.data?.data.find((item: any) => {
          return item.id === id;
        });
        setCurrentConversation(current);
      }
    };

    subscribeEvent(JOIN_TO_CHAT_ROOM, handleJoinRoom);

    return () => {
      unsubscribeEvent(JOIN_TO_CHAT_ROOM, handleJoinRoom);
    };
  }, [
    subscribeEvent,
    unsubscribeEvent,
    inboxLoading,
    inboxResponse,
    selectedConversationId,
  ]);

  useEffect(() => {
    const handleAddMessageToInbox = (message: any) => {
      if (message) {
        console.log(message, 'message received');
        if (userInformation.id !== message.receiverId) {
          setCurrentConversationMessages((prev) => {
            const filteredMessages = prev.filter((msg) => {
              if (msg.id) {
                return msg;
              }
            });
            return handleShowProfileAndDate([...filteredMessages, message]);
          });
          handleShowProfileAndDate(currentConversationMessages);
        } else {
          setCurrentConversationMessages((prev) =>
            handleShowProfileAndDate([...prev, message])
          );
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

  const onConversationDelete = (id: number | string) => {
    setSelectedConversationId(null);
    setCurrentConversationMessages([]);
    setCurrentConversation(undefined);
  };

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
        currentConversation,
        memoizedMessagesList,
        onConversationDelete,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
