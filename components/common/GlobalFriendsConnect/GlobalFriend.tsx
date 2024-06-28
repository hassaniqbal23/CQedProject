// src/components/ProfileCard.tsx
import Image from 'next/image';
import React, { FC } from 'react';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { Typography } from '../Typography/Typography';
import Link from 'next/link';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';
interface ProfileCardProps {
  name: string;
  username: string;
  imageUrl: string;
  id: number;
  onConnect?: () => void;
  isConnecting?: boolean;
}

export const GlobalFriendConnect: FC<ProfileCardProps> = ({
  name,
  username,
  imageUrl,
  onConnect,
  isConnecting,
  id,
}) => {
  const { module } = useModule();
  return (
    <Card className="p-4 flex items-center bg-primary-50 bg-gray-100">
      <div className="flex gap-4 w-full items-center">
        <Link href={`/${module}/profile/${id}`}>
          <Image
            src={imageUrl}
            alt={name}
            width={40}
            height={40}
            className="w-[70px] h-[70px] rounded-full object-cover"
            unoptimized={true}
          />
        </Link>
        <div className="flex flex-col ">
          <Link href={`/${module}/profile/${id}`}>
            <Typography variant="h5" weight="semibold">
              {name}
            </Typography>
            <Typography variant="p" weight="medium" className="text-gray-600">
              @{username}
            </Typography>
          </Link>
          <div className="mt-2 flex flex-nowrap gap-2">
            <Button
              size={'sm'}
              onClick={onConnect}
              loading={isConnecting}
              className="bg-[#ECEDF8] text-[#2183C4] px-4 py-2 h-7 rounded-full"
            >
              Connect
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
