import { SquarePen } from 'lucide-react';
import React, { FC } from 'react';

import { Input } from '@/components/ui/input/input';
import { ChatUserList } from './ChatUserList/ChatUserList';
import { Typography } from '@/components/common/Typography/Typography';
import { useChatFeatures } from '../ChatProvider/ChatProvider';
import Loading from '../../ui/button/loading'

interface IProps {
  chat: string;
}

export const ChatSideBar: FC<IProps> = ({ chat }: IProps) => {
  const { inboxResponse, inboxLoading } = useChatFeatures()
  console.log(inboxResponse)
  return (
    <div>
      <div className="max-w-sm border-r border-solid border-gray-200  h-[95vh] bg-[#FFF]  flex flex-col gap-4 px-4">
        <div className="flex justify-between  w-full ">
          {/* <h1 className="ml-0 font-semibold text-black text-2xl font-montserrat ">
           
          </h1> */}
          <Typography
            variant="h3"
            weight="semibold"
            className="text-[#1E1F21]  font-montserrat"
          >
            {chat}
          </Typography>

          <div className="h-[40px] w-[40px] border border-gray-500 rounded-3xl items-center">
            <SquarePen className="items-center mt-2 ml-1.5" />
          </div>
        </div>
        <div className="items-center w-full mb-4 ">
          <Input
            placeholder="Search"
            type="search"
            className="w-full h-auto  rounded-3xl  "
          />
          {inboxLoading ? <Loading /> : <ChatUserList
            users={inboxResponse.data.data || []}
          />}
        </div>
      </div>
    </div>
  );
};
