import React from 'react';
import { Typography } from '@/components/common/Typography/Typography';
import {
  Card,
  Separator,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { IMembers } from '@/types/tearcher';
import { useResponsive } from '@/lib/hooks';

interface CommunityMembersCardProps {
  members: IMembers[];
  totalMembers: number;
  loading?: boolean;
  routeLink?: string;
}

export const CommunityMembersCard = ({
  totalMembers,
  members,
  loading,
  routeLink,
}: CommunityMembersCardProps) => {
  const params = useParams();
  const { isMobile, isTabletMini } = useResponsive();
  return (
    <Card className="px-5 py-10  min-h-[538px] h-[538px] w-full bg-white rounded-xl shadow-md space-y-4">
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
            unoptimized={true}
          />
        )}
        {loading ? (
          <Skeleton className="h-8 w-32" />
        ) : (
          <Typography variant="h3" weight="semibold">
            Members
          </Typography>
        )}
      </div>
      <Separator />
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-5 sm:grid-cols-11 grid-cols-6 gap-y-3 gap-x-2">
        {loading
          ? Array.from({ length: 20 }).map((_, index) => (
              <Skeleton key={index} className="h-14 w-14 rounded-full" />
            ))
          : members?.slice(0, 20).map((image: IMembers, index: number) => (
              <div key={index}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Image
                        height={56}
                        width={56}
                        src={image?.User?.attachment?.file_path}
                        alt={`Member ${index + 1}`}
                        className={`${isTabletMini || isMobile ? 'h-10 w-10' : 'h-14 w-14'} rounded-full object-cover`}
                        unoptimized={true}
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{image?.User?.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            ))}
      </div>
      {totalMembers > 20 && !loading && (
        <Link
          href={`/${routeLink}/cq-communities/${params?.id}/all-members`}
          className="flex items-end justify-start text-primary-500 font-semibold mt-4"
        >
          See All {totalMembers} Members
        </Link>
      )}
    </Card>
  );
};
