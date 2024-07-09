import React, { FC } from 'react';
import Image from 'next/image';

export const Globe: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center ">
      <Image
        src="/Globe.svg"
        alt="Message Icon"
        width={100}
        height={100}
        className="object-contain"
      />
    </div>
  );
};
