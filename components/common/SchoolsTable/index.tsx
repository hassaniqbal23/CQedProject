'use client';

import DataTable from '@/components/ui/table/table';
import Image from 'next/image';
import React from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';

export interface SchoolTableProps {
  data: any;
  noDataMessage?: string;
}

function SchoolTable(props: SchoolTableProps) {
  return (
    <div>
      <DataTable
        data={props.data}
        selection={true}
        noDataMessage={props.noDataMessage || 'No Schools'}
        columns={[
          {
            label: 'School Name',
            key: 'SchoolName',
            render: (data) => {
              return (
                <div className="flex  items-center gap-2 w-full">
                  <Image
                    src={data.ImagePath}
                    alt={data.ImagePath}
                    width={30}
                    height={30}
                  />
                  <h2>{data['SchoolName']}</h2>
                </div>
              );
            },
          },
          { label: 'Country', key: 'Country' },
          { label: 'Email Address', key: 'EmailAddress' },
          { label: 'Number Of Teachers', key: 'NumberOfTeachers' },
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

export default SchoolTable;
