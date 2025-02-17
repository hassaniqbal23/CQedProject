'use client';

import {
  communityPostComment,
  likeCommunityPost,
  unlikeCommunityPost,
} from '@/app/api/communities';
import {
  commentLike,
  commentUnlike,
  createPost,
  deletePost,
  getFeeds,
} from '@/app/api/feeds';
import { useGlobalState } from '@/app/globalContext/globalContext';
import React, { use, useCallback, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Separator } from '../ui';
import { Post } from '../common/Post/Post';
import {
  IComment,
  ICommunityPost,
  ILike,
  IReplyComments,
} from '@/types/global';
import Loading from '../ui/button/loading';
import { CommentInput } from '../Comment/CommentInput';
import { Comment } from '../Comment/Comment';
import { CreatePostModal } from '../common/CreatePostModal/CreatePostModal';
import { IPenpal } from '@/app/globalContext/types';
import FeedsSkeleton from '../common/FeedsSkeleton/FeedsSkeleton';
import dynamic from 'next/dynamic';
import { Typography } from '../common/Typography/Typography';
import useSendPenpalRequest from '@/lib/useSendPenpalRequest';
import { extractUserInfo, formatMentions } from '@/app/utils/helpers';
import ReplyComment from '../Comment/ReplyComment/ReplyComment';

const InfiniteScrollObserver = dynamic(
  () => import('../common/InfiniteScrollObserver/InfiniteScrollObserver'),
  { ssr: false }
);

