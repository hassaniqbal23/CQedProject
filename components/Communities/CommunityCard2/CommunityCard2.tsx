import { Typography } from '@/components/common/Typography/Typography';
import { Avatar, AvatarImage, Button } from '@/components/ui';
import Link from 'next/link';
import React from 'react';

interface CommunityCardProps {
  title: string;
  image: string;
  members: number;
  description: string;
  id: number | string;
  onJoinClick?: () => void;
}

export const CommunityCard = ({
  title,
  image,
  members,
  description,
  onJoinClick,
  id,
}: CommunityCardProps) => {
  return (
    <div className="flex items-center p-4 border-t border-gray-300 rounded-md shadow-sm">
      <Link
        href={`/students/cq-communities/${id}`}
        className="flex items-center"
      >
        <Avatar className="w-16 h-16 md:w-54 md:h-54 mr-2 rounded-full bg-lightgray ">
          <AvatarImage src={image} alt="Profile Picture" />
        </Avatar>
        <div>
          <Typography variant="h3" weight="bold">
            {title}
          </Typography>
          <Typography variant="p" weight="regular" className="text-gray-500">
            {members} Members
          </Typography>
          <Typography variant="p" weight="regular" className="text-gray-700">
            {description}
          </Typography>
        </div>
      </Link>
      <Button
        className="ml-auto bg-primary-50 text-primary-600 px-5 py-2 rounded-full"
        onClick={() => onJoinClick && onJoinClick()}
      >
        Join
      </Button>
    </div>
  );
};
