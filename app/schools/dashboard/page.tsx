'use client';
import React, { useState } from 'react';
import { DashboardWelcome } from '@/components/common/dashboard/welcome/welcome';
import { useMutation } from 'react-query';
import { Invite } from '@/app/api/invitations';
import { SendEmail } from '@/components/index';

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

  const onSubmit = ({ emails }: { emails: string }) => {
    schoolInvite({ emails, type: 'SCHOOL_TEACHER' });
  };

  return (
    <div>
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
    </div>
  );
}
