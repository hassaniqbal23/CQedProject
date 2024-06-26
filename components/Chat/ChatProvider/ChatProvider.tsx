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
import { useEventBus } from '../EventBus/EventBus';
import {
  EVENT_BUS_ADD_NEW_INCOMING_MESSAGE_TO_INBOX_RESPONSE,
  EVENT_BUS_ON_DELETE_MESSAGE,
  USERS_DISCONNECTED,
} from '../EventBus/constants';
import { useChatGuard } from './ChatGuard';
import { getAllConversations, getConversationMessages } from '@/app/api/chat';
import { useQuery, useQueryClient } from 'react-query';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { useParams } from 'next/navigation';
import { ChatConversation } from '@/types/chat';
import { useRouter } from 'next/navigation';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';

interface ChatInterface {
  currentThread?: any;
  fetchConversations?: () => void;
  memorizedConversationsList?: any[];
  memorizedMessagesList?: any[];
  setSearchQuery?: Dispatch<SetStateAction<string>>;
  inboxLoading?: boolean;
  unSendMessage?: (chatId: number) => void;
  currentThreadId?: number | null;
  inboxResponse?: any;
  currentConversation: any;
  onConversationDelete: (id: number | string) => void;
  setInboxResponse: Dispatch<SetStateAction<any[]>>;
  selectedConversationId: any;
  setSelectedConversationId: Dispatch<SetStateAction<any>>;
  currentConversationAttachments: any[];
  setCurrentConversationAttachments: Dispatch<SetStateAction<any[]>>;
  conversationFromParams: number | null | undefined;
  onMessageRead: (
    messageId: number | string,
    conversationId: number | string
  ) => void;
  totalUnreadMessages: number;
}

const ChatContext = createContext<ChatInterface>({
  currentThread: null,
  fetchConversations: () => {},
  memorizedConversationsList: [],
  memorizedMessagesList: [],
  setSearchQuery: () => {},
  unSendMessage: () => {},
  currentThreadId: null,
  inboxResponse: null,
  currentConversation: null,
  onConversationDelete: (id) => {},
  setInboxResponse: () => {},
  selectedConversationId: null,
  setSelectedConversationId: () => {},
  currentConversationAttachments: [],
  setCurrentConversationAttachments: () => {},
  conversationFromParams: null,
  onMessageRead: () => {},
  totalUnreadMessages: 0,
});

export const useChatProvider = () => useContext(ChatContext);

