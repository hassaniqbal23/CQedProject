import { Typography } from '@/components/common/Typography/Typography';
import { Avatar, AvatarImage, Button, Card } from '@/components/ui';
import React from 'react';
import { CommunityJoinLeaveActionButton } from '../CommunityJoinLeaveActionButton/CommunityJoinLeaveActionButton';

interface CommunityDetailsCardProps {
  title: string;
  image: string;
  members: number | string;
  description: string;
  communityId: number;
}

export const CommunityDetailsCard = ({
  title,
  image,
  members,
  description,
  communityId,
}: CommunityDetailsCardProps) => {
  return (
    <Card className="p-6 w-full bg-white rounded-xl shadow-md space-y-4">
      <div className="flex items-start md:items-center">
        <div className="flex flex-col md:flex-row gap-3">
          <Avatar className="w-16 h-16 md:w-54 md:h-54 mr-2 rounded-full bg-lightgray ">
            <AvatarImage src={image} alt={title} />
          </Avatar>
          <div className="">
            <Typography variant="h2" weight="bold">
              {title}
            </Typography>
            <Typography variant="p" weight="medium">
              {members} Members
            </Typography>
          </div>
        </div>
        <CommunityJoinLeaveActionButton
          communityId={communityId}
        ></CommunityJoinLeaveActionButton>
      </div>
      <div>
        <Typography variant="p" weight="medium" className="">
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </Typography>
      </div>
    </Card>
  );
};
