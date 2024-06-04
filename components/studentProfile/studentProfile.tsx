'use client';

import React from 'react';
import { TabsComponent } from '@/components/ui';
import ProfileStudent from '@/components/common/StudentProfile/StudentProfile';
import { ProfileHeader } from '@/components/common/Profiles';
import {
  StudentFeeds,
  StudentGroups,
  DailyReport,
} from '../../app/teachers/students/[id]/(components)';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { startConversation } from '@/app/api/chat';
import { getStudentProfile } from '@/app/api/students';

const Profile = () => {
  const params = useParams();
  const router = useRouter();

  // Fetch student profile data
  const {
    data: studentProfile,
    isLoading,
    error,
  } = useQuery(['getStudentProfile', params?.id], () =>
    getStudentProfile(params?.id as any)
  );

  console.log(studentProfile, 'studentProfile');

  const { mutate } = useMutation(
    ['startConversation'],
    (params: { id: number | string }) => startConversation(params.id),
    {
      onSuccess(data) {
        router.push('/teachers/chats');
      },
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading profile</div>;
  }

  const tabContents = [
    {
      value: 'profile',
      content: (
        <div className="mt-3 ">
          <ProfileStudent
            cardtitle="PERSONAL INFO"
            name={studentProfile?.data.data.fullname}
            email={studentProfile?.data.data.user.email}
            age={studentProfile?.data.data.age}
            birthDate={studentProfile?.data.data.birthDate}
            gender={studentProfile?.data.data.gender}
            country={studentProfile?.data.data.country}
            address={studentProfile?.data.data.user.profile[0].address}
            status={studentProfile?.data.data.status}
            Schedule="View all schedules"
            studentId={studentProfile?.data.data.schoolId}
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
          <h3>Coming Soon</h3>
        </div>
      ),
    },
  ];

  console.log(studentProfile?.data.data);

  return (
    <div className="">
      <ProfileHeader
        name={studentProfile?.data.data.fullname}
        imageSize={{ width: 100, height: 100 }}
        titleClass="text-3xl"
        buttonProps={{
          isVisbile: true,
          onClick: () => {
            mutate({ id: params?.id as any });
          },
          buttonText: 'Messages',
        }}
        profileIcon={studentProfile?.data.data.user.attachment.file_path}
      />
      <div className="">
        <TabsComponent
          className=" "
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
