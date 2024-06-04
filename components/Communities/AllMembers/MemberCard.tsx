import { Typography } from '@/components/common/Typography/Typography';
import { Skeleton } from '@/components/ui';
import Image from 'next/image';
import { FC } from 'react';

interface IProps {
  fullName?: string;
  username?: string;
  imgUrl?: string;
  loading?: boolean;
}

export const Member: FC<IProps> = ({ fullName, username, imgUrl, loading }) => {
  return (
    <div>
      {loading ? (
        <div className="flex items-center">
          <Skeleton className="rounded-2xl h-16 w-16" />
          <div className="ml-3">
            <Skeleton className="h-6 w-32 mb-2 rounded" />
            <Skeleton className="h-5 w-24 rounded" />
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          <Image
            src={imgUrl || '/assets/students/member1.svg'}
            alt="Members Icon"
            className="mr-2 rounded-lg"
            height={75}
            width={75}
          />
          <div>
            <Typography
              variant="h5"
              weight="semibold"
              className="text-[#565656]"
            >
              {fullName}
            </Typography>
            <Typography
              variant="h6"
              weight="semibold"
              className="mt-2 text-[#6C757D]"
            >
              @{username}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};
