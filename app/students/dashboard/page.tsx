'use client';

import React from 'react';
import Coummuntiycard from '@/components/common/Communitycard/CommunityCard';
import ClassRoomHeader from '@/components/common/TeacherClassroomBanner/TeacherClassroomBanner';
import { Typography } from '@/components/common/Typography/Typography';
import { StudentDashboardCard } from '@/components/common/StudentdashboardCard/StudentdashboardCard';
import { Card, CardContent, CardHeader } from '@/components/ui';
import { MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function StudentDashboard() {
  const route = useRouter();
  return (
    <div>
      <ClassRoomHeader
        imageurl="/assets/students/youngwoman.svg"
        title="Welcome back, John!! "
        description="let’s get started with your Global Citizenship Education Journey"
      />
      <Typography
        variant="h3"
        weight="semibold"
        className="mb-2 mt-8 md:mt-2  py-5"
      >
        Suggested Activities
      </Typography>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 grid-rows-3">
        <div className="col-span-2">
          <div className="grid grid-rows-1 grid-cols-1 md:grid-cols-2 gap-4">
            <div className="col-span-1">
              <StudentDashboardCard
                className="h-64"
                buttonOnClick={() => route.push('/students/penpalship')}
                buttonText="Start"
                cardType="primary"
                description="Make a Global Friend"
                icon={{
                  height: 112,
                  src: '/friends.svg',
                  width: 112,
                }}
                title="Penpalship"
              />
            </div>
            <div className="col-span-1">
              <StudentDashboardCard
                className="h-64"
                buttonOnClick={() => route.push('/students/cq-communities')}
                buttonText="Start"
                cardType="default"
                description="Explore CQ Communities "
                icon={{
                  src: '/diversity.svg',
                  height: 112,
                  width: 112,
                }}
                title="Explore CQ Communities"
              />
            </div>
          </div>
          <div className="grid grid-rows-1 grid-cols-1 gap-3 mt-2">
            <div className="col-span-1">
              <StudentDashboardCard
                buttonOnClick={() => route.push('/students/cq-courses')}
                buttonText="Explore Courses"
                cardType="primary"
                description="Learn more about your own culture and about all the other amazing cultures of the world. "
                icon={{
                  height: 112,
                  src: '/friends.svg',
                  width: 112,
                }}
                title="CQ Courses"
              />
            </div>
          </div>
        </div>
        <div className="row-span-1 col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1">
          <Card className="bg-primary-50">
            <CardHeader>
              <Typography variant="h4" weight="semibold" className="">
                Suggested Communities for You
              </Typography>
            </CardHeader>
            <CardContent>
              {[1, 2, 3].map((_, index) => (
                <Coummuntiycard
                  className="bg-white mb-4"
                  key={index}
                  totalMembers={'330'}
                  totalDiscussions={14000}
                  title={'Friends Globally'}
                  imageSrc={'/globally.jpeg'}
                  buttonProps={{ size: 'sm' }}
                />
              ))}
              <Link
                href={'#'}
                className="flex justify-center items-center text-primary-500 py-6"
              >
                Explore more communities
                <MoveRight className="ml-3" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
