'use client';

import DataTable from '@/components/ui/table/table';
import React from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';

export interface SubjectTableProps {
  data: any;
  noDataMessage?: string;
  loading?: boolean;
}

function SubjectTable(props: SubjectTableProps) {
  return (
    <div className="w-full">
      <DataTable
        data={props.data}
        selection={true}
        noDataMessage={props.noDataMessage || 'No Subjects'}
        loading={props.loading}
        columns={[
          {
            label: 'Subject Name',
            key: 'name',
            render: (data) => {
              return (
                <div className="flex items-center gap-2 w-full">
                  <h2>{data['name']}</h2>
                </div>
              );
            },
          },
          {
            label: 'Actions',
            key: 'actions',
            render: (data) => {
              return (
                <div onClick={() => console.log(data)}>
                  <IoEllipsisVertical className="cursor-pointer" />
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
}

export default SubjectTable;
