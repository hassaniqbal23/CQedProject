
import React, {FC} from 'react'
import { Avatar, AvatarFallback, AvatarImage, } from '@/components/ui';
import  Image  from 'next/image';
interface IProps {
    userImage: string;
    userFullName: string;
    description: string;
    iconMenu:string
}
export const ChatHeader: FC<IProps>=({
    userImage,
    userFullName,
    description,
    iconMenu
}:IProps)=> {
  return (
    <div className='flex justify-between bg-[#F4F4F4] items-center px-10  py-2'>
        <div className='flex gap-3'>
            <div>
                 <Avatar className="w-14 h-14 md:w-54 md:h-54 rounded-full bg-lightgray ">
                  <AvatarImage src={userImage} alt="Profile Picture" />
                </Avatar>
                </div>

                <div>
                     <h2 className='text-lg font-semibold '>{userFullName}</h2>
               <p className='text-sm font-medium text-[#70C670]'>{description}</p></div>
                </div>

        <div>
            <Image src={iconMenu} alt=''width={50} height={50}/>
        </div>
    </div>
  )
}

