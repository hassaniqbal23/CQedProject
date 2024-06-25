import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Typography } from '@/components/common/Typography/Typography';
import { CreatePostModal } from '@/components/common/CreatePostModal/CreatePostModal';
import { Post } from '@/components/common/Post/Post';
import { Comment } from '@/components/Comment/Comment';
import { useMutation, useQuery } from 'react-query';
import {
  communityPostComment,
  createCommunityPost,
  getCommunityPosts,
  likeCommunityPost,
  unlikeCommunityPost,
} from '@/app/api/communities';
import { toast } from 'sonner';
import Loading from '@/components/ui/button/loading';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { CommentInput } from '@/components/Comment/CommentInput';
import { Separator } from '@/components/ui';
import { IComment, ICommunityPost, ILike } from '@/types/global';
import { IPenpal } from '@/app/globalContext/types';
import FeedsSkeleton from '@/components/common/FeedsSkeleton/FeedsSkeleton';
import InfiniteScrollObserver from '@/components/common/InfiniteScrollObserver/InfiniteScrollObserver';

interface FeedsProps {
  communityId: string | number;
}

export const Feeds = ({ communityId }: FeedsProps) => {
  const { userInformation, myPenpals } = useGlobalState();
  const [commentSection, setCommentSection] = useState<{
    commentId: number | null;
    openCommentSection: boolean;
  }>({
    commentId: null,
    openCommentSection: false,
  });
  const [limit, setLimit] = useState(10);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);

  const { commentId, openCommentSection } = commentSection;

  const {
    data: communityPosts,
    isLoading: isFetchingCommunityPosts,
    refetch,
  } = useQuery(
    ['getCommunityPosts', limit],
    () => getCommunityPosts(communityId, 1, limit),
    {
      enabled: communityId ? true : false,
      keepPreviousData: true,
    }
  );

  const { mutate: likePost } = useMutation('likePost', (postId: number) =>
    likeCommunityPost(postId)
  );

  const { mutate: communityPostCommentApi, isLoading: isCreatingComments } =
    useMutation(
      'createCommunityPostComment',
      (requestBody: { id: number; content: string }) =>
        communityPostComment({
          communityPostId: requestBody.id,
          content: requestBody.content,
        }),
      {
        onSuccess(res, variables, context) {
          refetch();
          setCommentSection({
            commentId: res?.data?.data?.communityPostId,
            openCommentSection: true,
          });
        },
      }
    );

  const { mutate: unLikePost } = useMutation('likePost', (id: number) =>
    unlikeCommunityPost(id)
  );

  const { mutate: createPost, isLoading: isCreatingPost } = useMutation(
    ['createPost'],
    (data: { content: string }) =>
      createCommunityPost({
        ...data,
        communityId,
      }),
    {
      onSuccess(data) {
        toast.success('Post created successfully', {
          duration: 3000,
        });
        refetch();
      },
    }
  );

  const loadMorePosts = useCallback(() => {
    if (
      isFetchingNextPage ||
      communityPosts?.data.length === communityPosts?.totalCount
    )
      return;

    setIsFetchingNextPage(true);
    setLimit((prev) => prev + 10);
  }, [
    isFetchingNextPage,
    communityPosts?.data.length,
    communityPosts?.totalCount,
  ]);

  return (
    <div className="p-6 w-full bg-white rounded-xl shadow-md space-y-4">
      <Typography variant="h3" weight="bold" className="flex items-center">
        <Image
          src="/membersCard.svg"
          alt="Members Icon"
          className="w-8 h-8 mr-2"
          width={32}
          height={32}
          unoptimized={true}
        />
        Feed
      </Typography>
      <div className="mt-4">
        <div className="flex justify-center p-4 w-full border-t border-gray-300">
          <CreatePostModal
            icon="/uplode.svg"
            title="Create a post"
            buttonTrigger={'Add Post'}
            buttonAction="Publish"
            buttonActionLoading={isCreatingPost}
            onPublish={(data) => createPost(data)}
          />
        </div>
        <div>
          {isFetchingCommunityPosts ? (
            <div className="w-full flex flex-col gap-3 ">
              {[1, 2, 3, 4].map((_, index) => (
                <div key={index}>
                  <FeedsSkeleton />
                </div>
              ))}
            </div>
          ) : (
            <>
              {communityPosts &&
                communityPosts?.data?.map(
                  (item: ICommunityPost, index: number) => {
                    const liked = item?.likes?.find(
                      (i: ILike) => i.userId === userInformation?.id
                    )
                      ? true
                      : false;

                    const isFriend = myPenpals.find(
                      (i: IPenpal) => i.id === item?.User?.id
                    );
                    return (
                      <div key={index}>
                        <Post
                          userId={item?.User?.id || 0}
                          key={index}
                          userFullName={item?.User?.name}
                          username={item?.User?.name}
                          userImage={item.User?.attachment?.file_path || ''}
                          created_at={item?.created_at}
                          description={item?.content}
                          attachment={
                            item.community_post?.file_path
                              ? item.community_post?.file_path
                              : ''
                          }
                          likes={item?._count?.likes}
                          comments={item?._count?.comments}
                          hasUserLiked={liked}
                          handleComment={() => {
                            if (item?.id) {
                              setCommentSection({
                                commentId: !openCommentSection
                                  ? item?.id
                                  : null,
                                openCommentSection: !openCommentSection,
                              });
                            }
                          }}
                          onUnlike={() => unLikePost(item.id)}
                          onLike={() => likePost(item.id)}
                          isFriend={isFriend ? true : false}
                        />
                        <Separator className="w-12/12" />
                        {commentId === item.id && openCommentSection ? (
                          <div className="py-3">
                            <CommentInput
                              loading={isCreatingComments}
                              onValueChange={(value) => {
                                if (value) {
                                  communityPostCommentApi({
                                    id: item.id,
                                    content: value,
                                  });
                                }
                              }}
                            />
                          </div>
                        ) : null}
                        {commentId === item.id && openCommentSection && (
                          <div
                            className={
                              item?.comments?.length > 2
                                ? ' overflow-y-auto h-[400px] w-full max-w-none'
                                : ''
                            }
                          >
                            {item &&
                              item?.comments?.map(
                                (comment: IComment, index: number) => {
                                  return (
                                    <div className="mb-3 ml-5 " key={index}>
                                      <Comment
                                        avatarUrl={
                                          comment.User?.attachment?.file_path ||
                                          '/assets/profile/teacherprofile.svg'
                                        }
                                        text={comment?.content}
                                        user={comment?.User?.name || ''}
                                        created_at={comment?.created_at}
                                      />
                                    </div>
                                  );
                                }
                              )}
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              {!isFetchingCommunityPosts && (
                <InfiniteScrollObserver
                  onIntersect={loadMorePosts}
                  isLoading={isFetchingCommunityPosts}
                />
              )}

              {isFetchingNextPage && (
                <div className="flex justify-center py-4">
                  <Loading />
                </div>
              )}
              {communityPosts?.data.length === communityPosts?.totalCount && (
                <Typography
                  variant="h5"
                  weight="semibold"
                  className="text-center text-gray-500"
                >
                  You've caught up with all the posts 😊
                </Typography>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
