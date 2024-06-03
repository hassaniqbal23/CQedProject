'use client';

import React from 'react';
import { TabsComponent } from '@/components/ui';
import ProfileStudent from '@/components/common/StudentProfile/StudentProfile';
import { ProfileHeader } from '@/components/common/Profiles';
import {
  StudentFeeds,
  StudentGroups,
  DailyReport,
} from '../../../teachers/students/[id]/(components)';
import { useParams, useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { startConversation } from '@/app/api/chat';

const Profile = () => {
  const params = useParams();
  const router = useRouter();

  const { mutate } = useMutation(
    ['startConversation'],
    (params: { id: number | string }) => startConversation(params.id),
    {
      onSuccess(data) {
        router.push('/teachers/chats');
      },
    }
  );

  const tabContents = [
    {
      value: 'profile',
      content: (
        <div className="mt-3">
          <ProfileStudent
            cardtitle="PERSONAL INFO"
            name="arslan"
            email="arslan@gmail.com"
            age={25}
            birthDate="21/12/1999"
            gender="male"
            country="Pakistan"
            address="Gilgit-Baltistan"
            status="Active"
            Schedule="View all schedules"
            studentId="#12458u"
          />
        </div>
      ),
    },
    {
      value: 'Feeds',
      content: (
        <div className="mt-3">
          <StudentFeeds />
        </div>
      ),
    },
    {
      value: 'Groups',
      content: (
        <div className="mt-3">
          <StudentGroups />
        </div>
      ),
    },
    {
      value: 'DailyReport',
      content: (
        <div className="mt-3">
          <DailyReport />
        </div>
      ),
    },
    {
      value: 'DailyCommunication',
      content: (
        <div className="mt-3">
          <h3>Comming Soon</h3>
        </div>
      ),
    },
  ];
  return (
    <div>
      <ProfileHeader
        name="Moin Haikal"
        imageSize={{ width: 100, height: 100 }}
        titleClass="text-3xl"
        buttonProps={{
          isVisbile: true,
          onClick: () => {
            mutate(params as any);
          },
          buttonText: 'Messages',
        }}
        profileIcon="/assets/profile/teacherprofile.svg"
      />
      <div className="my-10 h-dvh p-2">
        <TabsComponent
          defaultValue="profile"
          isSeparator={true}
          tabs={[
            {
              label: 'Profile',
              value: 'profile',
            },
            {
              label: 'Feeds',
              value: 'Feeds',
            },
            {
              label: 'Groups',
              value: 'Groups',
            },
            {
              label: 'Daily Report',
              value: 'DailyReport',
            },
            {
              label: 'Daily Communication',
              value: 'DailyCommunication',
            },
          ]}
          tabContent={tabContents}
        />
      </div>
    </div>
  );
};

export default Profile;
