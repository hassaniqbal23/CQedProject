'use client';

import { Button, Input } from '@/components/ui';
import { Plus } from 'lucide-react';
import { useMutation, useQuery } from 'react-query';
import { Invite } from '@/app/api/invitations';
import { SendEmail } from '@/components/index';
import React, { useState } from 'react';
import TeachersTable from '@/components/common/TeachersTable/TeachersTable';
import { getInvitedTeachers, getTeachersBySearch } from '@/app/api/teachers';
import { Typography } from '@/components/common/Typography/Typography';
import Pagination from '@/components/common/pagination/pagination';

export default function UniversityTeachers() {
  const [inviteStudentModal, setInviteStudentModal] = useState<boolean>(false);
  const [teacherInviteCount, setTeacherInviteCount] = useState<number>(1);
  const [paginationTeacherInvite, setPaginationTeacherInvite] = useState<{
    teacherInvitePage: number;
    teacherInviteLimit: number;
  }>({
    teacherInvitePage: 1,
    teacherInviteLimit: 10,
  });
  const [searchTeacher, setSearchTeacher] = useState('');

  const { teacherInviteLimit, teacherInvitePage } = paginationTeacherInvite;

  const { mutate: teacherInvite, isLoading } = useMutation(
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
    useQuery(
      ['getInvitedTeachers', teacherInvitePage, teacherInviteLimit],
      () => getInvitedTeachers(teacherInvitePage, teacherInviteLimit),
      {
        onSuccess: (res) => {
          setTeacherInviteCount(res.data.totalCount);
        },
      }
    );
  const { data: searchTeachers, isLoading: isLoadingSearchTeachers } = useQuery(
    [
      'search-teacher-by-name',
      searchTeacher,
      teacherInvitePage,
      teacherInviteLimit,
    ],
    () =>
      getTeachersBySearch(teacherInvitePage, teacherInviteLimit, searchTeacher),
    {
      enabled: !!searchTeacher.trim(),
      refetchOnWindowFocus: false,
    }
  );

  const onSubmit = ({ emails }: { emails: string }) => {
    teacherInvite({ emails, type: 'SCHOOL_TEACHER' });
  };

  let timeout: NodeJS.Timeout;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Clear previous timeout (if any)
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      setSearchTeacher(inputValue);
      setPaginationTeacherInvite((prev) => ({ ...prev, teacherInvitePage: 1 }));
    }, 2000);
  };

  const combinedTeachersData = searchTeacher.trim()
    ? searchTeachers?.data?.data || []
    : invitedTeachers?.data?.data || [];

  return (
    <>
      <div className={'flex'}>
        <div className="mb-2">
          <Typography variant={'h2'} weight={'semibold'}>
            Teachers
          </Typography>
          <Typography variant="p" weight="regular">
            The total number of teachers in your University
          </Typography>
        </div>
        <div className={'flex ml-auto gap-3  items-center'}>
          <Input
            rounded={true}
            placeholder={'Search teachers here...'}
            type={'search'}
            onChange={handleInputChange}
          />
          <div>
            {/* <Button
              variant={'default'}
              iconPosition={'left'}
              size={'md'}
              icon={<Plus />}
              onClick={() => setInviteStudentModal(true)}
            >
              Add Teachers
            </Button> */}
          </div>
        </div>
      </div>
      <div className={'mt-6'}>
        <TeachersTable
          data={combinedTeachersData}
          noDataMessage={'No Teachers'}
          loading={isFetchingInvitedSchools || isLoadingSearchTeachers}
        />
        <div className={'flex justify-end w-full mt-4'}>
          <Pagination
            currentPage={teacherInvitePage}
            totalPages={Math.ceil(teacherInviteCount / teacherInviteLimit)}
            pageSize={teacherInviteLimit}
            onPageChange={(value: number) => {
              setPaginationTeacherInvite((prev) => ({
                ...prev,
                schoolPage: value,
              }));
            }}
            totalCount={teacherInviteCount}
            setPageSize={(pageSize) =>
              setPaginationTeacherInvite((prev) => ({
                ...prev,
                schoolLimit: pageSize,
              }))
            }
          />
        </div>
      </div>
      {/* <SendEmail
        inviteLoading={isLoading}
        setOpen={setInviteStudentModal}
        open={inviteStudentModal}
        onSubmit={onSubmit}
        inviteButtonTitle={'Invite Teachers'}
        headerTitle={'Invite Teachers'}
      /> */}
    </>
  );
}
