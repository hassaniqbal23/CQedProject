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
} from '../EventBus/constants';
import { useChatGuard } from './ChatGuard';
import { useSocket } from '../WithSockets/WithSockets';
import {
  getAllConversations,
  getConversationMessages,
  deleteMessage,
} from '@/app/api/chat';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useGlobalState } from '@/app/globalContext/globalContext';
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
  memoizedMessagesList: any[];
  onConversationDelete: (id: number | string) => void;
  setInboxResponse: Dispatch<SetStateAction<any[]>>;
  selectedConversationId: any;
  setSelectedConversationId: Dispatch<SetStateAction<any>>;
  currentConversationAttachments: any[];
  setCurrentConversationAttachments: Dispatch<SetStateAction<any[]>>;
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
  memoizedMessagesList: [],
  onConversationDelete: (id) => {},
  setInboxResponse: () => {},
  selectedConversationId: null,
  setSelectedConversationId: () => {},
  currentConversationAttachments: [],
  setCurrentConversationAttachments: () => {},
});

export const useChatFeatures = () => useContext(ChatContext);

export const ChatProvider = ({ children }: any) => {
  const { joinConversation } = useChatGuard();
  const [searchQuery, setSearchQuery] = useState('');
  const { subscribeEvent, unsubscribeEvent } = useEventBus();
  const [inboxResponse, setInboxResponse] = useState<any[]>([]);
  const queryClient = useQueryClient();
  const { userInformation } = useGlobalState();
  const [currentConversationAttachments, setCurrentConversationAttachments] =
    useState<any[]>([]);
  const [selectedConversationId, setSelectedConversationId] =
    useState<any>(null);

  const currentConversation = useMemo(() => {
    return inboxResponse.find((item) => item.id === selectedConversationId);
  }, [selectedConversationId, inboxResponse]);

  const { isLoading: messagesLoading, refetch: refetchConversationMessages } =
    useQuery(
      ['get-current-chat', selectedConversationId],
      () => getConversationMessages(selectedConversationId),
      {
        enabled: false,
        onSuccess(res) {
          const attachments = res?.data?.attachments || [];
          setCurrentConversationAttachments(attachments);
        },
        retry: false,
        cacheTime: 0,
        staleTime: 0,
      }
    );

  const { isLoading: inboxLoading, data: allConversationResponse } = useQuery(
    ['get-all-conversations', selectedConversationId],
    () => getAllConversations(),
    {
      onSuccess(res) {
        setInboxResponse(res.data.data);
        setTimeout(() => {
          if (selectedConversationId) {
            joinConversation(selectedConversationId);
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
    let list = inboxResponse.flatMap((conversation) => {
      if (conversation.id === selectedConversationId) {
        return conversation.messages;
      }
      return [];
    });

    return list.sort((a, b) => {
      return (
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      );
    });
  }, [
    currentConversation,
    selectedConversationId,
    messagesLoading,
    inboxResponse,
  ]);

  useEffect(() => {
    if (selectedConversationId) {
      refetchConversationMessages();
    }
  }, [selectedConversationId]);

  useEffect(() => {
    const handleJoinRoom = (id: number | string | null) => {
      if (id == selectedConversationId) return;
      setSelectedConversationId(id);
      if (!inboxLoading && inboxResponse.length > 0) {
        const current = inboxResponse.find((item: any) => {
          return item.id === id;
        });
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
      if (message.isNewMessage) {
        setInboxResponse([message.conversation, ...inboxResponse]);
        return;
      }
      setInboxResponse(
        inboxResponse.map((conversation) => {
          if (conversation.id === currentConversation.id) {
            return {
              ...conversation,
              messages: [...conversation.messages, message],
              lastMessageReceived: message.created_at,
            };
          }
          return conversation;
        })
      );
      if (userInformation.id === message.senderId) {
        // do nothing just update the message int id.
        setInboxResponse(
          inboxResponse.map((conversation) => {
            if (conversation.id === currentConversation.id) {
              return {
                ...conversation,
                messages: conversation.messages.map((msg: any) => {
                  if (msg.clientID === message.clientID) {
                    return message;
                  }
                  return msg;
                }),
              };
            }
            return conversation;
          })
        );

        return;
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
  }, [
    subscribeEvent,
    unsubscribeEvent,
    userInformation,
    currentConversation,
    inboxResponse,
  ]);

  const onConversationDelete = (id: number | string) => {
    setSelectedConversationId(null);
  };

  return (
    <ChatContext.Provider
      value={{
        setSearchQuery,
        inboxLoading,
        inboxResponse,
        currentConversation,
        memoizedMessagesList,
        onConversationDelete,
        setInboxResponse,
        selectedConversationId,
        setSelectedConversationId,
        currentConversationAttachments,
        setCurrentConversationAttachments,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
