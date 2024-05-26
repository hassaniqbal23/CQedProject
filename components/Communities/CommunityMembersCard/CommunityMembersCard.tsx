import { Typography } from '@/components/common/Typography/Typography';
import { Card } from '@/components/ui';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface CommunityMembersCardProps {
  members: any[];
  totalMembers: number;
}

export const CommunityMembersCard = ({
  totalMembers,
  members,
}: CommunityMembersCardProps) => {
  return (
    <Card className="p-6 w-full bg-white rounded-xl min-h-96 shadow-md space-y-4">
      <div className="flex items-rn mb-4">
        <Image
          src="/membersCard.svg"
          alt="Members Icon"
          className="w-8 h-8 mr-2"
          width={32}
          height={32}
        />
        <Typography variant="h3" weight="bold">
          Members
        </Typography>
      </div>
      <div className="grid grid-cols-6 md:grid-cols-4 gap-4">
        {members.map((image, index) => (
          <Avatar key={index}>
            <AvatarImage
              src={image}
              alt={`Member ${index + 1}`}
              className="w-16 h-16"
            />
          </Avatar>
        ))}
      </div>
      {totalMembers > 15 && (
        <Link
          href="#"
          className="flex items-end justify-center text-blue-600 font-semibold mt-4"
        >
          See All {totalMembers} Members
        </Link>
      )}
    </Card>
  );
};
