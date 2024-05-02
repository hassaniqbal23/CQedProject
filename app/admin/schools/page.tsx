'use client';
import React, { useEffect, useState } from 'react';
import http from '@/app/utils/http';
import Link from 'next/link';
import SchoolTable from '@/components/common/SchoolsTable';
import { Button, TabsComponent as Tabs } from '@/components/ui';
import { SendEmail } from '@/components/index';
import { useMutation } from 'react-query';
import { Invite } from '@/app/api/invitations';
import DataTable from '@/components/ui/table/table';
import Pagination from '@/components/common/pagination/pagination';

const Schools = () => {
  const [data, setData] = useState([]);
  const [invitedSchools, setInvitedSchools] = useState([]);
  const [inviteSchool, setInviteSchool] = useState(false);

  const fetch = async () => {
    http.get('/schools/all-schools').then((res) => {
      setData(res.data.data || []);
    });
    http.get('/invitation/all-invites').then((res) => {
      setInvitedSchools(res.data.data || []);
    });
  };

  const { mutate: schoolInvite, isLoading } = useMutation(
    (userData: { emails: string; type: string }) => Invite(userData),
    {
      onSuccess: (res) => {
        setInviteSchool(false);
        fetch();
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  const onSubmit = ({ emails }: { emails: string }) => {
    schoolInvite({ emails, type: 'SCHOOL' });
  };

  const handlePageChange = (pageNumber: number) => {
    console.log('Go to page', pageNumber);
  };

  const handleInvitePage = (pageNumber: number) => {
    console.log('Go to invite', pageNumber);
  };

  const fetchData = async (
    pageNumber: number,
    pageSize: number
  ): Promise<any> => {
    // Example:
    const response = await http.get(
      `/schools?page=${pageNumber}&pageSize=${pageSize}`
    );
    return response.data;
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div>
      <div className="w-full py-3 mt-7">
        <div className="w-full flex justify-between mb-4">
          <h2 className="font-semibold">Schools</h2>
          <Button
            className="font-semibold"
            onClick={() => setInviteSchool(true)}
          >
            Invite School
          </Button>
          <SendEmail
            inviteLoading={isLoading}
            setOpen={setInviteSchool}
            open={inviteSchool}
            onSubmit={onSubmit}
            inviteButtonTitle={'Invite School'}
          />
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
                  <SchoolTable data={data} />
                  <div className={'flex justify-end w-full mt-4'}>
                    <Pagination
                      currentPage={1}
                      totalPages={50}
                      pageSize={10}
                      fetchData={fetchData}
                      onPageChange={handlePageChange}
                      totalCount={50}
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
                    data={invitedSchools}
                  />
                  <div className={'flex justify-end w-full mt-4'}>
                    <Pagination
                      currentPage={1}
                      totalPages={50}
                      pageSize={10}
                      fetchData={fetchData}
                      onPageChange={handlePageChange}
                      totalCount={50}
                      SetPageSize={(pageNumber) => {}}
                    />
                  </div>
                </div>
              ),
            },
          ]}
          onValueChange={() => {}}
        ></Tabs>
      </div>
    </div>
  );
};

export default Schools;
