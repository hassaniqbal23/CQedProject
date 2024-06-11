import React, { FC } from 'react';
import Image from 'next/image';

interface InterestProps {
  interest: string;
  hasImage?: boolean;
  imgSrc?: string;
}

const ImageChip: FC<InterestProps> = ({
  hasImage = false,
  interest,
  imgSrc = '',
}) => {
  return (
    <div className="py-2 px-4 text-center rounded-full border border-gray-500 text-gray-500">
      <div className="flex items-center">
        {hasImage && (
          <Image
            src={imgSrc ? imgSrc : '/Cartoon.svg'}
            width={15}
            height={15}
            alt="logo"
            className="mr-2"
          />
        )}
        <div>{interest}</div>
      </div>
    </div>
  );
};

export default ImageChip;
