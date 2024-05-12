'use client';

import { Button, Input } from '@/components/ui';
import { Plus } from 'lucide-react';
import { useMutation, useQuery } from 'react-query';
import { Invite } from '@/app/api/invitations';
import { SendEmail } from '@/components/index';
import React, { useState } from 'react';
import TeachersTable from '@/components/common/TeachersTable/TeachersTable';
import { getInvitedTeachers } from '@/app/api/teachers';
import { Typography } from '@/components/common/Typography/Typography';

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

  const { data: invitedTeachers, isLoading: isFetchingInvitedSchools } =
    useQuery(['getInvitedTeachers'], () => getInvitedTeachers());

  const onSubmit = ({ emails }: { emails: string }) => {
    schoolInvite({ emails, type: 'SCHOOL_TEACHER' });
  };

  return (
    <>
      <div className={'flex'}>
        <div className="mb-2">
          <Typography variant={'h2'} weight={'semibold'}>
            Teachers
          </Typography>
          <Typography variant="p" weight="regular">
            The total number of teachers in your school
          </Typography>
        </div>
        <div className={'flex ml-auto gap-3  items-center'}>
          <Input
            rounded={true}
            placeholder={'Search teachers here...'}
            type={'search'}
          />
          <div>
            <Button
              variant={'default'}
              iconPosition={'left'}
              size={'md'}
              icon={<Plus />}
              onClick={() => setInviteStudentModal(true)}
            >
              Add Teachers
            </Button>
          </div>
        </div>
      </div>
      <div className={'mt-6'}>
        <TeachersTable
          data={invitedTeachers?.data?.data || []}
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
