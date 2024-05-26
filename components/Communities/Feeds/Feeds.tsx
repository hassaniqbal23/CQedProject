import React from 'react';
import Image from 'next/image';
import { Typography } from '@/components/common/Typography/Typography';
import { CreatePostModal } from '@/components/common/CreatePostModal/CreatePostModal';
import { Post } from '@/components/common/Post/Post';
import { useMutation } from 'react-query';
import { createCommunityPost } from '@/app/api/communities';
import { toast } from 'sonner';

interface FeedsProps {
  feedList: any[];
}

export const Feeds = ({ feedList }: FeedsProps) => {
  const { mutate: createPost } = useMutation(
    ['createPost'],
    (data) => createCommunityPost(data),
    {
      onSuccess(data) {
        console.log('Post created');
        toast.success('Post created successfully', {
          duration: 3000,
        });
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
            description=""
            buttonTrigger={'Add Post'}
            buttonAction="Publish"
          />
        </div>
        {feedList?.map((item: any, index: number) => (
          <Post
            key={index}
            userFullName="Alexander John"
            username="alexander john"
            userImage="/assets/profile/profile.svg"
            created_at="2021-10-10T00:00:00.000Z"
            description={item.content}
            attachment={['/assets/images/img.png']}
            likes={0}
            comments={0}
            onComplete={() => {
              alert('hello');
            }}
          />
        ))}
      </div>
    </div>
  );
};
