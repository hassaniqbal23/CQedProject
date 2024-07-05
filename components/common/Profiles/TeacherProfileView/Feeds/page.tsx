import React from 'react';
import { Post } from '@/components/common/Post/Post';
import { useMutation, useQuery } from 'react-query';
import { deletePost, getUserFeed } from '@/app/api/feeds';
import { useParams } from 'next/navigation';
import FeedsSkeleton from '@/components/common/FeedsSkeleton/FeedsSkeleton';

const TeacherProfileFeeds = () => {
  const params = useParams();
  const { data, isLoading, refetch } = useQuery(
    ['getUserFeed', params?.id],
    () => {
      const id = params?.id;
      if (typeof id === 'string') {
        return getUserFeed(parseInt(id, 10));
      }
      throw new Error('Invalid ID type');
    },
    {
      enabled: !!params?.id && typeof params?.id === 'string',
    }
  );

  const { mutate: deleteFeed } = useMutation(
    'deletePost',
    (id: number) => deletePost(id),
    {
      onSuccess(data) {
        refetch;
      },
    }
  );

  return (
    <div className="flex">
      <div className="w-full px-2 gap-10">
        <div className="mt-6">
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
                data?.data.data.map((item: any, index: number) => (
                  <div
                    key={index}
                    className="mb-4 gap-2 border shadow-sm rounded-lg"
                  >
                    <Post
                      userImage={item.User?.attachment?.file_path}
                      userFullName={item.User?.name}
                      username={item.User?.name}
                      created_at={item.created_at}
                      description={item.content}
                      attachment={
                        item.attachments
                          ? item.attachments
                          : ''
                      }
                      showCommentButton={false}
                      showLikeButton={false}
                      showShareButton={false}
                      isMyPost={true}
                      onDeletePost={() => deleteFeed(item.id)}
                    />
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfileFeeds;
