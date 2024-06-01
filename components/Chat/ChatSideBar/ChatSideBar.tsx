import { SquarePen } from 'lucide-react';
import React, { FC } from 'react';

import { Input } from '@/components/ui/input/input';
import { ChatUserList } from './ChatUserList/ChatUserList';
import { Typography } from '@/components/common/Typography/Typography';
import { useChatFeatures } from '../ChatProvider/ChatProvider';
import Loading from '../../ui/button/loading';
import CreateChatModal from '../ChatContent/CreateChatModal/CreateChatModal';
import { useChatGuard } from '../ChatProvider/ChatGuard';

interface IProps {
  chat: string;
}

export const ChatSideBar: FC<IProps> = ({ chat }: IProps) => {
  const { inboxResponse, inboxLoading } = useChatFeatures();
  const { joinConversation } = useChatGuard();

  const [search, setSearch] = React.useState('');

  const filtered = React.useMemo(() => {
    if (!search) return inboxResponse?.data?.data || [];
    return (
      inboxResponse?.data?.data.filter((user: any) =>
        user.user.name.toLowerCase().includes(search.toLowerCase())
      ) || []
    );
  }, [inboxResponse, search]);

  return (
    <div className="w-[32rem]">
      <div className="max-w-sm py-5 border-r border-solid border-gray-200  h-[calc(100vh_-_73px)] bg-[#FFF] flex flex-col pl-2 gap-4">
        <div className="flex justify-between w-full px-3 mb-2">
          <Typography
            variant="h3"
            weight="semibold"
            className="text-[#1E1F21] font-montserrat"
          >
            {chat}
          </Typography>
          <div className="h-[40px] w-[40px] border border-gray-500 rounded-3xl items-center">
            <CreateChatModal
              onChatCreated={(id) => {
                joinConversation(id);
              }}
            />
          </div>
        </div>
        <div className="w-full mb-4">
          <div className="px-3">
            <Input
              placeholder="Search for chats"
              type="search"
              className="w-full h-auto rounded-3xl mb-3 text-sm !placeholder-[#282828] outline-none"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>

          <div className="h-[calc(100vh_-_215px)] overflow-y-auto">
            {inboxLoading ? (
              <div className="w-full h-[500px] flex items-center justify-center">
                <Loading />
              </div>
            ) : (
              <ChatUserList conversations={filtered} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
