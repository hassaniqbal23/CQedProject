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
import { getAllConversations, startConversation } from '@/app/api/chat';
import { useMutation, useQuery } from 'react-query';

interface ChatInterface {
  currentThread?: any;
  setCurrentThreadId?: Dispatch<SetStateAction<number>>;
  fetchConversations?: () => void;
  memorizedConversationsList?: any[];
  memorizedMessagesList?: any[];
  setSearchQuery?: Dispatch<SetStateAction<string>>;
  inboxLoading?: boolean;
  memorizedTotalUnreadMessages?: any[];
  unSendMessage?: (chatId: number) => void;
  deleteThread?: (id: number) => void;
  currentThreadId?: number | null;
  chatLoading?: boolean;
  inboxResponse?: any;
  currentConvsersation: any;
}

const ChatContext = createContext<ChatInterface>({
  currentThread: null,
  setCurrentThreadId: () => {},
  fetchConversations: () => {},
  memorizedConversationsList: [],
  memorizedMessagesList: [],
  setSearchQuery: () => {},
  inboxLoading: false,
  memorizedTotalUnreadMessages: [],
  unSendMessage: () => {},
  deleteThread: () => {},
  currentThreadId: null,
  chatLoading: false,
  inboxResponse: null,
  currentConvsersation: null,
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
  const [currentThreadId, setCurrentThreadId] = useState<null | number>(null);
  const [chatLoading, setChatLoading] = useState(true);
  const [convsersationId, setConversationId] = useState<
    number | string | undefined
  >();
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

  useEffect(() => {
    const handleSendMessage = (message: any) => {
      if (message) {
        currentConvsersation.messages.push(message);
      }
    };

    subscribeEvent(SEND_MESSAGE, handleSendMessage);

    return () => {
      unsubscribeEvent(SEND_MESSAGE, handleSendMessage);
    };
  }, [subscribeEvent, unsubscribeEvent, convsersationId, currentConvsersation]);

  // const currentUser: Partial<any> = useSelector(getCurrentUser);

  // const memorizedOnlineUsersList = useMemo(() => {
  //     return [
  //         ...get(inboxResponse, 'data.result.onlineUsers', []),
  //         ...realtimeConnectedUsersIds,
  //     ];
  // }, [inboxResponse, realtimeConnectedUsersIds]);

  // const memorizedTotalUnreadMessages = useMemo(() => {
  //     return get(inboxResponse, 'data.result.inboxUnread', 0);
  // }, [inboxResponse]);

  // const memorizedConversationsList = useMemo(() => {
  //     return get(inboxResponse, 'data.result.inbox', []).map((item:any) => {
  //         const messages = get(item, 'messages', []);
  //         const latestMessageItem = messages[0];
  //         return {
  //             ...item,
  //             isUserOnline: memorizedOnlineUsersList.includes(item?.partner?.id)
  //                 ? true
  //                 : false,
  //             chattingWith: item?.users?.find((user:any) => user.id !== currentUser.id),
  //             totalUnreadMessages:
  //                 get(inboxResponse, 'data.result.unread', []).find(
  //                     (c:any) => c.chat_thread_id === item.id,
  //                 )?.count || 0,
  //             latestMessage: latestMessageItem?.messages || '',
  //             latestMessageTime: latestMessageItem
  //                 ? moment(latestMessageItem.created_at)
  //                     .fromNow()
  //                     .replace('minutes', 'min')
  //                     .replace('months', 'mon')
  //                     .replace('seconds', 'sec')
  //                 : '',
  //             isTyping: realtimeTypingUsersIds.includes(item?.partner?.id),
  //         };
  //     });
  // }, [
  //     currentUser.id,
  //     inboxResponse,
  //     memorizedOnlineUsersList,
  //     realtimeTypingUsersIds,
  // ]);

  const fetchConversations = async () => {
    // setInboxLoading(true);
    try {
      if (searchQuery) {
        clearTimeout(timeoutSearchChat);
        timeoutSearchChat = setTimeout(async () => {
          // const searchResponse = await http.get('/v1/chat/search', {
          //     params: { title: searchQuery },
          // });
          // const inboxResult = searchResponse.data.result;
          // setInboxResponse({
          //     ...inboxResponse,
          //     data: {
          //         ...inboxResponse.data,
          //         result: {
          //             ...inboxResponse.data.result,
          //             inbox: inboxResult,
          //         },
          //     },
          // });
          // setInboxLoading(false);
        }, 500);
      } else {
        // Clear the timeout and fetch inbox immediately
        clearTimeout(timeoutSearchChat);
        // const inboxResponse = await http.get('/v1/chat/inbox', {
        //     headers: {
        //         Authorization: `Bearer ${window.localStorage.token}`,
        //     },
        // });

        // setInboxResponse({
        //     config: inboxResponse?.config,
        //     data: inboxResponse.data,
        //     status: inboxResponse.status,
        //     statusText: inboxResponse.statusText,
        // });
        // setInboxLoading(false);
        setChatLoading(false);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      // setInboxLoading(false);
    }
  };

  // const { mutate, } = useMutation(() => startConversation(), {
  //     onSuccess: (res) => {
  //         // setInviteSchool(false);
  //         console.log(res, 'res')
  //     },
  //     onError: (error: any) => {
  //         console.log(error, 'Error =====> log');
  //     },
  // })

  // const currentThread = useMemo(() => {
  //     if (!currentThreadId) return null;
  //     // const list = memorizedConversationsList.find(
  //     //     (c:any) => c.id === currentThreadId,
  //     // );

  //     // for (let index = list?.messages.length - 1; index >= 0; index--) {
  //     //     const nextMessage =
  //     //         index < list.messages.length - 1 ? list.messages[index + 1] : null;
  //     //     const currentTime = new Date(list.messages[index].created_at).getTime();
  //     //     const nextMessageTime = nextMessage
  //     //         ? new Date(nextMessage.created_at).getTime()
  //     //         : null;

  //     //     const isLessThan30MinutesFromNext = nextMessageTime
  //     //         ? currentTime - nextMessageTime < 30 * 60 * 1000
  //     //         : false;

  //     //     // Initialize the properties
  //     //     list.messages[index].showProfile = false;
  //     //     list.messages[index].showDate = false;

  //     //     // If current and next message is from same user, show profile on current not on next
  //     //     if (
  //     //         nextMessage &&
  //     //         list.messages[index].created_by === nextMessage.created_by &&
  //     //         isLessThan30MinutesFromNext
  //     //     ) {
  //     //         list.messages[index].showProfile = true;
  //     //         nextMessage.showProfile = false;
  //     //         list.messages[index].showDate = false;
  //     //         nextMessage.showDate = false;
  //     //     }

  //     //     // If current and next message is from different user, show profile on both
  //     //     if (
  //     //         nextMessage &&
  //     //         list.messages[index].created_by !== nextMessage.created_by
  //     //     ) {
  //     //         list.messages[index].showProfile = true;
  //     //         nextMessage.showProfile = true;
  //     //         list.messages[index].showDate = true;
  //     //         nextMessage.showDate = true;
  //     //     }

  //     //     // If the time between current and next message is greater than 30 mins, show profile on both
  //     //     if (!isLessThan30MinutesFromNext) {
  //     //         list.messages[index].showProfile = true;
  //     //         list.messages[index].showDate = true;
  //     //         if (nextMessage) {
  //     //             nextMessage.showProfile = true;
  //     //             nextMessage.showDate = true;
  //     //         }
  //     //     }
  //     // }

  //     socket?.emit('messageSeen', {
  //         thread_id: list?.id,
  //         user_id: list?.owner.id,
  //     });
  //     setChatLoading(false);

  //     return list;
  // }, [currentThreadId, memorizedConversationsList]);

  // useEffect(() => {
  //     mutate()
  // }, [])

  useEffect(() => {
    fetchConversations();
  }, [searchQuery]);

  useEffect(() => {
    const handleJoinRoom = (id: number | string) => {
      setConversationId(id);
      if (!inboxLoading && inboxResponse.data) {
        console.log(data?.data.data, 'data');
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
      // if (inboxResponse?.data?.result.inbox.length > 0) {
      //     // const inbox = get(inboxResponse, 'data.result.inbox', []);
      //     // const index = inbox.findIndex(
      //     //     (item:any) => item?.id === message.data.chat_thread_id,
      //     // );
      //     // const unReadMessages = get(inboxResponse, 'data.result.unread', []);
      //     // if (index !== -1) {
      //     //     const thread = { ...inbox[index] };
      //     //     const messageAlreadyAdded = thread.messages.find(
      //     //         (item:any) => item.id === message.data.id,
      //     //     );
      //     //     if (messageAlreadyAdded) return;
      //     //     thread.messages.unshift(message.data);
      //     //     if (currentThread.id !== message.data.chat_thread_id) {
      //     //         setTotalUnreadMessageCount(totalUnreadMessageCount + 1);
      //     //         // const idx = get(inboxResponse, 'data.result.unread', []).findIndex(
      //     //         //     (item) => item.chat_thread_id === message.data.chat_thread_id,
      //     //         // );
      //     //         // if (idx > -1) {
      //     //         //     unReadMessages[idx].count = +unReadMessages[idx].count + 1;
      //     //         // } else if (idx === -1) {
      //     //         //     unReadMessages.push({
      //     //         //         count: 1,
      //     //         //         chat_thread_id: message.data.chat_thread_id,
      //     //         //     });
      //     //         // }
      //     //     } else if (
      //     //         currentThread.id === message.data.chat_thread_id &&
      //     //         window.location.pathname !== '/chat'
      //     //     ) {
      //     //         setTotalUnreadMessageCount(totalUnreadMessageCount + 1);
      //     //         const idx = get(inboxResponse, 'data.result.unread', []).findIndex(
      //     //             (item) => item.chat_thread_id === message.data.chat_thread_id,
      //     //         );
      //     //         if (idx > -1) {
      //     //             unReadMessages[idx].count = +unReadMessages[idx].count + 1;
      //     //         } else if (idx === -1) {
      //     //             unReadMessages.push({
      //     //                 count: 1,
      //     //                 chat_thread_id: message.data.chat_thread_id,
      //     //             });
      //     //         }
      //     //     }
      //     //     inbox.splice(index, 1);
      //     //     inbox.unshift(thread);
      //     // }
      //     // setInboxResponse({
      //     //     ...inboxResponse,
      //     //     data: {
      //     //         ...inboxResponse.data,
      //     //         result: {
      //     //             ...inboxResponse.data.result,
      //     //             inboxUnread: totalUnreadMessageCount,
      //     //             unread: unReadMessages,
      //     //             inbox: inbox,
      //     //         },
      //     //     },
      //     // });
      //     setButtonLoading(false);
      // }
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
  }, [
    subscribeEvent,
    unsubscribeEvent,
    currentThreadId,
    inboxLoading,
    // currentThread?.id,
    totalUnreadMessageCount,
    setTotalUnreadMessageCount,
    inboxResponse,
    setButtonLoading,
  ]);

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
        currentThreadId,
        fetchConversations,
        // memorizedConversationsList,
        // memorizedMessagesList,
        setSearchQuery,
        inboxLoading,
        inboxResponse,
        // memorizedTotalUnreadMessages,
        // unSendMessage,
        // deleteThread,
        chatLoading,
        currentConvsersation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
