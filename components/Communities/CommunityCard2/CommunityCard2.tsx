import { Typography } from '@/components/common/Typography/Typography';
import { Avatar, AvatarImage, Button } from '@/components/ui';
import Link from 'next/link';
import React from 'react';
import { CommunityJoinLeaveActionButton } from '../CommunityJoinLeaveActionButton/CommunityJoinLeaveActionButton';

interface CommunityCardProps {
  title: string;
  image: string;
  members: number;
  description: string;
  id: number;
  module?: 'students' | 'teachers';
}

export const CommunityCard = ({
  title,
  image,
  members,
  description,
  id,
  module = 'students',
}: CommunityCardProps) => {
  return (
    <div className="flex items-center p-4 border-t border-gray-300 rounded-md shadow-sm">
      <Link
        href={`/${module}/cq-communities/${id}`}
        className="flex items-center"
      >
        <Avatar className="w-16 h-16 md:w-54 md:h-54 mr-2 rounded-full bg-lightgray ">
          <AvatarImage src={image} alt="Profile Picture" />
        </Avatar>
        <div>
          <Typography variant="h5" weight="semibold">
            {title}
          </Typography>
          <Typography variant="p" weight="regular" className="text-gray-500">
            {members} {members > 1 ? 'Members' : 'Member'}
          </Typography>
          <Typography variant="p" weight="regular" className="text-gray-700">
            {description}
          </Typography>
        </div>
      </Link>
      <CommunityJoinLeaveActionButton
        communityId={id}
      ></CommunityJoinLeaveActionButton>
    </div>
  );
};
