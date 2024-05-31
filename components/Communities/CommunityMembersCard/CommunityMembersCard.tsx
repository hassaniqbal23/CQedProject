import React from 'react';
import { Typography } from '@/components/common/Typography/Typography';
import { Card, Separator, Skeleton } from '@/components/ui';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import Image from 'next/image';
import Link from 'next/link';

interface IMembers {
  User: {
    attachment: {
      file_path: string;
      id: number;
    };
  };
}
interface CommunityMembersCardProps {
  members: IMembers[];
  totalMembers: number;
  loading?: boolean;
}

export const CommunityMembersCard = ({
  totalMembers,
  members,
  loading,
}: CommunityMembersCardProps) => {
  return (
    <Card className="p-10 w-full bg-white rounded-xl min-h-96 shadow-md space-y-4">
      <div className="flex items-rn mb-4">
        {loading ? (
          <Skeleton className="w-8 h-8 mr-2 rounded-full" />
        ) : (
          <Image
            src="/membersCard.svg"
            alt="Members Icon"
            className="w-8 h-8 mr-2"
            width={56}
            height={56}
          />
        )}
        {loading ? (
          <Skeleton className="h-8 w-32" />
        ) : (
          <Typography variant="h3" weight="bold">
            Members
          </Typography>
        )}
      </div>
      <Separator />
      <div className="grid grid-cols-6 md:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 20 }).map((_, index) => (
              <Skeleton key={index} className="h-14 w-14 rounded-full" />
            ))
          : members?.slice(0, 20).map((image: IMembers, index: number) => (
              <Avatar className="h-14 w-14" key={index}>
                <AvatarImage
                  height={56}
                  width={56}
                  src={image?.User?.attachment?.file_path}
                  alt={`Member ${index + 1}`}
                  className="w-14 h-14 rounded-full"
                />
              </Avatar>
            ))}
      </div>
      {totalMembers > 20 && !loading && (
        <Link
          href="#"
          className="flex items-end justify-start text-primary-500 font-semibold mt-4"
        >
          See All {totalMembers} Members
        </Link>
      )}
    </Card>
  );
};
