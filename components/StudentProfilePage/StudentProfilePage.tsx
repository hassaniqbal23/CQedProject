'use client';

import React from 'react';
import { TabsComponent } from '@/components/ui';
import ProfileStudent from '@/components/common/StudentProfile/StudentProfile';
import { ProfileHeader } from '@/components/common/Profiles';
import {
  StudentFeeds,
  StudentGroups,
} from '../../app/teachers/students/[id]/(components)';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { startConversation } from '@/app/api/chat';
import { getStudentProfile } from '@/app/api/students';
import Loading from '../ui/button/loading';

const StudentProfilePage = () => {
  const params = useParams();
  const router = useRouter();

  const {
    data: studentProfile,
    isLoading,
    error,
  } = useQuery(
    ['getStudentProfile', params?.id],
    () =>
      getStudentProfile(Number(params?.id) as number).then((result) => {
        return result?.data?.data;
      }),
    {
      enabled: params?.id ? true : false,
    }
  );
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
    return (
      <div className="flex items-center justify-center h-[500px] w-full">
        <Loading />
      </div>
    );
  }

  const tabContents = [
    {
      value: 'profile',
      content: (
        <div className="mt-3 ">
          <ProfileStudent
            cardtitle="PERSONAL INFO"
            name={studentProfile?.profile?.full_name || ''}
            email={studentProfile?.email || ''}
            age={studentProfile?.profile?.dob || 0}
            birthDate={studentProfile?.profile?.dob || ''}
            gender={studentProfile?.profile?.gender || ''}
            country={studentProfile?.profile?.country || ''}
            address={studentProfile?.profile?.address || ''}
            status={studentProfile?.status === 1 ? 'Active' : 'Inactive'}
            Schedule="View all schedules"
            studentId={`#${studentProfile?.id}`}
          />
        </div>
      ),
    },
    {
      value: 'Feeds',
      content: (
        <div className="mt-3">
          <StudentFeeds userName={studentProfile?.profile?.full_name || ''} />
        </div>
      ),
    },
    {
      value: 'Groups',
      content: (
        <div className="mt-3">
          <StudentGroups
            userName={studentProfile?.user?.profile?.full_name || ''}
          />
        </div>
      ),
    },
    {
      value: 'DailyReport',
      content: <div className="mt-3">Coming Soon</div>,
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

  return (
    <div className="">
      <ProfileHeader
        name={studentProfile?.profile?.full_name}
        imageSize={{ width: 100, height: 100 }}
        titleClass="text-3xl"
        buttonProps={{
          isVisbile: true,
          onClick: () => {
            mutate({ id: params?.id as any });
          },
          buttonText: 'Message',
        }}
        profileIcon={studentProfile?.attachment?.file_path || ''}
      />
      <div className="mt-4">
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

export default StudentProfilePage;
