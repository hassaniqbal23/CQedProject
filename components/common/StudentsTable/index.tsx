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

export interface StudentsTableProps {
  data: any;
  noDataMessage?: string;
  loading?: boolean;
}

function StudentsTable(props: StudentsTableProps) {
  const queryClient = useQueryClient();
  const { data, noDataMessage, loading } = props;
  console.log(data);
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
        noDataMessage={noDataMessage || 'No Schools'}
        loading={loading}
        columns={[
          {
            label: 'School Name',
            key: 'name',
            className: 'w-2/6',
            render: (data) => {
              return (
                <div className="flex items-center gap-2 w-full">
                  <Link
                    className="hover:text-primary-500"
                    href={`/schools/students/${data['id']}`}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <Image
                        src={
                          data.user.attachment.file_path ||
                          '/assets/profile/profile.svg'
                        }
                        alt={data.user.attachment.file_path}
                        width={30}
                        height={30}
                      />
                      <h2>{data['fullname']}</h2>
                    </div>
                  </Link>
                </div>
              );
            },
          },
          { label: 'Country', key: 'country', className: 'w-2/6' },
          { label: 'Nickname', key: 'nick_name', className: 'w-2/6' },
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
                          <Link
                            className="hover:text-primary-500"
                            href={`/schools/students/${data['id']}`}
                          >
                            View Profile
                          </Link>
                        ),
                      },
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
