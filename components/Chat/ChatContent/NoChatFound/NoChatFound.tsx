import React, { FC } from 'react';
import Image from 'next/image';

interface Iprops {
  text: string;
}

const NoChatFound: FC<Iprops> = ({ text }: Iprops) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="w-12 h-12 mb-4 relative">
        <Image
          src="/Chat.svg"
          alt="Message Icon"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className="text-lg text-gray-700">{text}</div>
    </div>
  );
};

export default NoChatFound;
