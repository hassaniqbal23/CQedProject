'use client';

import { Dropdown } from '@/components/ui';
import DataTable from '@/components/ui/table/table';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';
import { DeleteClassDialog } from '../DeleteClassModal/DeleteClassModal';
import { deleteTeacher } from '@/app/api/teachers';
import { useMutation, useQueryClient } from 'react-query';

export interface TeachersTableProps {
  data: any;
  noDataMessage?: string;
  loading?: boolean;
}

function TeachersTable(props: TeachersTableProps) {
  const useClient = useQueryClient();
  const [isSelectTeacher, setIsSelectTeacher] = useState<{
    id: number | null;
    isOpenModal: boolean;
  }>({
    id: null,
    isOpenModal: false,
  });
  const { id, isOpenModal } = isSelectTeacher;

  const { mutate: deleteTeacherAPi, isLoading } = useMutation(
    (id: number) => deleteTeacher(id),
    {
      onSuccess: (res) => {
        useClient.invalidateQueries('getInvitedTeachers');
        setIsSelectTeacher({
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
        data={props.data}
        selection={true}
        noDataMessage={props.noDataMessage || 'No Teachers'}
        loading={props.loading}
        columns={[
          {
            label: 'Teacher Name',
            key: 'fullname',
            render: (data) => {
              console.log(data, 'datadatadata ');
              return (
                <Link
                  className="hover:text-primary-500"
                  href={`/schools/teachers/${data['id']}`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <img
                      src={
                        data.user.attachment.file_path ||
                        '/assets/profile/profile.svg'
                      }
                      alt={data.user.attachment.file_path}
                      className="rounded-full w-[30px] h-[30px] object-cover"
                    />
                    <h2>{data['fullname']}</h2>
                  </div>
                </Link>
              );
            },
          },
          {
            label: 'Subject',
            key: 'subject',
            render: (data) => {
              return data['subject'] || 'N/A';
            },
          },
          {
            label: 'Class',
            key: 'class',
            render: (data) => {
              return data['class'] || 'N/A';
            },
          },
          {
            label: 'Email Address',
            key: 'email',
            render: (data) => {
              return data['email'] || 'N/A';
            },
          },
          {
            label: 'Years of Experience',
            key: 'yearsOfExperience',
            render: (data) => {
              return data['yearsOfExperience'] || 'N/A';
            },
          },
          {
            label: 'Actions',
            key: 'actions',
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
                            href={`/schools/teachers/${data['id']}`}
                          >
                            View Profile
                          </Link>
                        ),
                      },
                      {
                        content: (
                          <div
                            onClick={() =>
                              setIsSelectTeacher({
                                id: data.id,
                                isOpenModal: true,
                              })
                            }
                          >
                            Remove Teacher
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
        title="Remove teacher?  "
        description="Are you sure want to remove  teacher"
        ButtonAction="Delete this teacher"
        ButtonCancel="Cancel"
        open={isOpenModal}
        onClose={() => setIsSelectTeacher({ id: null, isOpenModal: false })}
        onClickOk={() => {
          if (id) {
            deleteTeacherAPi(id);
          }
        }}
        okLoading={isLoading}
      />
    </div>
  );
}

export default TeachersTable;
