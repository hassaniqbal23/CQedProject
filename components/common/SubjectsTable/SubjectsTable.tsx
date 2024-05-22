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
  onEditSubjectName?: (id: number, name: string) => void;
}

function SubjectTable(props: SubjectTableProps) {
  return (
    <div className="w-full">
      <DataTable
        data={props.data}
        selection={false}
        noDataMessage={props.noDataMessage || 'No Subjects'}
        loading={props.loading}
        columns={[
          {
            label: 'Subject Name',
            key: 'name',
            className: 'pl-10',
            render: (data) => {
              return (
                <div className="pl-7">
                  <h2>{data['name']}</h2>
                </div>
              );
            },
          },
          {
            label: 'Actions',
            key: 'actions',
            className: 'flex justify-end items-center pr-10',
            render: (data) => {
              return (
                <div className="flex justify-end pr-10">
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
                            Remove Subject
                          </div>
                        ),
                      },
                      {
                        content: (
                          <div
                            onClick={() =>
                              props.onEditSubjectName &&
                              props.onEditSubjectName(data.id, data.name)
                            }
                          >
                            Edit Subject
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
