import { useState } from 'react';
import { Avatar, AvatarImage, Button, Dropdown } from '@/components/ui';
import { ThumbsUp, Share2, Ellipsis, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC, useEffect } from 'react';
import Link from 'next/link';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';
import SharePost from '../SharePost/SharePost';

dayjs.extend(relativeTime);

interface ISharePost {
  userId?: string | number;
  userImage: string;
  userFullName: string;
  username: string;
  created_at: string;
  description: string;
  attachment?: string;
}

interface IProps {
  userId?: string | number;
  userImage: string;
  userFullName: string;
  username: string;
  created_at: string;
  description: string;
  attachment?: string;
  likes?: number;
  comments?: number;
  handleComment?: () => void;
  onLike?: () => void;
  onUnlike?: () => void;
  hasUserLiked?: boolean;
  showLikeButton?: boolean;
  showCommentButton?: boolean;
  isFriend?: boolean;
  onAddFriend?: () => void;
  addFriendLoading?: boolean;
  addFriendText?: string;
  handleShare?: () => void;
  share?: string | number;
  showShareButton?: boolean;
  isMyPost?: boolean;
  onDeletePost?: () => void;
  sharePost?: ISharePost;
  isSharedPost?: boolean;
}

export const Post: FC<IProps> = ({
  userId,
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
  showLikeButton = true,
  showCommentButton = true,
  isFriend = true,
  onAddFriend,
  addFriendLoading,
  addFriendText,
  handleShare,
  share = 0,
  showShareButton = true,
  isMyPost,
  onDeletePost,
  sharePost,
  isSharedPost,
}: IProps) => {
  const { module } = useModule();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikedCount] = useState(likes);
  const [showShareModel, setShowShareModel] = useState(false);

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
    <div>
      <div className="p-3 m-1 w-full ">
        <div
          className={`flex gap-2 w-full ${isMyPost ? 'items-start' : 'items-center'} justify-between mb-4"`}
        >
          <Link href={`/${module}/profile/${userId}`}>
            <div className="flex gap-2 items-center w-3/4 md:w-auto md:mr-4">
              <div>
                <Avatar
                  className={`${isSharedPost ? 'w-12 h-12' : 'w-14 h-14'} md:w-54 md:h-54 rounded-full bg-lightgray mb-3`}
                >
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
          </Link>
          {!isFriend && (
            <div>
              <Button
                className="bg-[#ECEDF8] text-[#2183C4]  px-4 py-2 rounded-full"
                onClick={() => onAddFriend && onAddFriend()}
                loading={addFriendLoading}
              >
                {addFriendText}
              </Button>
            </div>
          )}
          {isMyPost && (
            <div>
              <Dropdown
                trigger={
                  <div>
                    <Ellipsis className="cursor-pointer" />
                  </div>
                }
                options={[
                  {
                    content: (
                      <div onClick={() => onDeletePost && onDeletePost()}>
                        Delete Post
                      </div>
                    ),
                  },
                ]}
              />
            </div>
          )}
        </div>
        {sharePost ? (
          Post({
            ...sharePost,
            showLikeButton: false,
            showCommentButton: false,
            showShareButton: false,
            isFriend: false,
            isMyPost: false,
            isSharedPost: true,
          })
        ) : (
          <div className="flex flex-col flex-grow">
            <div className="text-gray-600 mb-2">{description}</div>{' '}
            {/* Description here */}
            {attachment ? (
              <div className="mt-4 md:mt-0">
                <Image
                  className="w-full max-h-96 rounded-lg cursor-pointer"
                  loading="lazy"
                  alt={`post by ${username}`}
                  src={attachment}
                  width={1053}
                  height={342}
                  unoptimized={true}
                />
              </div>
            ) : null}
            <div className="flex justify-between mt-4 md:mt-6 items-center w-full">
              <div className="flex items-center text-gray-600 mr-4 gap-5 ">
                {showLikeButton && (
                  <div className="flex items-center mr-4" onClick={handleLike}>
                    <ThumbsUp
                      className={`h-5 w-5 mr-1 cursor-pointer ${liked ? 'text-red-500 ' : ''}`}
                    />
                    <span>{likeCount}</span>
                  </div>
                )}
                {showCommentButton && (
                  <div
                    className="flex items-center mr-4"
                    onClick={handleComment}
                  >
                    <MessageCircle
                      className={`h-5 w-5 mr-1 cursor-pointer ${comments ? 'text-blue-500' : ''}`}
                    />
                    <span>{comments}</span>
                  </div>
                )}
                {showShareButton && (
                  <SharePost
                    isVisible={showShareModel}
                    setIsVisible={setShowShareModel}
                    title="Share Post"
                    post={{
                      userFullName,
                      username,
                      created_at,
                      description,
                      attachment,
                      userImage,
                    }}
                    openModalButton={
                      <div
                        className="flex justify-end items-center text-gray-600 cursor-pointer "
                        onClick={handleShare}
                      >
                        <Share2 className="h-5 w-5 mr-1" />
                        <span>{share}</span>
                      </div>
                    }
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
