'use client';
import { deleteReports } from '@/app/api/admin';
import { Dropdown } from '@/components/ui';
import DataTable from '@/components/ui/table/table';
import React from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from 'react-query';

export interface SchoolTableProps {
  data: any;
  noDataMessage?: string;
  loading?: boolean;
}

function ReportsTable(props: SchoolTableProps) {
  const { data, noDataMessage, loading } = props;
  const queryClient = useQueryClient();

  const { mutate: deleteReportsMutation } = useMutation(
    (ids: number[]) => deleteReports(ids),
    {
      onSuccess: (res) => {
        toast.success(`${res.data.message}`, {
          position: 'bottom-center',
        });
        queryClient.refetchQueries('getReportedUsers');
      },
      onError: (error) => {
        console.log('Error deleting reports', error);
      },
    }
  );

  const handleDelete = (id: number) => {
    deleteReportsMutation([id]);
  };

  return (
    <div className="w-full">
      <DataTable
        data={data}
        noDataMessage={noDataMessage || 'No Reported Users'}
        loading={loading}
        columns={[
          // {
          //     label: 'User Name',
          //     key: 'User.name',
          //     render: (data) => {
          //         return (
          //             <div className="flex items-center gap-2 w-full">
          //                 <Image
          //                     src={data.User.attachment?.file_path || '/assets/profile/profile.svg'}
          //                     alt={data.User.name}
          //                     width={30}
          //                     height={30}
          //                     unoptimized={true}
          //                 />
          //                 <h2>{data.User.name}</h2>
          //             </div>
          //         );
          //     },
          // },
          // {
          //     label: 'User Email',
          //     key: 'User.email',
          //     render: (data) => {
          //         return (
          //             <div className="flex items-center gap-2 w-full">
          //                 <h2>{data.User.email}</h2>
          //             </div>
          //         );
          //     },
          // },
          {
            label: 'Reporter Name',
            key: 'Reporter.name',
            render: (data) => {
              return (
                <div className="flex items-center gap-2 w-full">
                  <h2>{data.User.name}</h2>
                </div>
              );
            },
          },
          {
            label: 'Reporter Email',
            key: 'Reporter.email',
            render: (data) => {
              return (
                <div className="flex items-center gap-2 w-full">
                  <h2>{data.User.email}</h2>
                </div>
              );
            },
          },
          {
            label: 'Reported Email',
            key: 'Reported.email',
            render: (data) => {
              return (
                <div className="flex items-center gap-2 w-full">
                  <h2>{data.Reporter.email}</h2>
                </div>
              );
            },
          },
          {
            label: 'Report',
            key: 'report',
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
                          <div onClick={() => handleDelete(data.id)}>
                            Delete Report
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

export default ReportsTable;
