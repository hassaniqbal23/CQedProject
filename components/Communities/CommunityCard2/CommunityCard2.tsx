import { Typography } from '@/components/common/Typography/Typography';
import { Avatar, AvatarImage, Separator, Skeleton } from '@/components/ui';
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
  loading?: boolean;
  button?: React.ReactNode;
}

export const CommunityCard = ({
  title,
  image,
  members,
  description,
  id,
  module = 'students',
  loading,
  button,
}: CommunityCardProps) => {
  const words = description.split(' ');

  const shortenedDescription =
    description.length > 18
      ? words.slice(0, 18).join(' ') + ' ...'
      : description;

  return (
    <>
      <div className="flex items-center p-4 rounded-md ">
        <Link
          href={`/${module}/cq-communities/${id}`}
          className="flex items-center"
        >
          {loading ? (
            <Skeleton className="w-16 h-16 md:w-54 md:h-54 mr-2 rounded-full" />
          ) : (
            <Avatar className="w-16 h-16 md:w-54 md:h-54 mr-2 rounded-full bg-lightgray">
              <AvatarImage src={image} alt="Profile Picture" />
            </Avatar>
          )}
          <div className="ml-2">
            {loading ? (
              <Skeleton className="h-6 w-40 mb-2" />
            ) : (
              <Typography variant="h5" weight="semibold">
                {title}
              </Typography>
            )}
            {loading ? (
              <Skeleton className="h-4 w-20 mb-2" />
            ) : (
              <Typography
                variant="p"
                weight="regular"
                className="text-gray-500"
              >
                {members} {members > 1 ? 'Members' : 'Member'}
              </Typography>
            )}
            {loading ? (
              <Skeleton className="h-4 w-60 mt-2" />
            ) : (
              <Typography
                variant="p"
                weight="regular"
                className="text-gray-700 pt-2"
              >
                <div
                  className="flex"
                  dangerouslySetInnerHTML={{ __html: shortenedDescription }}
                ></div>
              </Typography>
            )}
          </div>
        </Link>
        {loading ? (
          <Skeleton className="w-32 h-10 ml-auto" />
        ) : (
          <>
            {button ? (
              <div className="flex justify-end ml-auto w-4/12 ">{button}</div>
            ) : (
              <CommunityJoinLeaveActionButton communityId={id} />
            )}
          </>
        )}
      </div>
      <Separator />
    </>
  );
};