export const ChatProvider = ({ children }: any) => {
  const router = useRouter();
  const { module } = useModule();
  const { joinConversation } = useChatGuard();
  const [searchQuery, setSearchQuery] = useState('');
  const { subscribeEvent, unsubscribeEvent } = useEventBus();
  const [inboxResponse, setInboxResponse] = useState<ChatConversation[]>([]);
  const queryClient = useQueryClient();
  const { userInformation, isAuthenticated } = useGlobalState();
  const [currentConversationAttachments, setCurrentConversationAttachments] =
    useState<any[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | string | null
  >(null);

  const currentConversation = inboxResponse.find(
    (item) => item.id === selectedConversationId
  );

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
      }
    );

  const params = useParams();
  const conversationFromParams = useMemo(() => {
    if (!params) return null;
    if (params.cid) {
      return +params.cid;
    }

    return null;
  }, [params]);

  const { isLoading: inboxLoading, data: allConversationResponse } = useQuery(
    ['get-all-conversations'],
    () => getAllConversations(),
    {
      onSuccess(res) {
        let conversations = res.data.data || [];
        conversations = conversations.map((conversation: any) => {
          return {
            ...conversation,
            messages: conversation.messages.reverse(),
          };
        });
        setInboxResponse(conversations);
      },
      cacheTime: 0,
      staleTime: 0,
      refetchOnMount: false,
      retryOnMount: false,
      enabled: isAuthenticated,
    }
  );

  const onMessageRead = (
    messageId: number | string,
    conversationId: number | string
  ) => {
    setInboxResponse(
      inboxResponse.map((conversation) => {
        if (conversation.id === conversationId) {
          return {
            ...conversation,
            unread_count: 0,
          };
        }
        return conversation;
      })
    );
  };

  const totalUnreadMessages = useMemo(() => {
    return inboxResponse.reduce((acc, conversation) => {
      return acc + conversation.unread_count;
    }, 0);
  }, [inboxResponse]);

  useEffect(() => {
    const handleAddMessageToInbox = (message: any) => {
      if (message.isNewMessage) {
        console.log(message, 'new incoming messasge');
        setInboxResponse([message.conversation, ...inboxResponse]);
        return;
      } else {
        const conversation = inboxResponse.find(
          (item) => item.id === message.conversationId
        );
        if (!conversation) {
          queryClient.refetchQueries('get-all-conversations');
          return;
        }
      }
      setInboxResponse(
        inboxResponse.map((conversation) => {
          if (conversation.id === message.conversationId) {
            let messages = conversation.messages;
            let findMessage = messages.find(
              (msg) => msg.clientID === message.clientID
            );
            if (!findMessage) {
              messages.push(message);
            } else {
              messages = messages.map((msg) => {
                if (msg.clientID === message.clientID) {
                  return message;
                }
                return msg;
              });
            }
            return {
              ...conversation,
              messages: messages,
              lastMessageReceived: message.created_at,
              unread_count:
                message.senderId !== userInformation.id
                  ? conversation.unread_count + 1
                  : conversation.unread_count,
            };
          }
          return conversation;
        })
      );
      const messagesEndRef = document.querySelector('.messagesEndRef');
      if (messagesEndRef) {
        setTimeout(() => {
          messagesEndRef.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    };

    const onDeleteMessage = (message: {
      id: number;
      conversationId: number;
      user_id: number;
    }) => {
      setInboxResponse(
        inboxResponse.map((conversation) => {
          if (conversation.id === message.conversationId) {
            return {
              ...conversation,
              messages: conversation.messages.map((msg) => {
                if (msg.id === message.id) {
                  msg.message_deleted_by = [
                    ...(msg.message_deleted_by || []),
                    message.user_id,
                  ];
                  return msg;
                }
                return msg;
              }),
            };
          }
          return conversation;
        })
      );
    };

    const onUsersDisconnect = (users: number[]) => {
      setInboxResponse(
        inboxResponse.map((conversation) => {
          if (users.includes(conversation.user.id)) {
            conversation.user.last_active = new Date().toISOString();
          }
          return conversation;
        })
      );
    };

    subscribeEvent(
      EVENT_BUS_ADD_NEW_INCOMING_MESSAGE_TO_INBOX_RESPONSE,
      handleAddMessageToInbox
    );

    subscribeEvent(EVENT_BUS_ON_DELETE_MESSAGE, onDeleteMessage);
    subscribeEvent(USERS_DISCONNECTED, onUsersDisconnect);

    return () => {
      unsubscribeEvent(
        EVENT_BUS_ADD_NEW_INCOMING_MESSAGE_TO_INBOX_RESPONSE,
        handleAddMessageToInbox
      );
      unsubscribeEvent(EVENT_BUS_ON_DELETE_MESSAGE, onDeleteMessage);
      unsubscribeEvent(USERS_DISCONNECTED, onUsersDisconnect);
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
    router.push(`/${module}/chats`);
  };

  return (
    <ChatContext.Provider
      value={{
        setSearchQuery,
        inboxLoading,
        inboxResponse,
        currentConversation,
        onConversationDelete,
        setInboxResponse,
        selectedConversationId,
        setSelectedConversationId,
        currentConversationAttachments,
        setCurrentConversationAttachments,
        conversationFromParams,
        onMessageRead,
        totalUnreadMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
