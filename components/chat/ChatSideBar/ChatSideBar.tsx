import { SquarePen } from 'lucide-react';
import React, { FC } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { Input } from '@/components/ui/input/input';
interface IUser {
    id: number;
    userImage: string;
    userFullName: string;
    description: string;
}

interface IProps {
    chat: string;
    users: IUser[];
}

export const ChatSideBar: FC<IProps> = ({ chat, users }: IProps) => {
    return (
        <div>
            <div className='max-w-sm border-r border-solid border-gray-200 h-auto bg-[#FFF] mt-5 flex flex-col gap-4 px-4' >
                <div className='flex justify-between items-center w-full'>
                    <h1 className='ml-0 font-semibold text-black text-2xl font-montserrat '>{chat}</h1>
                    <div className='h-[40px] w-[40px] border border-gray-500 rounded-3xl items-center'><SquarePen className='items-center mt-2 ml-1.5' /></div>
                </div>
                <div className='items-center w-full  '>
                    <Input placeholder='Search' type='search' className='w-full h-auto  rounded-3xl  '/>
                </div>
               
            </div>
            <div></div>
        </div>
    );
}


