'use client';
import React from 'react';
import Coummuntiycard from '@/components/common/Communitycard/CommunityCard';
import { Post } from '@/components/common/Post/Post';
import { Card } from '@/components/ui';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import { Typography } from '@/components/common/Typography/Typography';
import { NewFeeds } from '@/components/NewFeeds/NewFeeds';
import { GlobalFriendConnect } from '@/components/common/GlobalFriendsConnect/GlobalFriend';

export default function StudentDashboard() {
  return (
    <div className="flex">
      <div className="w-full px-2 gap-10 ">
        <div className="mb-4">
          <NewFeeds userImage={'/teacherIcon.svg'} />
        </div>

        <div>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((_, index) => (
            <div key={index} className="mb-4 gap-4 border shadow-sm rounded-lg">
              <Post
                userImage={'/teacherIcon.svg'}
                userFullName={'Johanes Stim'}
                username={'Johanes Stim'}
                created_at={'2021-10-10T00:00:00.000Z'}
                description={
                  'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
                }
                attachment={
                  '/assets/images/img.png'
                  // index === 2
                  //   ? '/assets/images/img.png'
                  //   : index % 4 === 0
                  //     ? [
                  //         ,
                  //         '/assets/images/img.png',
                  //         '/assets/images/img.png',
                  //       ]
                  //     : undefined
                }
                // video={
                //   index == 5
                //     ? 'https://www.youtube.com/watch?v=ANzPM5-lwXc'
                //     : undefined
                // }
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <Card className="mb-4 whitespace-nowrap">
          <div className="px-3 whitespace-nowrap">
            <Typography
              variant="h4"
              weight="semibold"
              className="flex whitespace-nowrap my-3"
            >
              Suggested Communities
            </Typography>

            {[1, 2, 3].map((_, index) => (
              <div key={index} className="whitespace-nowrap">
                <Coummuntiycard
                  className="bg-white "
                  totalMembers={'330'}
                  totalDiscussions={14000}
                  title={'Friends Globally'}
                  imageSrc={'/globally.jpeg'}
                  buttonProps={{ size: 'sm' }}
                />
              </div>
            ))}
            <Link
              href={'/students/cq-communities'}
              className="flex justify-center items-center text-primary-500 py-6"
            >
              Explore more communities
              <MoveRight className="ml-3" />
            </Link>
          </div>
        </Card>
        <Card>
          <div className="px-3">
            <Typography
              variant="h4"
              weight="semibold"
              className="flex whitespace-nowrap my-3"
            >
              Suggested Global Friends
            </Typography>
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="mb-4 ">
                <GlobalFriendConnect
                  name={'William Johnson'}
                  username={'williamjohnson'}
                  imageUrl={'/teacherIcon.svg'}
                />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
