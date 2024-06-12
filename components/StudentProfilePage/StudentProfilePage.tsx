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
import Loading from '../ui/button/loading';
import { format, parseISO, differenceInYears } from 'date-fns';
import { IStudents } from '@/types/students';

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
        return result?.data?.data as IStudents;
      }),
    {
      enabled: params?.id ? true : false,
    }
  );
  console.log(studentProfile, 'getStudentProfile');

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
            name={studentProfile?.user?.name || ''}
            email={studentProfile?.user?.email || ''}
            age={24}
            birthDate={24 / 2000}
            gender={studentProfile?.user?.profile?.gender || ''}
            country={studentProfile?.user?.profile?.country || ''}
            address={studentProfile?.user?.profile?.address || ''}
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
          <StudentFeeds
            userName={studentProfile?.user?.profile?.first_name || ''}
          />
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
        name={studentProfile?.user?.profile?.first_name}
        imageSize={{ width: 100, height: 100 }}
        titleClass="text-3xl"
        buttonProps={{
          isVisbile: true,
          onClick: () => {
            mutate({ id: params?.id as any });
          },
          buttonText: 'Message',
        }}
        profileIcon={studentProfile?.user?.attachment?.file_path || ''}
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
