'use client';
import React, { useEffect, useState } from 'react';
import http from '@/app/utils/http';
import SchoolTable from '@/components/common/SchoolsTable';
import { Button, TabsComponent as Tabs } from '@/components/ui';
import { SendEmail } from '@/components/index';
import { useMutation, useQuery } from 'react-query';
import { Invite } from '@/app/api/invitations';
import DataTable from '@/components/ui/table/table';
import Pagination from '@/components/common/pagination/pagination';
import { getAllSchools, getInvites } from '@/app/api/admin';
import { toast } from 'sonner';
import { CircleAlert, Plus } from 'lucide-react';

const Schools = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [invitePage, setInvitedPage] = useState(1);
  const [invitePageSize, setInvitedPageSize] = useState(10);
  const [inviteSchool, setInviteSchool] = useState(false);

  const { data, refetch, isLoading } = useQuery(
    ['getInvitedSchools', page, pageSize],
    () => getAllSchools(page, pageSize),
    {
      enabled: true,
      onError(err) {
        console.log(err);
      },
    }
  );

  const {
    data: invitedSchools,
    isLoading: invitedSchoolsLoading,
    refetch: inviteRefetch,
  } = useQuery(['getInvites', page, pageSize], () => getInvites());

  const { mutate: schoolInvite, isLoading: inviteLoading } = useMutation(
    (userData: { emails: string; type: string }) => Invite(userData),
    {
      onSuccess: (res) => {
        toast.success(`${res.data.message}`, {
          position: 'bottom-center',
          icon: <CircleAlert />,
          closeButton: true,
        });
        setInviteSchool(false);
        refetch();
        inviteRefetch();
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const onSubmit = ({ emails }: { emails: string }) => {
    schoolInvite({ emails, type: 'SCHOOL' });
  };

  const handlePageChange = async (pageNumber: number) => {
    setPage(pageNumber);
    await refetch();
  };

  const handleInvitePageChange = async (pageNumber: number) => {
    setInvitedPage(pageNumber);
    await inviteRefetch();
  };

  return (
    <>
      <div className="w-full py-3 mt-7">
        <div className="w-full flex mb-4 items-center">
          <div>
            <h1 className={'text-3xl font-bold'}>Students</h1>
            <p>Your school students are listed below</p>
          </div>
          <div className={'ml-auto'}>
            <Button
              icon={<Plus size={25} />}
              iconPosition="left"
              size={'md'}
              onClick={() => setInviteSchool(true)}
            >
              Add Schools
            </Button>
          </div>
        </div>
        <Tabs
          defaultValue={'schools'}
          tabs={[
            {
              label: 'Schools',
              value: 'schools',
            },
            {
              label: 'Invited',
              value: 'invited',
            },
          ]}
          variant={'secondary'}
          tabContent={[
            {
              value: 'schools',
              content: (
                <div className={'pt-8'}>
                  <SchoolTable
                    data={data?.data.data as any}
                    loading={isLoading}
                  />
                  <div className={'flex justify-end w-full mt-4'}>
                    <Pagination
                      currentPage={page}
                      totalPages={
                        !isLoading ? data.data.totalCount / pageSize + 1 : 50
                      }
                      pageSize={pageSize}
                      fetchData={async (pageNumber, pageSize) => {
                        setPage(pageNumber);
                        setPageSize(pageSize);
                        await refetch();
                      }}
                      onPageChange={handlePageChange}
                      totalCount={!isLoading && data.data.totalCount}
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
                    columns={[{ label: 'School Email', key: 'email' }]}
                    data={invitedSchools?.data.data}
                    loading={invitedSchoolsLoading}
                  />
                  <div className={'flex justify-end w-full mt-4'}>
                    <Pagination
                      currentPage={invitePage}
                      totalPages={
                        !invitedSchoolsLoading
                          ? invitedSchools?.data.totalCount / invitePageSize + 1
                          : 0
                      }
                      pageSize={invitePageSize}
                      fetchData={async (page, size) => {
                        setInvitedPage(page);
                        setInvitedPageSize(size);
                        await inviteRefetch();
                      }}
                      onPageChange={handleInvitePageChange}
                      totalCount={invitedSchools?.data.totalCount}
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
        inviteLoading={inviteLoading}
        setOpen={setInviteSchool}
        open={inviteSchool}
        onSubmit={onSubmit}
        inviteButtonTitle={'Invite School'}
      />
    </>
  );
};

export default Schools;
