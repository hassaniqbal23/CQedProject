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
import { EVENT_BUS_ADD_NEW_INCOMING_MESSAGE_TO_INBOX_RESPONSE } from '../EventBus/constants';
import { useChatGuard } from './ChatGuard';
import { getAllConversations, getConversationMessages } from '@/app/api/chat';
import { useQuery, useQueryClient } from 'react-query';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { useParams } from 'next/navigation';

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
});

export const useChatProvider = () => useContext(ChatContext);

export const ChatProvider = ({ children }: any) => {
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

  useEffect(() => {
    const handleAddMessageToInbox = (message: any) => {
      if (message.isNewMessage) {
        setInboxResponse([message.conversation, ...inboxResponse]);
        return;
      }
      setInboxResponse(
        inboxResponse.map((conversation) => {
          if (conversation.id === message.conversationId) {
            return {
              ...conversation,
              messages: [...conversation.messages, message].map((messageC) => {
                return {
                  id:
                    message.clientID == messageC.clientID
                      ? message.id
                      : messageC.id,
                  ...messageC,
                };
              }),
              lastMessageReceived: message.created_at,
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
        onConversationDelete,
        setInboxResponse,
        selectedConversationId,
        setSelectedConversationId,
        currentConversationAttachments,
        setCurrentConversationAttachments,
        conversationFromParams,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
