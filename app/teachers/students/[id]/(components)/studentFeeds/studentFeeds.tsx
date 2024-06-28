import React, { useState, useRef, useCallback } from 'react';
import { useInfiniteQuery, InfiniteQueryObserverResult } from 'react-query';
import { Post } from '@/components/common/Post/Post';
import { Typography } from '@/components/common/Typography/Typography';
import { SelectInput } from '@/components/ui';
import { useParams } from 'next/navigation';
import { getStudentsFeeds } from '@/app/api/communities';
import Loading from '@/components/ui/button/loading';

// Define the types based on your API response structure
interface User {
  name: string;
  attachment: {
    file_path: string;
  };
}

interface PostData {
  id: number;
  attachment: string;
  created_at: string;
  content: string;
  likes: number;
  User: User;
  username: string;
}

interface ApiResponse {
  data: {
    data: PostData[];
    nextPage?: number; // Optional nextPage property for pagination
  };
}

interface IStudentsFeed {
  userName: string;
}

export const StudentFeeds = ({ userName }: IStudentsFeed) => {
  const params = useParams();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }: InfiniteQueryObserverResult<ApiResponse> = useInfiniteQuery(
    ['getStudentsFeeds', params?.id],
    ({ pageParam = 1 }) => getStudentsFeeds(params?.id as any, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.data.nextPage,
    }
  );

  const observer = useRef<IntersectionObserver | null>(null);

  const lastFeedElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px] w-full">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error loading profile</div>;
  }

  return (
    <>
      <div className="grid grid-cols-9 px-8 py-3">
        <div className="col-span-8">
          <Typography variant="h3" weight="semibold">
            {`${userName}’s`} Posting
          </Typography>
        </div>
      </div>
      <div className="px-4 py-1">
        {data?.pages.flatMap((page, pageIndex) =>
          page.data.data.map((post, index) => {
            const isLastPost =
              pageIndex === data.pages.length - 1 &&
              index === page.data.data.length - 1;
            if (isLastPost) {
              return (
                <div ref={lastFeedElementRef} key={post.id}>
                  <Post
                    attachment={post.attachment}
                    created_at={post.created_at}
                    description={post.content}
                    likes={post.likes}
                    showLikeButton={false}
                    showCommentButton={false}
                    userFullName={post.User.name}
                    userImage={post?.User?.attachment?.file_path}
                    username={post.username}
                    isFriend={false}
                  />
                </div>
              );
            }
            return (
              <Post
                key={post.id}
                attachment={post.attachment}
                created_at={post.created_at}
                description={post.content}
                likes={post.likes}
                userFullName={post.User.name}
                userImage={post?.User?.attachment?.file_path}
                username={post.username}
              />
            );
          })
        )}
        {isFetchingNextPage && <div>Loading more...</div>}
      </div>
    </>
  );
};
