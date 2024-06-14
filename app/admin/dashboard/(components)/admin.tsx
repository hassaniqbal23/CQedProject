'use client';
import React, { useState } from 'react';
import { DashboardWelcome } from '@/components/common/dashboard/welcome/welcome';
import { SendEmail } from '@/components/index';
import { useMutation } from 'react-query';
import { Invite } from '@/app/api/invitations';

const icons = [
  '/assets/welcome/grey_woman1.svg',
  '/assets/welcome/GreyHair.svg',
  '/assets/welcome/GreyHair.svg',
  '/assets/welcome/grey_woman_2.svg',
  '/assets/welcome/grey_man1.svg',
  '/assets/welcome/grey_man1.svg',
];

export const AdminWelCome = () => {
  const [inviteSchool, setInviteSchool] = useState(false);

  const { mutate: schoolInvite, isLoading } = useMutation(
    (userData: { emails: string; type: string }) => Invite(userData),
    {
      onSuccess: (res) => {
        setInviteSchool(false);
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const onSubmit = ({ emails }: { emails: string }) => {
    schoolInvite({ emails, type: 'SCHOOL' });
  };

  return (
    <>
      <DashboardWelcome
        buttonTitle="Invite Universities"
        handleInviteClick={() => setInviteSchool(true)}
        title="Universities"
        icons={icons}
      />
      <SendEmail
        inviteLoading={isLoading}
        setOpen={setInviteSchool}
        open={inviteSchool}
        onSubmit={onSubmit}
        inviteButtonTitle={'Invite University'}
      />
    </>
  );
};
