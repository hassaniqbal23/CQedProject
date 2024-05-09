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
                  <h2>{data['fullname']}</h2>
                </div>
              );
            },
          },
          { label: 'Country', key: 'country' },
          { label: 'Nickname', key: 'nick_name' },
          {
            label: 'Actions',
            key: 'actions',
            render: (data) => {
              return (
                <>
                  <div onClick={() => console.log(data)}>
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
