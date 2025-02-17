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
      className="flex flex-col items-center text-center justify-center p-3 border-dashed border-2 border-[#75767e] rounded-2xl shadow-sm min-h-[400px] max-h-[400px]"
    >
      <div>
        <Plus size={72} className="text-primary-500  cursor-pointer mb-2" />
      </div>
      <div className="p-3 pb-1">
        <Typography variant="h6" weight="semibold" className="text-primary-500">
          {title}
        </Typography>
      </div>
    </div>
  );
};

export { PenpalshipPublishStoryCard };
