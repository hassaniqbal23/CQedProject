'use client';

import { Dropdown } from '@/components/ui';
import DataTable from '@/components/ui/table/table';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';

export interface TeachersTableProps {
  data: any;
  noDataMessage?: string;
  loading?: boolean;
}

function TeachersTable(props: TeachersTableProps) {
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
              return (
                <Link
                  className="hover:text-primary-500"
                  href={`/schools/teachers/${data['id']}`}
                >
                  <div className="flex items-center gap-2 w-full">
                    <Image
                      src={data.ImagePath || '/assets/profile/profile.svg'}
                      alt={data.ImagePath}
                      width={30}
                      height={30}
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
                          <div onClick={() => console.log('akmsdkasd')}>
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
    </div>
  );
}

export default TeachersTable;
