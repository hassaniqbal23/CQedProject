import { SquarePen } from 'lucide-react';
import React, { FC } from 'react';

import { Input } from '@/components/ui/input/input';
import { ChatUserList } from './ChatUserList/ChatUserList';
import { Typography } from '@/components/common/Typography/Typography';
interface IProps {
  chat: string;
}

export const ChatSideBar: FC<IProps> = ({ chat }: IProps) => {
  return (
    <div>
      <div className="max-w-sm border-r border-solid border-gray-200 h-auto bg-[#FFF] mt-5 flex flex-col gap-4 px-4">
        <div className="flex justify-between items-center w-full">
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
          <ChatUserList
            users={[
              {
                id: 1,
                userImage: '/assets/profile/profile.svg',
                userFullName: 'ASArtist',
                description: 'A little, but mostly just for take scre',
              },
              {
                id: 2,
                userImage: '/assets/profile/profile.svg',
                userFullName: 'Jackiemoonie',
                description: 'Get better and better, I think I',
              },
              {
                id: 3,
                userImage: '/assets/profile/profile.svg',
                userFullName: 'Moominmadness',
                description: 'Hahahah that’s great',
              },
              {
                id: 2,
                userImage: '/assets/profile/profile.svg',
                userFullName: 'Jackiemoonie',
                description: 'Get better and better, I think I..',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
