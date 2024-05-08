'use client';

import { Button, Input } from '@/components/ui';
import { Plus } from 'lucide-react';
import { useMutation, useQuery } from 'react-query';
import { Invite } from '@/app/api/invitations';
import { SendEmail } from '@/components/index';
import React, { useState } from 'react';
import TeachersTable from '@/components/common/TeachersTable/TeachersTable';
import { getInvitedTeachers } from '@/app/api/teachers';

export default function SchoolTeachers() {
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
    schoolInvite({ emails, type: 'SCHOOL_TEACHER' });
  };

  return (
    <>
      <div className={'flex'}>
        <div>
          <h2 className={'text-3xl font-bold'}>Teachers</h2>
          <p>Teachers in your school</p>
        </div>
        <div className={'ml-auto flex gap-3'}>
          <Input placeholder={'Search teachers'} type={'search'} />
          <Button
            iconPosition={'left'}
            icon={<Plus></Plus>}
            onClick={() => setInviteStudentModal(true)}
          >
            Add Teachers
          </Button>
        </div>
      </div>
      <div className={'mt-6'}>
        <TeachersTable
          data={data ? data.data.data : []}
          noDataMessage={'No Teachers'}
          loading={isFetchingInvitedSchools}
        />
      </div>
      <SendEmail
        inviteLoading={isLoading}
        setOpen={setInviteStudentModal}
        open={inviteStudentModal}
        onSubmit={onSubmit}
        inviteButtonTitle={'Invite Teachers'}
        headerTitle={'Invite Teachers'}
      />
    </>
  );
}
