// src/components/ProfileCard.tsx
import Image from 'next/image';
import React, { FC } from 'react';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
import { Typography } from '../Typography/Typography';
interface ProfileCardProps {
  name: string;
  username: string;
  imageUrl: string;
  onConnect?: () => void;
  isConnecting?: boolean;
  onRemove?: () => void;
  isRemoving?: boolean;
}

export const GlobalFriendConnect: FC<ProfileCardProps> = ({
  name,
  username,
  imageUrl,
  onConnect,
  onRemove,
  isConnecting,
  isRemoving,
}) => {
  return (
    <Card className="p-4 flex  items-center bg-primary-50 bg-gray-100">
      <div className="flex gap-4 w-[100px]">
        <Image
          src={imageUrl}
          alt={name}
          width={40}
          height={40}
          className="w-[100px] h-[100px] rounded-full object-cover"
        />
        <div className="flex flex-col">
          <div>
            <Typography variant="h4" weight="semibold">
              {name}
            </Typography>
            <Typography variant="p" weight="medium" className="text-gray-600">
              @{username}
            </Typography>
          </div>
          <div className="mt-4 flex flex-nowrap gap-2">
            <Button
              size={'sm'}
              onClick={onConnect}
              loading={isConnecting}
              className="bg-[#ECEDF8] text-[#2183C4] px-4 py-2 h-7 rounded-full"
            >
              Connect
            </Button>
            <Button
              size={'sm'}
              onClick={onRemove}
              loading={isRemoving}
              className="text-[#2183C4] px-4 py-2 h-7 bg-white border-[1px] border-[#2183C4] rounded-full"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