function DashboardFeeds() {
  const { userInformation, myPenpals } = useGlobalState();
  const queryClient = useQueryClient();
  const [creatingPanpalId, setCreatingPanpalId] = useState<number | null>(null);
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
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [replyLoading, setReplyLoading] = useState(false);
  const { sendRequest, isCreatingPenpal } = useSendPenpalRequest();
  const [replyCommentLoading, setReplyCommentLoading] = useState(false);
  const { commentId, openCommentSection, openReply, replyId } = commentSection;

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const { data, isLoading, refetch } = useQuery(
    ['getPosts', page, limit],
    async () => getFeeds(limit, page),
    {
      keepPreviousData: true,
      onSuccess: () => {
        setIsFetchingNextPage(false);
      },
    }
  );

  const { mutate: createFeed, isLoading: createPostLoading } = useMutation(
    (data) => {
      return createPost(data);
    },
    {
      onSuccess() {
        refetch();
      },
    }
  );

  const { mutate: likePost } = useMutation(
    'likePost',
    (postId: number) => likeCommunityPost(postId),
    {
      onSuccess: (res) => {
        refetch();
      },
    }
  );

  const { mutate: unLikePost } = useMutation(
    'unlikePost',
    (id: number) => unlikeCommunityPost(id),
    {
      onSuccess() {
        refetch();
        queryClient.refetchQueries('getNotifications');
      },
    }
  );

  const { mutate: communityPostCommentApi, isLoading: isCreatingComments } =
    useMutation(
      'createCommunityPostComment',
      (requestBody: {
        id: number;
        content: string;
        parentCommentId?: number;
        mentionIds?: number[];
      }) => {
        if (requestBody.parentCommentId) {
          return communityPostComment({
            communityPostId: requestBody.id,
            content: requestBody.content,
            parentCommentId: requestBody.parentCommentId,
            mentionIds: requestBody.mentionIds,
          });
        } else {
          return communityPostComment({
            communityPostId: requestBody.id,
            content: requestBody.content,
            mentionIds: requestBody.mentionIds,
          });
        }
      },
      {
        onSuccess(res: any) {
          refetch();
          queryClient.refetchQueries('getNotifications');
          setCommentSection({
            ...commentSection,
            commentId: res?.data?.data?.communityPostId,
            openCommentSection: true,
          });
          setReplyLoading(false);
          setReplyCommentLoading(false);
        },
      }
    );

  const { mutate: deleteFeeds } = useMutation((id: number) => deletePost(id), {
    onSuccess() {
      refetch();
    },
  });

  const { mutate: likeComment } = useMutation((id: number) => commentLike(id), {
    onSuccess() {
      queryClient.refetchQueries('getNotifications');
    },
  });

  const { mutate: unLikeComment } = useMutation(
    (id: number) => commentUnlike(id),
    {
      onSuccess() {
        queryClient.refetchQueries('getNotifications');
      },
    }
  );

  const loadMorePosts = useCallback(() => {
    if (isFetchingNextPage || data?.data.data.length === data?.data.totalCount)
      return;

    setIsFetchingNextPage(true);
    setLimit((prev) => prev + 10);
  }, [isFetchingNextPage, data?.data.data.length, data?.data.totalCount]);

  return (
    <div className="w-full px-2 gap-10 ">
      <div className="mb-4 flex flex-col gap-4">
        <CreatePostModal
          icon="/upload.svg"
          title="Create a post"
          buttonTrigger={'Add Post'}
          buttonAction="Publish"
          buttonActionLoading={createPostLoading}
          onPublish={(data: any) => createFeed(data)}
        />
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="w-full flex flex-col gap-3 ">
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index}>
                <FeedsSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <>
            {data?.data &&
              data?.data?.data?.map((item: ICommunityPost, index: number) => {
                const liked = item?.likes?.find(
                  (i: ILike) => i.userId === userInformation?.id
                )
                  ? true
                  : false;

                const isFriend = myPenpals
                  .filter((item) => item.status === 'ACCEPTED')
                  .find(
                    (i: IPenpal) =>
                      i.receiverId === item?.User?.id ||
                      i.senderId === item?.User?.id
                  )
                  ? true
                  : false;

                const isPending = myPenpals
                  .filter((i) => {
                    if (i.status === 'PENDING') {
                      return i;
                    }
                  })
                  .find((i: IPenpal) => i?.receiverId === item?.User?.id);

                const mentionUser = extractUserInfo(
                  item,
                  myPenpals.filter((i) => i.status === 'ACCEPTED')
                ).filter((item) => item.id !== userInformation?.id);

                return (
                  <div
                    key={index}
                    className="rounded-lg border bg-card  shadow-sm w-full"
                  >
                    <Post
                      userId={item?.User?.id || 0}
                      fileType={index === 0 ? 'mp4' : 'image'}
                      key={index}
                      userFullName={item?.User?.name}
                      username={item?.User?.name}
                      userImage={item.User?.attachment?.file_path || ''}
                      created_at={item?.created_at}
                      description={item?.content}
                      attachment={item.attachments ? item.attachments : []}
                      likes={item?._count?.likes}
                      comments={item?._count?.comments}
                      hasUserLiked={liked}
                      handleComment={() => {
                        if (item?.id) {
                          setCommentSection({
                            commentId: !openCommentSection ? item?.id : null,
                            openCommentSection: !openCommentSection,
                          });
                        }
                      }}
                      onUnlike={() => unLikePost(item?.id)}
                      onLike={() => likePost(item?.id)}
                      isFriend={isFriend}
                      addFriendText={isPending ? 'Pending' : 'Add Friend'}
                      onAddFriend={() => {
                        setCreatingPanpalId(index);
                        sendRequest({ receiverId: item?.User?.id });
                      }}
                      addFriendLoading={
                        isCreatingPenpal && creatingPanpalId === index
                      }
                      isMyPost={item?.User?.id === userInformation?.id}
                      onDeletePost={() => deleteFeeds(item?.id)}
                      showShareButton={item?.User?.id !== userInformation?.id}
                      share={item._count.child_posts}
                      handleShare={(data) => {
                        let payload;
                        if (item?.pinned_post) {
                          payload = {
                            content: data.content,
                            pinned_post_id: item?.pinned_post?.id,
                            attachmentIds: [],
                            communityId: data.communityId
                              ? data.communityId
                              : null,
                          };
                        } else {
                          payload = {
                            content: data.content,
                            pinned_post_id: item?.id,
                            communityId: data.communityId
                              ? data.communityId
                              : null,
                            attachmentIds: [],
                          };
                        }

                        createFeed(payload as any);
                      }}
                      sharePost={
                        item?.pinned_post && {
                          userId: item?.pinned_post?.User.id,
                          description: item?.pinned_post?.content || '',
                          attachment: item?.pinned_post?.attachments
                            ? item?.pinned_post?.attachments
                            : [],
                          userFullName: item?.pinned_post?.User.name || '',
                          username: item?.pinned_post?.User.name || '',
                          created_at: item?.pinned_post?.created_at || '',
                          userImage:
                            item?.pinned_post?.User?.attachment?.file_path ||
                            '',
                        }
                      }
                    />
                    <Separator className="w-12/12" />
                    {commentId === item.id && openCommentSection ? (
                      <div className="py-3 px-3">
                        <CommentInput
                          users={mentionUser || []}
                          loading={!replyLoading && isCreatingComments}
                          onValueChange={(value, ids) => {
                            if (value) {
                              communityPostCommentApi({
                                id: item.id,
                                content: value,
                                mentionIds: ids,
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
                                    onUnlike={() => unLikeComment(comment.id)}
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
                                            console.log(reply);
                                            const liked = reply?.likes?.find(
                                              (i) =>
                                                i.User.id ===
                                                userInformation?.id
                                            )
                                              ? true
                                              : false;

                                            const repliedComment =
                                              item?.comments?.find(
                                                (item) =>
                                                  item.id ===
                                                  reply.parentCommentId
                                              );

                                            return (
                                              <div
                                                className="mb-3 ml-3 px-2"
                                                key={index}
                                              >
                                                <ReplyComment
                                                  avatarUrl={
                                                    reply.User?.attachment
                                                      ?.file_path ||
                                                    '/assets/profile/teacherprofile.svg'
                                                  }
                                                  text={formatMentions(
                                                    reply?.content
                                                  )}
                                                  user={reply?.User?.name || ''}
                                                  created_at={reply?.created_at}
                                                  onLike={() =>
                                                    likeComment(reply.id)
                                                  }
                                                  onUnlike={() =>
                                                    unLikeComment(reply.id)
                                                  }
                                                  hasUserLiked={liked}
                                                  likes={reply._count.likes}
                                                  mentionUsers={mentionUser}
                                                  submitLoading={
                                                    replyCommentLoading
                                                  }
                                                  onValueChange={(
                                                    value,
                                                    ids
                                                  ) => {
                                                    if (value) {
                                                      setReplyCommentLoading(
                                                        true
                                                      );
                                                      communityPostCommentApi({
                                                        id: item.id,
                                                        content: value,
                                                        parentCommentId:
                                                          reply.id,
                                                        mentionIds: ids,
                                                      });
                                                    }
                                                  }}
                                                  replyToName={
                                                    repliedComment
                                                      ? repliedComment?.User
                                                          .name
                                                      : ''
                                                  }
                                                  replyToText={
                                                    repliedComment
                                                      ? formatMentions(
                                                          repliedComment?.content
                                                        )
                                                      : ''
                                                  }
                                                />
                                              </div>
                                            );
                                          }
                                        )}
                                    </div>
                                  )}
                                  {replyId === comment.id && openReply && (
                                    <CommentInput
                                      users={mentionUser || []}
                                      loading={replyLoading}
                                      onValueChange={(value, ids) => {
                                        if (value) {
                                          setReplyLoading(true);
                                          communityPostCommentApi({
                                            id: item.id,
                                            content: value,
                                            parentCommentId: replyId,
                                            mentionIds: ids,
                                          });
                                        }
                                      }}
                                    />
                                  )}
                                </div>
                              );
                            }
                          )}
                      </div>
                    )}
                  </div>
                );
              })}
            {!isLoading && (
              <InfiniteScrollObserver
                onIntersect={loadMorePosts}
                isLoading={isLoading}
              />
            )}

            {isFetchingNextPage && (
              <div className="flex justify-center py-4">
                <Loading />
              </div>
            )}
            {data?.data?.data.length === 0 && (
              <Typography
                variant="h5"
                weight="semibold"
                className="text-center text-gray-500"
              >
                No Post added yet 😊
              </Typography>
            )}
            {data?.data?.data.length !== 0 &&
              data?.data.data.length === data?.data.totalCount && (
                <Typography
                  variant="h5"
                  weight="semibold"
                  className="text-center text-gray-500 mt-5"
                >
                  You've caught up with all the posts 😊
                </Typography>
              )}
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardFeeds;
