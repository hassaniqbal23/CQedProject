'use client';
import React, { useEffect, useState } from 'react';
// import http from '@/app/utils/http';
import { IoEllipsisVertical } from 'react-icons/io5';
import { PlusIcon } from 'lucide-react';
import DataTable from '@/components/ui/table/table';
import { Button } from '@/components/ui';
import MultipleSelector from '@/components/common/From/MultiSelect';
import { Input } from '@/components/ui';
interface Student {
  fullname: string;
  nick_name?: string;
  gender: string;
  status: boolean;
}

export default function TeacherStudents() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    setStudents([
      {
        fullname: 'John Doe',
        nick_name: 'Jhonny',
        gender: 'Male',
        status: true,
      },
      {
        fullname: 'Jane Doe',
        nick_name: 'Janie',
        gender: 'Female',
        status: false,
      },
      {
        fullname: 'Jack Doe',
        nick_name: 'Jackie',
        gender: 'Male',
        status: true,
      },
    ]);
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-[#0A0A0A]">Students</h2>
            <Button className="px-10 py-[14px] text-base font-semibold flex gap-2 items-center">
              <span>
                <PlusIcon />
              </span>{' '}
              Add Student
            </Button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <Input
                placeholder="Search student here..."
                type="search"
                className=" max-w-sm text-black rounded-full text"
              />
            </div>
            <div>
              <MultipleSelector
                className="max-w-36 text-sm font-medium text-[#464343] rounded-full"
                placeholder="Sort by"
              />
            </div>
          </div>
        </div>

        <DataTable
          data={students}
          selection={true}
          noDataMessage={'No Students'}
          columns={[
            { label: 'Full Name', key: 'fullname' },
            {
              label: 'Nick Name',
              key: 'nick_name',
              render: (row) => <span>{row.nick_name || 'N/A'}</span>,
            },
            { label: 'Gender', key: 'gender' },
            {
              label: 'Last Login',
              key: '',
              render: (row) => {
                return <span> N/A </span>;
              },
            },
            {
              label: 'Time Spent',
              key: '',
              render: (row) => {
                return <span> N/A </span>;
              },
            },
            {
              label: 'Status',
              key: 'status',
              render: (row) => {
                return (
                  <span
                    className={`${
                      row.status ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {row.status ? 'Active' : 'Inactive'}
                  </span>
                );
              },
            },
          ]}
        />
      </div>
    </>
  );
}
