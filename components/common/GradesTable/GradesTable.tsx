'use client';

import DataTable from '@/components/ui/table/table';
import React from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';
import { Switch } from '@/components/ui';

export interface GradesTableProps {
  data: any;
  noDataMessage?: string;
  loading?: boolean;
}

function GradesTable(props: GradesTableProps) {
  return (
    <div className="w-full">
      <DataTable
        data={props.data}
        selection={false}
        noDataMessage={props.noDataMessage || 'No Grades'}
        loading={props.loading}
        columns={[
          {
            label: 'Grade',
            key: 'grade',
            render: (data) => <h2>{data['name']}</h2>,
          },
          {
            label: '',
            key: 'switch',
            render: () => (
              <div>
                <Switch />
              </div>
            ),
          },
          {
            label: 'Action',
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

export default GradesTable;
