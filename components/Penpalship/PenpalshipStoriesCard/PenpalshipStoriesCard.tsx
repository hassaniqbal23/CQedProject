import React from 'react';
import Image from 'next/image';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { Typography } from '@/components/common/Typography/Typography';

interface PenpalshipStoriesCardProps {
  imgPath: string;
  title: string;
  link: string;
  description: string;
  onClickReadMore?: () => void;
}

const PenpalshipStoriesCard: React.FC<PenpalshipStoriesCardProps> = ({
  imgPath,
  title,
  link,
  description,
  onClickReadMore,
}) => {
  return (
    <div className="flex flex-col p-3 bg-[#F7F7F7] rounded-lg shadow-sm">
      <div className="relative w-full h-56">
        <Image
          src={imgPath}
          alt=""
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
        />
      </div>
      <div className="p-3 pb-1">
        <Typography
          variant="body"
          weight="bold"
          className="text-black text-lg "
        >
          {title}
        </Typography>
        <Typography
          variant="body"
          weight="regular"
          className="text-[#131517] mt-2 leading-normal"
        >
          {description}
        </Typography>
        <div
          onClick={onClickReadMore}
          className="flex items-center mt-4 text-primary-500 font-semibold cursor-pointer"
        >
          <div className="mr-1">{link}</div>
          <MoveRight size={18} />
        </div>
      </div>
    </div>
  );
};

export { PenpalshipStoriesCard };
