import { Avatar } from '@/components/ui/avatar/avatar';
import Image from 'next/image';
import React, { FC } from 'react';

interface WelcomeHeaderProps {
  title?: string;
  description?: string;
}

const WelcomeHeader: FC<WelcomeHeaderProps> = ({ title, description }) => {
  return (
    <>
      <div className="border-l-4 border-[#676BC6] bg-[#ECEDF8] rounded-2xl p-4 md:flex md:justify-between md:items-center">
        <div className="flex flex-col items-start gap-1 md:ml-4">
          <h1 className="font-bold text-2xl text-left">{title}</h1>
          <p className="text-center text-sm text-[#394245]">{description}</p>
        </div>
        <div className="hidden md:flex justify-center md:justify-end mt-4 md:mt-0">
          <Image
            src="/assets/images/welcome.png"
            alt="icon"
            width={120}
            height={120}
            className="scale-x-[-1]"
          />
        </div>
      </div>
    </>
  );
};

export default WelcomeHeader;
