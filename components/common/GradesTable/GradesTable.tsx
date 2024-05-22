'use client';

import DataTable from '@/components/ui/table/table';
import React from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';
import { Switch } from '@/components/ui';
import { useMutation, useQueryClient } from 'react-query';
import { activeAndDeactiveGrade } from '@/app/api/schools';

export interface GradesTableProps {
  data: any;
  noDataMessage?: string;
  loading?: boolean;
}

function GradesTable(props: GradesTableProps) {
  const refetch = useQueryClient();

  const { mutate: activeAndDeactiveGrades } = useMutation(
    (data: { gradeId: number; status: number }) =>
      activeAndDeactiveGrade(data.gradeId, data.status),
    {
      onSuccess: (res) => {
        refetch.invalidateQueries('getAllGrades');
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );

  return (
    <div className="w-full">
      <DataTable
        data={props.data?.splice(0, 10)}
        selection={false}
        noDataMessage={props.noDataMessage || 'No Grades'}
        loading={props.loading}
        columns={[
          {
            label: 'Grade',
            key: 'grade',
            className: 'w-20 flex justify-start items-center pl-10',
            render: (data) => (
              <h2 className="flex justify-start pl-6">{data['name']}</h2>
            ),
          },
          {
            label: '',
            key: 'switch',
            className: 'w-20',
            render: (data) => {
              const submit = {
                gradeId: data.id,
                status: data.status === 1 ? 2 : 1,
              };
              return (
                <div>
                  <Switch
                    checked={data.status === 1 ? true : false}
                    onClick={() => activeAndDeactiveGrades(submit)}
                  />
                </div>
              );
            },
          },
          {
            label: 'Action',
            key: 'actions',
            className: ' flex justify-end items-center pr-10',
            render: (data) => {
              return (
                <div
                  className="flex justify-end pr-10"
                  onClick={() => console.log(data)}
                >
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
