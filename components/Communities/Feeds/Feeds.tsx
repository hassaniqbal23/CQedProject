import React from 'react';
import Image from 'next/image';
import { Typography } from '@/components/common/Typography/Typography';
import { CreatePostModal } from '@/components/common/CreatePostModal/CreatePostModal';
import { Post } from '@/components/common/Post/Post';
import { useMutation, useQuery } from 'react-query';
import {
  createCommunityPost,
  getCommunityPosts,
  likeCommunityPost,
  unlikeCommunityPost,
} from '@/app/api/communities';
import { toast } from 'sonner';
import Loading from '@/components/ui/button/loading';
import { useGlobalState } from '@/app/gobalContext/globalContext';

interface FeedsProps {
  communityId: string | number;
}

export const Feeds = ({ communityId }: FeedsProps) => {
  const { userInformation } = useGlobalState();
  const { data, isLoading, refetch } = useQuery('getCommunityPosts', () =>
    getCommunityPosts(communityId)
  );

  const { mutate: likePost } = useMutation('likePost', (postId: number) =>
    likeCommunityPost(postId)
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
        console.log('Post created');
        toast.success('Post created successfully', {
          duration: 3000,
        });
        refetch();
      },
    }
  );

  return (
    <div className="mt-6">
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
                    onComplete={() => {
                      alert('hello');
                    }}
                    onUnlike={() => unLikePost(item.id)}
                    onLike={() => likePost(item.id)}
                  />
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
