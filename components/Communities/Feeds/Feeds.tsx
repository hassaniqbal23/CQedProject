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
import {
  IComment,
  ICommunityPost,
  ILike,
  IReplyComments,
} from '@/types/global';
import { IPenpal } from '@/app/globalContext/types';
import FeedsSkeleton from '@/components/common/FeedsSkeleton/FeedsSkeleton';
import InfiniteScrollObserver from '@/components/common/InfiniteScrollObserver/InfiniteScrollObserver';
import { commentLike, commentUnlike, deletePost } from '@/app/api/feeds';
import useSendPenpalRequest from '@/lib/useSendPenpalRequest';
import { extractUserInfo, formatMentions } from '@/app/utils/helpers';

interface FeedsProps {
  communityId: string | number;
}

export const Feeds = ({ communityId }: FeedsProps) => {
  const { userInformation, myPenpals } = useGlobalState();
  const [commentSection, setCommentSection] = useState<{
    commentId: number | null;
    openCommentSection: boolean;
    replyId?: number | null;
    openReply?: boolean;
  }>({
    commentId: null,
    openCommentSection: false,
    openReply: false,
    replyId: null,
  });
  const [limit, setLimit] = useState(10);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [creatingPanpalId, setCreatingPanpalId] = useState<number | null>(null);
  const { sendRequest, isCreatingPenpal } = useSendPenpalRequest();
  const [replyLoading, setReplyLoading] = useState(false);

  const { commentId, openCommentSection, openReply, replyId } = commentSection;

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
  const { mutate: communityPostCommentApi, isLoading: isCreatingComments } =
    useMutation(
      'createCommunityPostComment',
      (requestBody: {
        id: number;
        content: string;
        parentCommentId?: number;
      }) =>
        communityPostComment({
          communityPostId: requestBody.id,
          content: requestBody.content,
          parentCommentId: requestBody.parentCommentId,
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

  const { mutate: likePost } = useMutation(
    (postId: number) => likeCommunityPost(postId),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: unLikePost } = useMutation(
    (id: number) => unlikeCommunityPost(id),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );
  const { mutate: likeComment } = useMutation((id: number) => commentLike(id), {
    onSuccess: () => {
      refetch();
    },
  });
  const { mutate: unLikeComment } = useMutation(
    (id: number) => commentUnlike(id),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: deleteFeeds } = useMutation((id: number) => deletePost(id), {
    onSuccess() {
      refetch();
    },
  });

  const { mutate: createPost, isLoading: isCreatingPost } = useMutation(
    ['createPost'],
    (data: {
      content: string;
      attachment_id?: string | number;
      communityId?: number | string;
      pinned_post_id?: number;
    }) => {
      if (data.pinned_post_id) {
        return createCommunityPost({
          ...data,
        });
      } else {
        return createCommunityPost({
          ...data,
          communityId,
        });
      }
    },

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
      <Typography variant="h3" weight="semibold" className="flex items-center">
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

                    const isFriend = myPenpals
                      .filter((i) => {
                        if (i.status === 'ACCEPTED') {
                          return i;
                        }
                      })
                      .find(
                        (i: IPenpal) =>
                          i.receiverId === item?.User?.id ||
                          i.senderId === item?.User?.id
                      )
                      ? true
                      : false;

                    const pendingPenpals = myPenpals.filter((i) => {
                      if (i.status === 'PENDING') {
                        return i;
                      }
                    });

                    const isPending = pendingPenpals.find(
                      (i: IPenpal) => i?.receiverId === item?.User?.id
                    );

                    const mentionUser = extractUserInfo(
                      item,
                      myPenpals.filter((i) => i.status === 'ACCEPTED')
                    ).filter((item) => item.id !== userInformation?.id);

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
                          onUnlike={() => unLikePost(item?.id)}
                          onLike={() => likePost(item?.id)}
                          isFriend={isFriend ? true : false}
                          addFriendText={isPending ? 'Pending' : 'Add Friend'}
                          onAddFriend={() => {
                            setCreatingPanpalId(index);
                            sendRequest({ receiverId: item?.User?.id });
                          }}
                          addFriendLoading={
                            isCreatingPenpal && creatingPanpalId === index
                          }
                          isMyPost={item?.User?.id === userInformation?.id}
                          share={item._count.child_posts}
                          onDeletePost={() => deleteFeeds(item?.id)}
                          showShareButton={
                            item?.User?.id !== userInformation?.id
                          }
                          handleShare={(data) => {
                            let payload;
                            if (item?.pinned_post) {
                              payload = {
                                content: data.content,
                                pinned_post_id: item?.pinned_post?.id,
                                commentId: data.communityId,
                              };
                            } else {
                              payload = {
                                content: data.content,
                                pinned_post_id: item?.id,
                                commentId: data.communityId,
                              };
                            }

                            createPost(payload as any);
                          }}
                          sharePost={
                            item?.pinned_post && {
                              userId: item?.pinned_post?.User.id,
                              description: item?.pinned_post?.content || '',
                              attachment: item?.pinned_post?.community_post
                                ?.file_path
                                ? item?.pinned_post?.community_post?.file_path
                                : '',
                              userFullName: item?.pinned_post?.User.name || '',
                              username: item?.pinned_post?.User.name || '',
                              created_at: item?.pinned_post?.created_at || '',
                              userImage:
                                item?.pinned_post?.User?.attachment
                                  ?.file_path || '',
                            }
                          }
                        />
                        <Separator className="w-12/12" />
                        {commentId === item.id && openCommentSection ? (
                          <div className="py-3 px-3">
                            <CommentInput
                              users={mentionUser || []}
                              loading={!replyLoading && isCreatingComments}
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
                                  const liked = comment?.likes?.find(
                                    (i) => i.userId === userInformation?.id
                                  )
                                    ? true
                                    : false;
                                  return (
                                    <div className="mb-3 ml-5 px-3" key={index}>
                                      <Comment
                                        avatarUrl={
                                          comment.User?.attachment?.file_path ||
                                          '/assets/profile/teacherprofile.svg'
                                        }
                                        text={formatMentions(comment?.content)}
                                        user={comment?.User?.name || ''}
                                        created_at={comment?.created_at}
                                        handleComment={() => {
                                          setCommentSection({
                                            ...commentSection,
                                            replyId: comment.id,
                                            openReply: !openReply,
                                          });
                                        }}
                                        onLike={() => likeComment(comment.id)}
                                        onUnlike={() =>
                                          unLikeComment(comment.id)
                                        }
                                        hasUserLiked={liked}
                                        likes={comment._count.likes}
                                        replies={comment._count.replies}
                                      />
                                      {replyId === comment.id && openReply && (
                                        <div className="py-3 px-3">
                                          {comment?.replies?.length > 0 &&
                                            comment?.replies?.map(
                                              (
                                                reply: IReplyComments,
                                                index: number
                                              ) => {
                                                const liked =
                                                  reply?.likes?.find(
                                                    (i) =>
                                                      i.User.id ===
                                                      userInformation?.id
                                                  )
                                                    ? true
                                                    : false;
                                                return (
                                                  <div
                                                    className="mb-3 ml-3 px-2"
                                                    key={index}
                                                  >
                                                    <Comment
                                                      avatarUrl={
                                                        reply.User?.attachment
                                                          ?.file_path ||
                                                        '/assets/profile/teacherprofile.svg'
                                                      }
                                                      text={formatMentions(
                                                        comment?.content
                                                      )}
                                                      user={
                                                        reply?.User?.name || ''
                                                      }
                                                      created_at={
                                                        reply?.created_at
                                                      }
                                                      handleComment={() => {
                                                        setCommentSection({
                                                          ...commentSection,
                                                          replyId: comment.id,
                                                          openReply: true,
                                                        });
                                                      }}
                                                      onLike={() =>
                                                        likeComment(reply.id)
                                                      }
                                                      onUnlike={() =>
                                                        unLikeComment(reply.id)
                                                      }
                                                      hasUserLiked={liked}
                                                      likes={reply._count.likes}
                                                      showComment={false}
                                                    />
                                                  </div>
                                                );
                                              }
                                            )}
                                          <CommentInput
                                            users={mentionUser || []}
                                            loading={replyLoading}
                                            onValueChange={(value) => {
                                              if (value) {
                                                setReplyLoading(true);
                                                communityPostCommentApi({
                                                  id: item.id,
                                                  content: value,
                                                  parentCommentId: comment.id,
                                                });
                                              }
                                            }}
                                          />
                                        </div>
                                      )}
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
              {communityPosts?.data.length === 0 && (
                <Typography
                  variant="h5"
                  weight="semibold"
                  className="text-center text-gray-500"
                >
                  No Post added in this community yet 😊
                </Typography>
              )}
              {communityPosts?.data &&
                communityPosts?.data.length !== 0 &&
                communityPosts?.data.length === communityPosts?.totalCount && (
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
