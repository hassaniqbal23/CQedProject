import React, { FC } from 'react';
import Image from 'next/image';
import { Globe } from './Globe/Globe';
import { Avatar, AvatarFallback, AvatarImage, Button } from '@/components/ui';

interface IProps {
  userImage: string;
}
export const CircleIcon: FC<IProps> = ({ userImage }: IProps) => {
  return (
    <div className="bg-primary-50 p-4 pb-3 rounded-xl mt-3 flex items-center justify-center ">
      <div className="relative">
        <Image
          src="/circle.svg"
          alt="Message Icon"
          width={300}
          height={300}
          className="object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Globe />
        </div>
        <Avatar className="w-14 h-14 rounded-full bg-lightgray absolute top-5 right-10 ">
          <AvatarImage src={userImage} alt="Profile Picture" />
        </Avatar>

        <Avatar className="w-14 h-14 rounded-full bg-lightgray absolute bottom-0 left-10">
          <AvatarImage src={userImage} alt="Profile Picture" />
        </Avatar>

        <Avatar className="w-14 h-14 rounded-full bg-lightgray absolute top-[-15px] left-10 right-9 bottom-1">
          <AvatarImage src={userImage} alt="Profile Picture" />
        </Avatar>

        <Avatar className="w-14 h-14 rounded-full bg-lightgray absolute bottom-[-15px] right-0">
          <AvatarImage src={userImage} alt="Profile Picture" />
        </Avatar>
      </div>
    </div>
  );
};
