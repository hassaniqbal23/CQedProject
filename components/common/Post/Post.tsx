import { useRef, useState } from 'react';
import {
  Avatar,
  AvatarImage,
  Button,
  Dropdown,
  Separator,
} from '@/components/ui';
import { ThumbsUp, Share2, Ellipsis, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FC } from 'react';
import Link from 'next/link';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';
import SharePost from '../SharePost/SharePost';
import VideoPlayer from './VideoPlayer';

dayjs.extend(relativeTime);

interface ISharePost {
  userId?: string | number;
  userImage: string;
  userFullName: string;
  username: string;
  created_at: string;
  description: string;
  attachment?: any[];
}

interface IProps {
  userId?: string | number;
  userImage: string;
  userFullName: string;
  username: string;
  created_at: string;
  description: string;
  attachment?: any[];
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
  handleShare?: (data: {
    content: string;
    communityId?: number | string | null;
  }) => void;
  share?: string | number;
  showShareButton?: boolean;
  isMyPost?: boolean;
  onDeletePost?: () => void;
  sharePost?: ISharePost;
  isSharedPost?: boolean;
  fileType?: 'image' | 'mp4';
}

const RenderSharePost: FC<{ sharePost: ISharePost }> = ({ sharePost }) => (
  <Post {...sharePost} isFriend={true} isMyPost={false} isSharedPost={true} />
);

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
  fileType,
}: IProps) => {
  const { module } = useModule();
  const [showShareModel, setShowShareModel] = useState(false);

  const handleLike = () => {
    if (hasUserLiked) {
      onUnlike && onUnlike();
    } else {
      onLike && onLike();
    }
  };

  console.log(sharePost?.attachment);

  return (
    <div>
      <div className="p-3 m-1 w-full ">
        <div
          className={`flex gap-0 md:gap-2 w-full ${isMyPost ? 'items-start' : 'items-center'} justify-between mb-4"`}
        >
          <Link href={`/${module}/profile/${userId}`}>
            <div className="flex gap-0 md:gap-2 items-center w-3/4 md:w-auto md:mr-4">
              <div>
                <Avatar
                  className={`${isSharedPost ? 'w-12 h-12' : 'w-14 h-14'} md:w-54 md:h-54 rounded-full bg-lightgray mb-3`}
                >
                  <AvatarImage src={userImage} alt="Profile Picture" />
                </Avatar>
              </div>

              <div className="flex flex-col mb-4 ">
                <div className="text-xl font-semibold ml-3">{userFullName}</div>
                <div className="text-gray-600 text-sm ml-3 mt-[5px]">
                  <span>@{username}</span>
                  <span className="mx-1">•</span>
                  <span>{dayjs(created_at).fromNow()}</span>
                </div>
              </div>
            </div>
          </Link>
          {/* {!isFriend && !isMyPost && (
            <div>
              <Button
                className="bg-[#ECEDF8] text-[#2183C4]  px-4 py-2 rounded-full"
                onClick={() => onAddFriend && onAddFriend()}
                disabled={addFriendLoading || addFriendText === 'Pending'}
                loading={addFriendLoading}
              >
                {addFriendText}
              </Button>
            </div>
          )} */}
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
        <div className="flex flex-col flex-grow">
          <div className="text-gray-600 mb-2">{description}</div>{' '}
          {/* Description here */}
          {attachment && attachment?.length > 0 ? (
            <div
              className={`${attachment.length === 2 || attachment.length === 4 ? 'grid grid-cols-2 gap-2' : attachment.length === 3 ? 'grid grid-cols-2 gap-2' : ''}`}
            >
              {attachment.map((image, index) => {
                if (image.Attachment.file_type === 'MP4') {
                  return (
                    <div className="mt-4 md:mt-0">
                      <VideoPlayer image={image} />
                    </div>
                  );
                } else
                  return (
                    <div
                      key={index}
                      className={`w-full relative h-[400px] object-cover rounded-2xl ${attachment.length === 3 && index === 2 ? 'col-span-2' : ''}`}
                    >
                      <Image
                        src={image.Attachment.file_path}
                        layout="fill"
                        objectFit="cover"
                        alt="Post Image"
                        className="rounded-lg"
                      />
                    </div>
                  );
              })}
            </div>
          ) : null}
          {sharePost && <Separator className=" w-full space-x-10 text-sm" />}
          {sharePost && <RenderSharePost sharePost={sharePost} />}
          <div
            className={`${isSharedPost ? 'hidden' : 'flex'} justify-between mt-4 md:mt-6 items-center w-full`}
          >
            <div className="flex items-center text-gray-600 mr-4 gap-5 ">
              {showLikeButton && (
                <div className="flex items-center mr-4" onClick={handleLike}>
                  <ThumbsUp
                    className={`h-5 w-5 mr-1 cursor-pointer ${hasUserLiked ? 'text-red-500 ' : ''}`}
                  />
                  <span>{likes}</span>
                </div>
              )}
              {showCommentButton && (
                <div className="flex items-center mr-4" onClick={handleComment}>
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
                  onShare={(data) => handleShare && handleShare(data)}
                  post={
                    sharePost
                      ? {
                        userImage: sharePost.userImage,
                        userFullName: sharePost.userFullName,
                        username: sharePost.username,
                        created_at: sharePost.created_at,
                        description: sharePost.description,
                        attachment:
                          sharePost.attachment &&
                          sharePost.attachment[0]?.Attachment.file_path,
                        fileTypes:
                          sharePost.attachment &&
                          sharePost.attachment[0]?.Attachment.file_type,
                      }
                      : {
                        userImage,
                        userFullName,
                        username,
                        created_at,
                        description,
                        attachment:
                          attachment && attachment[0]?.Attachment.file_path,
                        fileTypes:
                          attachment && attachment[0]?.Attachment.file_type,
                      }
                  }
                  openModalButton={
                    <div className="flex justify-end items-center text-gray-600 cursor-pointer ">
                      <Share2 className="h-5 w-5 mr-1" />
                      <span>{share}</span>
                    </div>
                  }
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
