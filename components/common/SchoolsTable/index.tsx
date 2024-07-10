'use client';
import { deactivateSchool } from '@/app/api/admin';
import { Dropdown } from '@/components/ui';
import DataTable from '@/components/ui/table/table';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';

export interface SchoolTableProps {
  data: any;
  noDataMessage?: string;
  loading?: boolean;
}

function SchoolTable(props: SchoolTableProps) {
  const { data, noDataMessage, loading } = props;
  const queryClient = useQueryClient();

  const { mutate: deactiveSchool } = useMutation(
    (schoolData: { schoolId: number; status: number }) =>
      deactivateSchool(schoolData.schoolId, { status: schoolData.status }),
    {
      onSuccess: () => {
        queryClient.refetchQueries('getInvitedSchools');
      },
      onError: (error) => {
        console.log('Error deactivating school', error);
      },
    }
  );

  const handleDeactivation = (schoolId: number, status: number) => {
    deactiveSchool({ schoolId, status });
  };

  return (
    <div className="w-full">
      <DataTable
        data={data}
        noDataMessage={noDataMessage || 'No Universities'}
        loading={loading}
        columns={[
          {
            label: 'University Name',
            key: 'name',
            render: (data) => {
              return (
                <div className="flex  items-center gap-2 w-full">
                  <Image
                    src={data?.ImagePath || '/assets/profile/profile.svg'}
                    alt={data?.ImagePath || 'school profile '}
                    width={30}
                    height={30}
                    unoptimized={true}
                  />
                  <h2>{data['name']}</h2>
                </div>
              );
            },
          },
          { label: 'Country', key: 'country' },
          { label: 'Email Address', key: 'email' },
          {
            label: 'No of Teachers',
            key: 'teacherCount',
            render: (data) => {
              return <div className="pl-10">{data['teacherCount']}</div>;
            },
          },
          {
            label: 'Actions',
            key: 'actions',
            render: (data) => {
              return (
                <div className="w-8">
                  <Dropdown
                    trigger={
                      <div>
                        <IoEllipsisVertical className="cursor-pointer" />
                      </div>
                    }
                    options={[
                      {
                        content: (
                          <Link href={`/admin/universities/${data.id}`}>
                            View Profile
                          </Link>
                        ),
                      },
                      {
                        content: (
                          <div onClick={() => handleDeactivation(data?.id, 2)}>
                            Deactivate University
                          </div>
                        ),
                      },
                    ]}
                  />
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
}

export default SchoolTable;
