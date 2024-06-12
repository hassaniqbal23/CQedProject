'use client';

import { Dropdown } from '@/components/ui';
import DataTable from '@/components/ui/table/table';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';
import { DeleteClassDialog } from '../DeleteClassModal/DeleteClassModal';
import { useMutation, useQueryClient } from 'react-query';
import { deleteStudent } from '@/app/api/schools';
import { IStudents } from '@/types/students';

export interface StudentsTableProps {
  data: IStudents[];
  noDataMessage?: string;
  loading?: boolean;
}

function StudentsTable(props: StudentsTableProps) {
  const queryClient = useQueryClient();
  const { data, noDataMessage, loading } = props;
  const [isSelectStudent, setIsSelectStudent] = useState<{
    id: number | null;
    isOpenModal: boolean;
  }>({
    id: null,
    isOpenModal: false,
  });
  const { id, isOpenModal } = isSelectStudent;

  const { mutate: deleteStudentApi, isLoading } = useMutation(
    (id: number) => deleteStudent(id),
    {
      onSuccess: (res) => {
        queryClient.invalidateQueries('getInvitedStudents');
        setIsSelectStudent({
          id: null,
          isOpenModal: false,
        });
      },
      onError(error, variables, context) {
        console.log(error);
      },
    }
  );

  return (
    <div className="w-full">
      <DataTable
        data={data}
        selection={true}
        noDataMessage={noDataMessage || 'No Students'}
        loading={loading}
        columns={[
          {
            label: 'Name',
            key: 'name',
            className: 'w-2/6',
            render: (data: IStudents) => {
              return (
                <div className="flex items-center gap-2 w-full">
                  {/* <Link
                    className="hover:text-primary-500"
                    href={`/universities/students/${data.userId}`}
                  > */}
                  <div className="flex items-center gap-2 w-full">
                    <Image
                      src={
                        data.user.attachment?.file_path ||
                        '/assets/profile/profile.svg'
                      }
                      alt={data?.user.attachment?.file_name || ''}
                      width={30}
                      height={30}
                      className="rounded-full w-[30px] h-[30px] object-cover"
                    />
                    <h2>{data.user['name']}</h2>
                  </div>
                  {/* </Link> */}
                </div>
              );
            },
          },
          {
            label: 'Email Address',
            key: 'email',
            className: 'w-2/6',
            render(data: IStudents) {
              return <div>{data?.user?.email}</div>;
            },
          },
          {
            label: 'Country',
            key: 'country',
            className: 'w-2/6',
            render(data: IStudents) {
              return <div>{data?.user?.profile?.country}</div>;
            },
          },
          {
            label: 'City',
            key: 'city',
            className: 'w-2/6',
            render(data: IStudents) {
              return <div>{data?.user?.profile?.state}</div>;
            },
          },
          {
            label: 'Actions',
            key: 'actions',
            className: 'w-2/6',
            render: (data) => {
              return (
                <div className="w-10 justify-center flex">
                  <Dropdown
                    trigger={
                      <div>
                        <IoEllipsisVertical className="cursor-pointer" />
                      </div>
                    }
                    options={[
                      {
                        content: (
                          <div
                            onClick={() =>
                              setIsSelectStudent({
                                id: data.id,
                                isOpenModal: true,
                              })
                            }
                          >
                            Remove Students
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
      <DeleteClassDialog
        title="Remove student?"
        description="Are you sure you want to remove this student?"
        ButtonAction="Delete this student"
        ButtonCancel="Cancel"
        open={isOpenModal}
        onClose={() => setIsSelectStudent({ id: null, isOpenModal: false })}
        onClickOk={() => {
          if (id) {
            deleteStudentApi(id);
          }
        }}
        okLoading={isLoading}
      />
    </div>
  );
}

export default StudentsTable;
