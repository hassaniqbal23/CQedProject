import React, { useState } from 'react';
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
import { useGlobalState } from '@/app/gobalContext/globalContext';
import { CommentInput } from '@/components/Comment/CommentInput';

interface FeedsProps {
  communityId: string | number;
}

export const Feeds = ({ communityId }: FeedsProps) => {
  const { userInformation } = useGlobalState();
  const [commentSection, setCommentSection] = useState({
    commentId: null,
    openCommentSection: false,
  });

  const { commentId, openCommentSection } = commentSection;

  const { data, isLoading, refetch } = useQuery('getCommunityPosts', () =>
    getCommunityPosts(communityId)
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
        onSuccess(data, variables, context) {
          refetch();
          setCommentSection({ commentId: null, openCommentSection: false });
        },
      }
    );

  const { mutate: unLikePost } = useMutation('likePost', (id: number) =>
    unlikeCommunityPost(id)
  );

  const { mutate: createPost } = useMutation(
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

  console.log(data);

  return (
    <div className="mt-6 p-6 w-full bg-white rounded-xl shadow-md space-y-4">
      <Typography variant="h3" weight="bold" className="flex items-center">
        <Image
          src="/membersCard.svg"
          alt="Members Icon"
          className="w-8 h-8 mr-2"
          width={32}
          height={32}
        />
        Feed
      </Typography>
      <div className="mt-4">
        <div className="flex justify-end p-4 w-full border-t border-gray-300">
          <CreatePostModal
            icon="/uplode.svg"
            title="Create a post"
            buttonTrigger={'Add Post'}
            buttonAction="Publish"
            onPublish={(data) => createPost(data)}
          />
        </div>
        <div>
          {isLoading ? (
            <div className="w-full h-[400px] flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <>
              {data?.data?.map((item: any, index: number) => {
                const liked = item.likes.find(
                  (i: any) => i.userId === userInformation?.id
                )
                  ? true
                  : false;
                return (
                  <>
                    <Post
                      key={index}
                      userFullName={item.User.name}
                      username={item.User.name}
                      userImage={item.User.attachment.file_path}
                      created_at={item.created_at}
                      description={item.content}
                      attachment={
                        item.community_post?.file_path
                          ? [item.community_post?.file_path]
                          : []
                      }
                      likes={item._count.likes}
                      comments={item._count.comments}
                      hasUserLiked={liked}
                      handleComment={() => {
                        setCommentSection({
                          commentId: !openCommentSection ? item.id : null,
                          openCommentSection: !openCommentSection,
                        });
                      }}
                      onUnlike={() => unLikePost(item.id)}
                      onLike={() => likePost(item.id)}
                    />

                    {commentId === item.id && openCommentSection ? (
                      <div className="py-3">
                        <CommentInput
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
                    {item.comments && (
                      <>
                        {item.comments.map((comment: any) => {
                          return (
                            <div className="mb-3 ml-5 ">
                              <Comment
                                avatarUrl={
                                  comment.User.attachment.file_path ||
                                  '/assets/profile/teacherprofile.svg'
                                }
                                text={comment?.content}
                                user={comment?.User?.name}
                                created_at={comment?.created_at}
                              />
                            </div>
                          );
                        })}
                      </>
                    )}
                  </>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
