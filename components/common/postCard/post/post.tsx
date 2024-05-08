import type { NextPage } from 'next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { Send, MessageCircle, Heart } from 'lucide-react';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC } from 'react';
import { useState } from 'react';

dayjs.extend(relativeTime);

interface IProps {
  userImage: string;
  userFullName: string;
  username: string;
  created_at: string;
  description: string;
  attachment?: string[];
  likes?: number;
  comments?: number;
  onComplete?: () => void;
  onLike?: () => void;
}

export const Post: FC<IProps> = ({
  userImage,
  userFullName,
  username,
  created_at,
  description,
  attachment,
  likes = 0,
  comments = 0,
  onComplete,
}: IProps) => {
  console.log(attachment);
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    if (liked) {
      likes -= 1;
    } else {
      likes += 1;
    }
  };

  const handleComment = () => {
    setCommented(!commented);
    if (commented) {
      comments -= 1;
    } else {
      comments += 1;
    }
  };

  const handleShare = () => {
    alert('Share functionality not implemented yet!');
  };
  return (
    <div className="p-3 m-1 w-full ">
      <div className="flex gap-2 items-center w-full md:w-auto md:mr-4 mb-4">
        <div>
          <Avatar className="w-14 h-14 md:w-54 md:h-54 rounded-full bg-lightgray mb-3">
            <AvatarImage src={userImage} alt="Profile Picture" />
          </Avatar>
        </div>

        <div className="flex flex-col mb-4 ">
          <div className="text-xl font-semibold ml-3">{userFullName}</div>
          <div className="text-gray-600 text-sm ml-3 mt-[7px]">
            <span>@{username}</span>
            <span className="mx-1">•</span>
            <span>{dayjs(created_at).fromNow()}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="text-gray-600 mb-4">{description}</div>{' '}
        {/* Description here */}
        {attachment && attachment.length > 0 && (
          <div className="mt-4 md:mt-0">
            <Image
              className="w-full rounded-lg cursor-pointer"
              loading="lazy"
              alt="lvvvvvvvvvvvvvvvvvv"
              src={attachment[0]}
              width={1053}
              height={342}
            />
          </div>
        )}
        <div className="flex justify-between mt-4 md:mt-6 items-center w-full">
          <div className="flex items-center text-gray-600 mr-4">
            <div className="flex items-center mr-4" onClick={handleLike}>
              <Heart
                className={`h-5 w-5 mr-1 cursor-pointer ${liked ? 'text-red-500 ' : ''}`}
              />
              <span>{liked ? likes + 1 : likes}</span>
            </div>
            <div
              className="flex items-center mr-4"
              onClick={handleComment || (onComplete && onComplete)}
            >
              <MessageCircle
                className={`h-5 w-5 mr-1 cursor-pointer ${commented ? 'text-blue-500' : ''}`}
              />
              <span>{commented ? comments + 1 : comments}</span>
            </div>
          </div>
          <div
            className="flex justify-end items-center text-gray-600 cursor-pointer "
            onClick={handleShare}
          >
            <Send className="h-5 w-5 mr-1" />
            <span>Share</span>
          </div>
        </div>
      </div>
    </div>
  );
};
