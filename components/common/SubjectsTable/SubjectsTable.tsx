'use client';

import { Dropdown } from '@/components/ui';
import DataTable from '@/components/ui/table/table';
import React from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';

export interface SubjectTableProps {
  data: any;
  noDataMessage?: string;
  loading?: boolean;
  onDeleteSubject?: (id: number) => void;
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
                          <div
                            onClick={() =>
                              props.onDeleteSubject &&
                              props.onDeleteSubject(data.id)
                            }
                          >
                            Delete Subject
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

export default SubjectTable;
