// src/components/ProfileCard.tsx
import Image from 'next/image';
import React, { FC } from 'react';
import { Card } from '@/components/ui';
import { Button } from '@/components/ui';
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
    <Card className="  p-4  flex items-center bg-primary-50  bg-gray-100">
      <div>
        <div className="flex gap-4 whitespace-nowrap">
          <Image
            src={imageUrl}
            alt={name}
            width={40}
            height={40}
            className="w-[86px] h-[86px] rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-bold">{name}</h2>
            <p className="text-gray-600">@{username}</p>
          </div>
        </div>

        <div className="mt-2 flex justify-end gap-4">
          <Button
            onClick={onConnect}
            loading={isConnecting}
            className=" bg-[#ECEDF8] text-[#2183C4]  px-4 py-2 rounded-full"
          >
            Connect
          </Button>
          <Button
            onClick={onRemove}
            loading={isRemoving}
            className=" text-[#2183C4] px-4 py-2 bg-white  border-[1px] border-[#2183C4] rounded-full"
          >
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};
