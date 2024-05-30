import React from 'react';
import { Button, Card, Input } from '../ui';
import Image from 'next/image';
import { ImageIcon, SmilePlus } from 'lucide-react';

export interface NewFeedsProps {
  userImage: string;
}

export const NewFeeds: React.FC<NewFeedsProps> = ({ userImage }) => {
  return (
    <Card>
      <div className="grid gap-4 p-4">
        <div className="flex items-center gap-5">
          <Image
            src={userImage}
            alt="user-img"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div className="w-full">
            <Input
              type="text"
              placeholder="What’s happening?"
              className="bg-[#F3F3F3] w-full p-2 rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-between items-center ml-16">
          <div className="flex gap-5">
            <div className="flex gap-3">
              <ImageIcon />
              <p className="cursor-pointer">Photo/Video</p>
            </div>
            <div className="flex items-center gap-3">
              <SmilePlus />
              <p className="cursor-pointer">Feeling</p>
            </div>
          </div>
          <div>
            <Button
              size={'md'}
              className=" text-white bg-primary-500 rounded-lg"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
