'use client';

import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Invite } from '@/app/api/invitations';
import { SendEmail } from '@/components/common/SendEmailModal/SendEmailModal';
import { Button, Input, TabsComponent as Tabs } from '@/components/ui';
import { Plus } from 'lucide-react';
import Pagination from '@/components/common/pagination/pagination';
import DataTable from '@/components/ui/table/table';
import { InvitationType, getInvites } from '@/app/api/admin';
import { getAllStudents } from '@/app/api/students';
import StudentsTable from '@/components/common/StudentsTable';
import { Typography } from '@/components/common/Typography/Typography';

function SchoolStudents() {
  let Type = 'STUDNET';
  const [inviteStudentModal, setInviteStudentModal] = useState<boolean>(false);
  const [totalCountStudent, setTotalCountStudent] = useState<number>(1);
  const [totalCountInviteStudent, setTotalCountInviteStudent] =
    useState<number>(1);

  const [paginationStudent, setPaginationStudent] = useState<{
    studentPage: number;
    studentLimit: number;
  }>({
    studentPage: 1,
    studentLimit: 10,
  });
  const [paginationInviteStudent, setPaginationInviteStudent] = useState<{
    studentInvitePage: number;
    studentInviteLimit: number;
  }>({
    studentInvitePage: 1,
    studentInviteLimit: 10,
  });

  const { studentPage, studentLimit } = paginationStudent;
  const { studentInvitePage, studentInviteLimit } = paginationInviteStudent;

  const {
    data,
    refetch,
    isLoading: isLoadingAllStudents,
  } = useQuery(
    ['getAllStudents', studentPage, studentLimit],
    () => getAllStudents(studentPage, studentLimit),
    {
      onSuccess: (res) => {
        setTotalCountStudent(res.data.totalCount);
      },
      enabled: true,
      onError(err) {
        console.log(err);
      },
    }
  );

  const {
    data: invitedStudents,
    isLoading: invitedStudentsLoading,
    refetch: inviteRefetch,
  } = useQuery(
    ['getInvitesStudent', studentInvitePage, studentInviteLimit],
    () =>
      getInvites(
        studentInvitePage,
        studentInviteLimit,
        InvitationType.SCHOOL_STUDENT
      ),
    {
      onSuccess: (res) => {
        setTotalCountInviteStudent(res.data.totalCount);
      },
    }
  );

  const { mutate: studentInvite, isLoading } = useMutation(
    (studentData: { emails: string; type: string }) => Invite(studentData),
    {
      onSuccess: (res) => {
        setInviteStudentModal(false);
        inviteRefetch();
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const onSubmit = ({ emails }: { emails: string }) => {
    studentInvite({ emails, type: 'SCHOOL_STUDENT' });
  };

  return (
    <>
      <div>
        <div className={'flex mb-4 items-center'}>
          <div className="mb-2">
            <Typography variant={'h2'} weight={'semibold'}>
              Students
            </Typography>
            <Typography variant={'p'} weight={'regular'}>
              The total number of student
            </Typography>
          </div>
          <div className={'ml-auto'}>
            <Button
              iconPosition={'left'}
              size={'md'}
              icon={<Plus></Plus>}
              onClick={() => setInviteStudentModal(true)}
            >
              Add Students
            </Button>
          </div>
        </div>

        <Tabs
          defaultValue={'students'}
          tabs={[
            {
              label: 'Added Students',
              value: 'students',
            },
            {
              label: 'Invited Students',
              value: 'invited',
            },
          ]}
          variant={'secondary'}
          tabContent={[
            {
              value: 'students',
              content: (
                <div className={'pt-7'}>
                  <Input
                    placeholder={'Search student here... '}
                    type={'search'}
                    className={'mb-7'}
                  />
                  <StudentsTable
                    data={data?.data?.data || []}
                    loading={isLoadingAllStudents}
                  />
                  <div className={'flex justify-end w-full mt-4'}>
                    <Pagination
                      currentPage={studentPage}
                      totalPages={Math.ceil(totalCountStudent / studentLimit)}
                      pageSize={studentLimit}
                      onPageChange={(value: number) => {
                        setPaginationStudent((prev) => ({
                          ...prev,
                          studentPage: value,
                        }));
                      }}
                      totalCount={totalCountStudent}
                      setPageSize={(pageSize) =>
                        setPaginationStudent((prev) => ({
                          ...prev,
                          studentLimit: pageSize,
                        }))
                      }
                    />
                  </div>
                </div>
              ),
            },
            {
              value: 'invited',
              content: (
                <div className={'pt-8'}>
                  <DataTable
                    columns={[{ label: 'Student email Email', key: 'email' }]}
                    data={invitedStudents?.data?.data || []}
                    loading={invitedStudentsLoading}
                  />
                  <div className={'flex justify-end w-full mt-4'}>
                    <Pagination
                      currentPage={studentInvitePage}
                      totalPages={Math.ceil(
                        totalCountInviteStudent / studentInviteLimit
                      )}
                      pageSize={studentInviteLimit}
                      onPageChange={(value: number) => {
                        setPaginationInviteStudent((prev) => ({
                          ...prev,
                          studentInvitePage: value,
                        }));
                      }}
                      totalCount={totalCountInviteStudent}
                      setPageSize={(pageSize) =>
                        setPaginationInviteStudent((prev) => ({
                          ...prev,
                          studentInviteLimit: pageSize,
                        }))
                      }
                    />
                  </div>
                </div>
              ),
            },
          ]}
          onValueChange={() => {}}
        ></Tabs>
      </div>

      <SendEmail
        inviteLoading={isLoading}
        setOpen={setInviteStudentModal}
        open={inviteStudentModal}
        onSubmit={onSubmit}
        inviteButtonTitle={'Invite Students'}
        headerTitle={'Invite Students'}
      />
    </>
  );
}

export default SchoolStudents;
