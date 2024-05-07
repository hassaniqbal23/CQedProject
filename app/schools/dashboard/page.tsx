'use client';
import React, { useState } from 'react';
import { DashboardWelcome } from '@/components/common/dashboard/welcome/welcome';
import { useMutation, useQuery } from 'react-query';
import { Invite } from '@/app/api/invitations';
import { SendEmail } from '@/components/index';
import DashboardStaticCards from '@/components/common/DashboardStaticCards';
import { format } from 'date-fns';
import Link from 'next/link';
import TeachersTable from '@/components/common/TeachersTable/TeachersTable';
import { getAllSchools } from '@/app/api/admin';
import { getInvitedTeachers } from '@/app/api/teachers';

const icons = [
  '/assets/welcome/grey_woman1.svg',
  '/assets/welcome/GreyHair.svg',
  '/assets/welcome/GreyHair.svg',
  '/assets/welcome/grey_woman_2.svg',
  '/assets/welcome/grey_man1.svg',
  '/assets/welcome/grey_man1.svg',
];

export default function SchoolDashboard() {
  const [inviteTeacherModal, setInviteTeacherModal] = useState(false);
  const [teachers, setTeachers] = useState([1, 3, 4]);

  const currentDate = format(new Date(), 'EEEE, MMMM do');

  const { data, isLoading: isFetchingInvitedSchools } = useQuery(
    ['getInvitedSchools'],
    () => getInvitedTeachers()
  );

  const { mutate: schoolInvite, isLoading } = useMutation(
    (userData: { emails: string; type: string }) => Invite(userData),
    {
      onSuccess: (res) => {
        setInviteTeacherModal(false);
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const cardData = [
    { title: 'Total Teachers', number: 12, percentage: 2.5 },
    { title: 'Total Students', number: '15,000', percentage: 2.5 },
    { title: 'Active Students', number: '15,000', percentage: 2.5 },
  ];

  const onSubmit = ({ emails }: { emails: string }) => {
    schoolInvite({ emails, type: 'SCHOOL_TEACHER' });
  };

  if (teachers.length === 0) {
    return (
      <>
        <DashboardWelcome
          buttonTitle="Invite Teachers"
          handleInviteClick={() => {
            setInviteTeacherModal(true);
          }}
          title="Teachers"
          icons={icons}
        />
        {inviteTeacherModal && (
          <SendEmail
            inviteLoading={isLoading}
            setOpen={setInviteTeacherModal}
            open={inviteTeacherModal}
            onSubmit={onSubmit}
            inviteButtonTitle={'Invite Teachers'}
            headerTitle={'Invite Teachers'}
          />
        )}
      </>
    );
  }

  return (
    <div>
      <p>{currentDate}</p>
      <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
      <div className={'w-full mt-6'}>
        <DashboardStaticCards data={cardData} />
      </div>
      <div className={'w-full mt-6 flex'}>
        <div className={'flex gap-3'}>
          <h2>Teachers List</h2>
        </div>
        <div className={'ml-auto'}>
          <Link href={'/schools/teachers'}>View all</Link>
        </div>
      </div>
      <div className={'mt-6'}>
        <TeachersTable
          data={[]}
          noDataMessage={'No Teachers'}
          loading={isFetchingInvitedSchools}
        />
      </div>
    </div>
  );
}
