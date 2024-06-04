import React, { FC } from 'react';
import { Typography } from '../Typography/Typography';
import Image from 'next/image';

interface ClassRoomHeaderProps {
  title?: string;
  description?: string;
  imageurl?: string;
}

const ClassRoomHeader: FC<ClassRoomHeaderProps> = ({
  title,
  description,
  imageurl,
}) => {
  return (
    <div className="bg-[#ECEDF8] rounded-xl p-4 md:flex md:justify-between md:items-center">
      <div className="flex flex-col items-start gap-2 p-2 md:ml-4">
        <Typography
          variant={'h5'}
          weight={'semibold'}
          className="text-left text-primary-500"
        >
          {title}
        </Typography>
        <Typography
          variant={'body'}
          weight={'regular'}
          className="text-left text-sm text-[#394245]"
        >
          {description}
        </Typography>
      </div>
      {imageurl && (
        <div className="h-20">
          <Image
            src={imageurl}
            height={148}
            width={160}
            alt="header image"
            unoptimized={true}
          ></Image>
        </div>
      )}
    </div>
  );
};

export default ClassRoomHeader;
