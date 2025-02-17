import { Typography } from '@/components/common/Typography/Typography';
import { Avatar, AvatarImage, Button, Card, Skeleton } from '@/components/ui';
import React from 'react';
import { CommunityJoinLeaveActionButton } from '../CommunityJoinLeaveActionButton/CommunityJoinLeaveActionButton';
import { getUserIdLocalStorage } from '@/app/utils/encryption';
import { useGlobalState } from '@/app/globalContext/globalContext';

interface CommunityDetailsCardProps {
  title: string;
  image: string;
  members: number | string;
  description: string;
  communityId: number;
  loading?: boolean;
  createdBy?: number;
}

export const CommunityDetailsCard = ({
  title,
  image,
  members,
  description,
  communityId,
  loading,
  createdBy,
}: CommunityDetailsCardProps) => {
  const { userInformation } = useGlobalState();
  return (
    <Card className="p-6 min-h-[538px] h-[538px] w-full bg-white rounded-xl shadow-md space-y-4 overflow-auto scroll-smooth ">
      <div className="flex items-start md:items-center">
        <div className="flex flex-col md:flex-row gap-3">
          {loading ? (
            <Skeleton className="w-16 h-16 md:w-54 md:h-54 mr-2 rounded-full" />
          ) : (
            <Avatar className="w-16 h-16 md:w-54 md:h-54 mr-2 rounded-full bg-lightgray">
              <AvatarImage src={image} alt={title} />
            </Avatar>
          )}
          <div className="">
            {loading ? (
              <Skeleton className="h-8 w-32 mb-2" />
            ) : (
              <Typography
                variant="h3"
                weight="semibold"
                className="text-black leading-normal"
              >
                {title}
              </Typography>
            )}
            {loading ? (
              <Skeleton className="h-6 w-24" />
            ) : (
              <Typography variant="p" weight="medium">
                {members} Members
              </Typography>
            )}
          </div>
        </div>
        {loading ? (
          <Skeleton className="w-32 h-10 ml-auto" />
        ) : (
          <>
            {createdBy === userInformation?.id ? (
              ' '
            ) : (
              <CommunityJoinLeaveActionButton communityId={communityId} />
            )}
          </>
        )}
      </div>
      <div>
        {loading ? (
          <Skeleton className="h-24 w-full" />
        ) : (
          <div
            className="prose overflow-y-auto h-[400px] w-full max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        )}
      </div>
    </Card>
  );
};
