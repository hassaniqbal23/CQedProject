'use client';

import DataTable from '@/components/ui/table/table';
import Image from 'next/image';
import React from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';

export interface StudentsTableProps {
  data: any;
  noDataMessage?: string;
  loading?: boolean;
}

function StudentsTable(props: StudentsTableProps) {
  const { data, noDataMessage, loading } = props;
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
                <div className="flex  items-center gap-2 w-full">
                  <Image
                    src={data.ImagePath || '/assets/profile/profile.svg'}
                    alt={data.ImagePath}
                    width={30}
                    height={30}
                  />
                  <h2>{data['fullname']}</h2>
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
                <>
                  <div
                    className="w-10 flex items-center justify-center"
                    onClick={() => console.log(data)}
                  >
                    <IoEllipsisVertical className="cursor-pointer" />
                  </div>
                </>
              );
            },
          },
        ]}
      />
    </div>
  );
}

export default StudentsTable;
