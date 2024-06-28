import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '../ui';
import { Typography } from '../common/Typography/Typography';
import dayjs from 'dayjs';
import { Heart, MessageCircleMore } from 'lucide-react';

type CommentProps = {
  user: string;
  text: string;
  avatarUrl: string;
  created_at?: string;
  likes?: number;
  onLike?: () => void;
  onUnlike?: () => void;
  hasUserLiked?: boolean;
  replies?: number;
  handleComment?: () => void;
  showComment?: boolean;
};

export const Comment: React.FC<CommentProps> = ({
  user,
  text,
  avatarUrl,
  created_at,
  likes = 0,
  hasUserLiked,
  onLike,
  onUnlike,
  replies = 0,
  handleComment,
  showComment = true,
}) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikedCount] = useState<number>(likes);

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

  return (
    <div className="p-4  rounded-lg">
      <div className="flex items-start">
        <Avatar className="w-9 h-9">
          <AvatarImage
            src={avatarUrl || '/assets/profile/profile.svg'}
            alt={`Profile Picture-${user}`}
          />
        </Avatar>
        <div className="ml-4 w-full">
          <div className="flex items-center justify-between">
            <Typography variant="h6" weight="medium">
              {user}
              <div className="text-sm font-normal text-[#99A0AE] pb-3 ">
                {dayjs(created_at).fromNow()}
              </div>
            </Typography>
          </div>
          <Typography variant="p" weight="regular">
            {text}
          </Typography>
        </div>
      </div>
      <div className="flex gap-2 ml-14 mt-3">
        <div className="flex items-center">
          <Heart
            onClick={handleLike}
            className={`h-5 w-5 mr-1 cursor-pointer ${liked ? 'text-red-500 fill-red-500' : ''}`}
          />
          <span className="text-md">{likeCount}</span>
        </div>
        {showComment && (
          <div className="flex items-center ">
            <MessageCircleMore
              onClick={handleComment}
              className={`h-5 w-5 mr-1 cursor-pointer ${replies ? 'text-blue-500 fll-blue-500' : ''}`}
            />
            <span className="">{replies}</span>
          </div>
        )}
      </div>
    </div>
  );
};
