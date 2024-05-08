'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui';
import { SendEmail } from '@/components/index';
import { useMutation, useQuery } from 'react-query';
import { Invite } from '@/app/api/invitations';
import { getInvitedTeachers } from '@/app/api/teachers';

const Dashboard = () => {
  const [inviteStudentModal, setInviteStudentModal] = useState(false);

  const { mutate: schoolInvite, isLoading } = useMutation(
    (studentData: { emails: string; type: string }) => Invite(studentData),
    {
      onSuccess: (res) => {
        setInviteStudentModal(false);
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const { data, isLoading: isFetchingInvitedSchools } = useQuery(
    ['getInvitedSchools'],
    () => getInvitedTeachers()
  );

  const onSubmit = ({ emails }: { emails: string }) => {
    schoolInvite({ emails, type: 'SCHOOL_STUDENT' });
  };

  return (
    <div>
      <div className={'flex mb-2'}>
        <h1>Teacher Dashboard</h1>
        <div className={'ml-auto'}>
          <Button onClick={() => setInviteStudentModal(true)}>
            Invite Students
          </Button>
        </div>
      </div>
      <hr />
      <SendEmail
        inviteLoading={isLoading}
        setOpen={setInviteStudentModal}
        open={inviteStudentModal}
        onSubmit={onSubmit}
        inviteButtonTitle={'Invite Students'}
        headerTitle={'Invite Students'}
      />
    </div>
  );
};

export default Dashboard;
