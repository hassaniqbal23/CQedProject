'use client';

import React, { useState } from 'react';
import Coummuntiycard from '@/components/common/Communitycard/CommunityCard';
import ClassRoomHeader from '@/components/common/TeacherClassroomBanner/TeacherClassroomBanner';
import { Typography } from '@/components/common/Typography/Typography';
import { StudentDashboardCard } from '@/components/common/StudentdashboardCard/StudentdashboardCard';
import { Card, CardContent, CardHeader } from '@/components/ui';
import { MoveRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ActionCard } from '@/components/Penpalship/ActionCard/ActionCard';
import { EventCard } from '@/components/Penpalship/EventCard/EventCard';

export default function StudentDashboard() {
  const route = useRouter();

  const [actionsList] = useState([
    {
      title: 'Plant a Tree',
      description: 'Help everyone breath well',
      buttonText: 'Take Action',
      icon: '/assets/students/plant1.svg',
      onButtonClick: () => {},
    },
    {
      title: 'Research Projects',
      description: 'Projects on global issues',
      buttonText: 'Take Action',
      icon: '/assets/students/innovation1.svg',
      onButtonClick: () => {},
    },
    {
      title: 'Language Learning',
      description: 'Learn a new language',
      buttonText: 'Take Action',
      icon: '/assets/students/Artboard.svg',
      onButtonClick: () => {},
    },
  ]);

  const eventList = [
    {
      title: 'Celebrating Hanukkah, The Jewish Festival Of Lights',
      image: '/assets/students/celebrating.svg',
      link: '#',
    },
    {
      title: 'Christmas Celebrations From Around The World',
      image: '/assets/students/event1.svg',
      link: '#',
    },
    {
      title: 'Get Ready To "Fall Back" One Hour This Weekend!',
      image: '/assets/students/clock.svg',
      link: '#',
    },
  ];

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

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 grid-rows-1">
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
                title="Global Friends"
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
            <div className="col-span-1">
              <Typography variant="h4" weight="semibold" className="py-6">
                Take Action
              </Typography>

              <div className="grid gap-5  grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 grid-rows-1">
                {actionsList.map((item, index) => {
                  return (
                    <div className="col-span-1">
                      <ActionCard
                        key={index}
                        buttonText={item.buttonText}
                        description={item.description}
                        icon={item.icon}
                        onButtonClick={item.onButtonClick}
                        title={item.title}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1">
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
          <div className="mt-14">
            <Typography variant="h4" weight="semibold" className="">
              News
            </Typography>
            {eventList.map((item, index) => (
              <EventCard
                key={index}
                image={item.image}
                link={item.link}
                title={item.title}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
