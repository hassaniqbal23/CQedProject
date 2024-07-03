import { Typography } from '@/components/common/Typography/Typography';
import { Avatar, AvatarImage } from '@/components/ui';
import dayjs from 'dayjs';
import { MessageCircle, ThumbsUp } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { CommentInput } from '../CommentInput';

type IReplyComment = {
  user: string;
  text: string;
  avatarUrl: string;
  created_at?: string;
  likes?: number;
  onLike?: () => void;
  onUnlike?: () => void;
  hasUserLiked?: boolean;
  replies?: number;
  replyToName?: string;
  replyToText?: string;
  mentionUsers?: {
    id: string | number;
    display: string;
    image?: string | null;
  }[];
  onValueChange?: (value: string, ids?: number[]) => void;
  submitLoading?: boolean;
  showInput?: boolean;
};

function ReplyComment({
  user,
  text,
  avatarUrl,
  created_at,
  likes = 0,
  hasUserLiked,
  onLike,
  onUnlike,
  replies = 0,
  replyToName,
  replyToText,
  mentionUsers,
  onValueChange,
  submitLoading,
  showInput,
}: IReplyComment) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikedCount] = useState<number>(likes);
  const [showReply, setShowReply] = useState(false);

  useEffect(() => {
    if (showInput) {
      setShowReply(true);
    }
  }, [showInput]);

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
      <div className="flex items-start gap-2 pt-2">
        <Avatar className="w-9 h-9 mt-2">
          <AvatarImage
            src={avatarUrl || '/assets/profile/profile.svg'}
            alt={`Profile Picture-${user}`}
          />
        </Avatar>
        <div className="w-full">
          <div className="flex items-center justify-between">
            <Typography variant="h6" weight="medium">
              {user}
              <div className="text-sm font-normal text-[#99A0AE] pb-3 ">
                {dayjs(created_at).fromNow()}
              </div>
            </Typography>
          </div>
          <div className="p-4 bg-[#F3F3F3] rounded-lg mb-2">
            <Typography
              variant="p"
              weight="regular"
              className="mb-2 text-[#525866]"
            >
              Replying to {replyToName}
            </Typography>
            <Typography variant="p" weight="regular" className="text-[#99A0AE]">
              {replyToText && (
                <span dangerouslySetInnerHTML={{ __html: replyToText }}></span>
              )}
            </Typography>
          </div>
          <Typography variant="p" weight="regular">
            <span dangerouslySetInnerHTML={{ __html: text }}></span>
          </Typography>
        </div>
      </div>
      <div className="flex gap-2 ml-12 mt-3">
        <div
          className="flex items-center gap-2 cursor-pointer "
          onClick={() => setShowReply(!showReply)}
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
      {showReply && (
        <div className="mt-2">
          <CommentInput
            users={mentionUsers}
            loading={submitLoading}
            onValueChange={onValueChange}
          />
        </div>
      )}
    </div>
  );
}

export default ReplyComment;
