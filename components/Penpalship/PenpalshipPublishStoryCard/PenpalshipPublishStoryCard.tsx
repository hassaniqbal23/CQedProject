import React from 'react';
import { Plus } from 'lucide-react';
import { Typography } from '@/components/common/Typography/Typography';

interface PenpalshipPublishStoryCardProps {
  title: string;
  iconOnClick: () => void;
}

const PenpalshipPublishStoryCard: React.FC<PenpalshipPublishStoryCardProps> = ({
  title,
  iconOnClick,
}) => {
  return (
    <div
      onClick={iconOnClick}
      className="flex flex-col items-center text-center justify-center p-3 border-dashed border-2 border-[#75767e] rounded-2xl shadow-sm"
    >
      <div>
        <Plus size={50} className="text-primary-500  cursor-pointer" />
      </div>
      <div className="p-3 pb-1">
        <Typography variant="h3" weight="bold" className="text-primary-500   ">
          {title}
        </Typography>
      </div>
    </div>
  );
};

export { PenpalshipPublishStoryCard };
