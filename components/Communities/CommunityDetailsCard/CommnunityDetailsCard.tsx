import { Typography } from '@/components/common/Typography/Typography';
import { Avatar, AvatarImage, Button, Card } from '@/components/ui';
import React from 'react';

interface CommunityDetailsCardProps {
  title: string;
  image: string;
  members: number | string;
  description: string;
  guidelines: string[];
  isMember: boolean;
  onToggleMembership: () => void;
}

export const CommunityDetailsCard = ({
  title,
  image,
  members,
  description,
  guidelines,
  isMember,
  onToggleMembership,
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
        <Button
          onClick={onToggleMembership}
          className={`ml-auto py-2 px-4 rounded-full ${isMember ? 'bg-red-100 text-red-600' : 'bg-primary-50 text-blue-600'}`}
        >
          {isMember ? 'Leave Group' : 'Join Group'}
        </Button>
      </div>
      <div>
        <Typography variant="p" weight="medium" className="">
          {description}
        </Typography>
        <Typography variant="h3" weight="semibold" className="mt-4">
          Community Guidelines:
        </Typography>
        <ul className="list-disc list-inside space-y-2  ml-4">
          {guidelines.map((guideline, index) => (
            <li key={index} className="font-medium">
              {guideline}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};
