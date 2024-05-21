import React from 'react';
import { Typography } from '../Typography/Typography';
import { Plus } from 'lucide-react';

interface PenpalshipPublishStoryCardProps {
  title: string;
  iconOnClick: () => void;
}

const PenpalshipPublishStoryCard: React.FC<PenpalshipPublishStoryCardProps> = ({
  title,
  iconOnClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-3 border-dashed border-2 border-[#75767e] rounded-lg shadow-sm">
      <div onClick={iconOnClick}>
        <Plus size={50} className="text-[#4146B8] cursor-pointer" />
      </div>
      <div className="p-3 pb-1">
        <Typography variant="h3" weight="bold" className="text-[#4146B8]  ">
          {title}
        </Typography>
      </div>
    </div>
  );
};

export { PenpalshipPublishStoryCard };
