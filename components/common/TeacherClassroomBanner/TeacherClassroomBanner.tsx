import React, { FC } from 'react';
import { Typography } from '../Typography/Typography';

interface ClassRoomHeaderProps {
  title?: string;
  description?: string;
}

const ClassRoomHeader: FC<ClassRoomHeaderProps> = ({ title, description }) => {
  return (
    <div className="bg-[#ECEDF8] rounded-xl p-4 md:flex md:justify-between md:items-center">
      <div className="flex flex-col items-start gap-2 p-2 md:ml-4">
        <Typography variant={'h5'} weight={'semibold'} className="text-left">
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
    </div>
  );
};

export default ClassRoomHeader;
