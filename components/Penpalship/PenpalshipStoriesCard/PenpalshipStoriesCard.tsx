import React from 'react';
import Image from 'next/image';
import { MoveRight } from 'lucide-react';
import { Typography } from '@/components/common/Typography/Typography';
import { truncateText } from '@/app/utils/helpers';

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
  const truncatedDescription =
    (description && truncateText(description, 20)) || '';
  return (
    <div className="flex flex-col p-3 bg-[#F7F7F7] rounded-lg shadow-sm min-h-96 max-h-96">
      <div className="relative w-full h-56">
        <Image
          src={imgPath}
          alt={title ?? 'avatar'}
          layout="fill"
          objectFit="fill"
          className="rounded-xl object-contain"
        />
      </div>
      <div className="flex flex-col flex-grow p-3 pb-1">
        <Typography
          variant="body"
          weight="bold"
          className="text-black text-lg "
        >
          {title}
        </Typography>
        <Typography
          variant="body"
          weight="medium"
          className="text-[#131517] mt-2 text-sm flex-grow"
        >
          {truncatedDescription}
        </Typography>
        <div
          onClick={onClickReadMore}
          className="flex items-center mt-4 text-primary-500 font-semibold cursor-pointer text-sm"
        >
          <div className="mr-1">{link}</div>
          <MoveRight size={18} />
        </div>
      </div>
    </div>
  );
};

export { PenpalshipStoriesCard };
