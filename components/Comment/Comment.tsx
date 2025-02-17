import React, { useEffect, useState } from 'react';
import { Avatar, AvatarImage } from '../ui';
import { Typography } from '../common/Typography/Typography';
import dayjs from 'dayjs';
import { MessageCircle, ThumbsUp } from 'lucide-react';

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
      <div className="flex items-start pt-2">
        <Avatar className="w-9 h-9 mt-2">
          <AvatarImage
            src={avatarUrl || '/assets/profile/profile.svg'}
            alt={`Profile Picture-${user}`}
          />
        </Avatar>
        <div className="w-full bg-[#F3F3F3] rounded-lg pl-3 py-2">
          <div className="flex items-center justify-between">
            <Typography variant="h6" weight="medium">
              {user}
              <div className="text-sm font-normal text-[#99A0AE] pb-3 ">
                {dayjs(created_at).fromNow()}
              </div>
            </Typography>
          </div>
          <Typography variant="p" weight="regular">
            <span dangerouslySetInnerHTML={{ __html: text }}></span>
          </Typography>
        </div>
      </div>
      <div className="flex gap-2 ml-14 mt-3">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleComment && handleComment()}
        >
          <Typography variant="p" weight="regular">
            {replies > 1 ? 'Replies' : 'reply'}
          </Typography>
          <span className="">{replies}</span>
        </div>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleLike()}
        >
          <Typography variant="p" weight="regular">
            {likeCount > 1 ? 'Likes' : 'Like'}
          </Typography>
          <span className="text-md">{likeCount}</span>
        </div>
      </div>
    </div>
  );
};
