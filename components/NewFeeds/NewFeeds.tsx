import React from 'react';
import { Button, Card, Input } from '../ui';
import Image from 'next/image';
import { ImageIcon, SmilePlus } from 'lucide-react';

export interface NewFeedsProps {
  userImage: string;
  onClick?: () => void;
  className?: string;
}

export const NewFeeds: React.FC<NewFeedsProps> = ({
  userImage,
  onClick,
  className,
}) => {
  return (
    <Card className={className}>
      <div className="grid gap-4 p-4">
        <div className="flex items-center flex-wrap md:flex-nowrap gap-5">
          <Image
            src={userImage}
            alt="user-img"
            width={40}
            height={40}
            className="rounded-full h-10 w-10"
            unoptimized={true}
          />
          <div className="w-7/12 md:w-full ">
            <Input
              iconColor="#5D5E68"
              iconPosition="right"
              onClick={onClick}
              type="search"
              placeholder="What’s happening?"
              className="bg-[#F3F3F3] text-[#5D5E68] w-full p-2 rounded-lg border-0 h-12"
            />
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap md:flex-nowrap ml-0 md:ml-16">
          <div className="flex gap-5 mb-2 md:mb-0">
            <div className="flex gap-3" onClick={onClick}>
              <ImageIcon />
              <p className="cursor-pointer">Photo/Video</p>
            </div>
            <div className="flex items-center gap-3" onClick={onClick}>
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
