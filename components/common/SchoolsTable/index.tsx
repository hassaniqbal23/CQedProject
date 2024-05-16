'use client';

import { Dropdown } from '@/components/ui';
import DataTable from '@/components/ui/table/table';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';

export interface SchoolTableProps {
  data: any;
  noDataMessage?: string;
  loading?: boolean;
}

function SchoolTable(props: SchoolTableProps) {
  return (
    <div className="w-full">
      <DataTable
        data={props.data}
        selection={true}
        noDataMessage={props.noDataMessage || 'No Schools'}
        loading={props.loading}
        columns={[
          {
            label: 'School Name',
            key: 'name',
            render: (data) => {
              return (
                <div className="flex  items-center gap-2 w-full">
                  {/*<Image*/}
                  {/*  src={data.ImagePath}*/}
                  {/*  alt={data.ImagePath}*/}
                  {/*  width={30}*/}
                  {/*  height={30}*/}
                  {/*/>*/}
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
                          <Link href={`/admin/schools/${data.id}`}>
                            View Profile
                          </Link>
                        ),
                      },
                      {
                        content: (
                          <div onClick={() => console.log('ok')}>
                            Deactivate School
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
