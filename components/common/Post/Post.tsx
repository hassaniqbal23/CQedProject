import type { NextPage } from 'next';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { Send, MessageCircle, Heart } from 'lucide-react';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC, useEffect } from 'react';
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
  handleComment?: () => void;
  onLike?: () => void;
  onUnlike?: () => void;
  hasUserLiked?: boolean;
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
  hasUserLiked,
  handleComment,
  onLike,
  onUnlike,
}: IProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikedCount] = useState(likes);

  useEffect(() => {
    if (hasUserLiked) setLiked(true);
  }, [hasUserLiked]);

  const handleLike = () => {
    setLiked(!liked);
    if (liked) {
      onUnlike && onUnlike();
      setLikedCount(likeCount - 1);
    } else {
      onLike && onLike();
      setLikedCount(likeCount + 1);
    }
  };

  const handleShare = () => {
    alert('Share functionality not implemented yet!');
  };
  return (
    <div>
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
                className="w-full max-h-96 rounded-lg cursor-pointer"
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
                <span>{likeCount}</span>
              </div>
              <div className="flex items-center mr-4" onClick={handleComment}>
                <MessageCircle
                  className={`h-5 w-5 mr-1 cursor-pointer ${comments ? 'text-blue-500' : ''}`}
                />
                <span>{comments}</span>
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
    </div>
  );
};
