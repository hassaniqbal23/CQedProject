'use client';

import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Invite } from '@/app/api/invitations';
import { SendEmail } from '@/components/common/SendEmailModal/SendEmailModal';
import { Button, Input, TabsComponent as Tabs } from '@/components/ui';
import { Plus } from 'lucide-react';
import Pagination from '@/components/common/pagination/pagination';
import DataTable from '@/components/ui/table/table';
import { getInvites } from '@/app/api/admin';
import { getAllStudents } from '@/app/api/students';
import StudentsTable from '@/components/common/StudentsTable';
import { Typography } from '@/components/common/Typography/Typography';

function SchoolStudents() {
  const [inviteStudentModal, setInviteStudentModal] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [invitePage, setInvitedPage] = useState(1);
  const [invitePageSize, setInvitedPageSize] = useState(10);

  const {
    data,
    refetch,
    isLoading: isLoadingAllStudents,
  } = useQuery(
    ['getAllStudents', page, pageSize],
    () => getAllStudents(page, pageSize),
    {
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
  } = useQuery(['getInvites', page, pageSize], () => getInvites());

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

  const handlePageChange = async (pageNumber: number) => {
    setPage(pageNumber);
    await refetch();
  };

  const handleInvitePageChange = async (pageNumber: number) => {
    setInvitedPage(pageNumber);
    await inviteRefetch();
  };

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
                      currentPage={page}
                      totalPages={
                        !isLoading ? data?.data?.totalCount / pageSize + 1 : 50
                      }
                      pageSize={pageSize}
                      fetchData={async (pageNumber, pageSize) => {
                        setPage(pageNumber);
                        setPageSize(pageSize);
                        await refetch();
                      }}
                      onPageChange={handlePageChange}
                      totalCount={!isLoading && data?.data?.totalCount}
                      SetPageSize={(pageNumber) => {}}
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
                      currentPage={invitePage}
                      totalPages={
                        !invitedStudentsLoading
                          ? invitedStudents?.data.totalCount / invitePageSize +
                            1
                          : 0
                      }
                      pageSize={invitePageSize}
                      fetchData={async (page, size) => {
                        setInvitedPage(page);
                        setInvitedPageSize(size);
                        await inviteRefetch();
                      }}
                      onPageChange={handleInvitePageChange}
                      totalCount={invitedStudents?.data.totalCount}
                      SetPageSize={(pageNumber) => console.log(pageNumber)}
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
