import {
  communityPostComment,
  likeCommunityPost,
  unlikeCommunityPost,
} from '@/app/api/communities';
import { createPost, deletePost, getFeeds } from '@/app/api/feeds';
import { useGlobalState } from '@/app/globalContext/globalContext';
import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Separator } from '../ui';
import { Post } from '../common/Post/Post';
import { IComment, ICommunityPost, ILike } from '@/types/global';
import Loading from '../ui/button/loading';
import { CommentInput } from '../Comment/CommentInput';
import { Comment } from '../Comment/Comment';
import { CreatePostModal } from '../common/CreatePostModal/CreatePostModal';
import { IPenpal } from '@/app/globalContext/types';
import { createPenpal } from '@/app/api/penpals';

function DashboardFeeds() {
  const { userInformation, myPenpals, pendingGlobalFriendsList } =
    useGlobalState();
  const queryClient = useQueryClient();
  const [creatingPanpalId, setCreatingPanpalId] = useState<number | null>(null);
  const [commentSection, setCommentSection] = useState<{
    commentId: number | null;
    openCommentSection: boolean;
  }>({
    commentId: null,
    openCommentSection: false,
  });

  const { commentId, openCommentSection } = commentSection;

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const { data, isLoading, refetch } = useQuery(
    ['getPosts', page, limit],
    async () => getFeeds(limit, page)
  );

  const { mutate: createFeed, isLoading: createPostLoading } = useMutation(
    (data) => createPost(data),
    {
      onSuccess() {
        refetch();
      },
    }
  );

  const { mutate: likePost } = useMutation('likePost', (postId: number) =>
    likeCommunityPost(postId)
  );

  const { mutate: unLikePost } = useMutation('unlikePost', (id: number) =>
    unlikeCommunityPost(id)
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
        onSuccess(res: any) {
          refetch();
          setCommentSection({
            commentId: res?.data?.data?.communityPostId,
            openCommentSection: true,
          });
        },
      }
    );

  const { mutate: sendPanpalRequest, isLoading: isCreatingPanpal } =
    useMutation((id: number) => createPenpal({ receiverId: id }), {
      onSuccess: (res) => {
        queryClient.refetchQueries('pending-friends');
        setCreatingPanpalId(null);
        refetch();
      },
      onError: (error) => {
        console.error(error, 'Error =====> log');
      },
    });

  //deleted post mutatio
  const { mutate: deleteFeeds, isLoading: isDeletingPost } = useMutation(
    (id: number) => deletePost(id),
    {
      onSuccess() {
        refetch();
      },
    }
  );

  return (
    <div className="w-full px-2 gap-10 ">
      <div className="mb-4 flex flex-col gap-4">
        <CreatePostModal
          icon="/uplode.svg"
          title="Create a post"
          buttonTrigger={'Add Post'}
          buttonAction="Publish"
          buttonActionLoading={createPostLoading}
          onPublish={(data: any) => createFeed(data)}
        />
      </div>

      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="w-full h-[400px] flex items-center justify-center">
            <Loading />
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

                const isFriend =
                  myPenpals.find((i: IPenpal) => i.id === item?.User?.id) ||
                  item.User.id === userInformation?.id;

                const isPending = pendingGlobalFriendsList.find(
                  (i: IPenpal) => i.id === item?.User?.id
                );

                return (
                  <div
                    key={index}
                    className="rounded-lg border bg-card  shadow-sm w-full"
                  >
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
                            commentId: !openCommentSection ? item?.id : null,
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
                        sendPanpalRequest(item?.User?.id);
                      }}
                      addFriendLoading={
                        isCreatingPanpal && creatingPanpalId === index
                      }
                      isMyPost={item?.User?.id === userInformation?.id}
                      onDeletePost={() => deleteFeeds(item?.id)}
                      showShareButton={item?.User?.id !== userInformation?.id}
                    />
                    <Separator className="w-12/12" />
                    {commentId === item.id && openCommentSection ? (
                      <div className="py-3 px-3">
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
                                <div className="mb-3 ml-5 px-3" key={index}>
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
              })}
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardFeeds;
