'use client';
import React, { useEffect, useState } from 'react';
import { PlusIcon } from 'lucide-react';
import DataTable from '@/components/ui/table/table';
import { Avatar, AvatarImage, Button } from '@/components/ui';
import MultipleSelector from '@/components/common/From/MultiSelect';
import { Input } from '@/components/ui';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { getAllStudents } from '@/app/api/students';
interface Student {
  fullname: string;
  nick_name?: string;
  gender: string;
  status: boolean;
  id: number;
}

export default function TeacherStudents() {
  const { data, isLoading } = useQuery('students', () => getAllStudents());

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
              {/* <MultipleSelector
                className="max-w-36 text-sm font-medium text-[#464343] rounded-full"
                placeholder="Sort by"
              /> */}
            </div>
          </div>
        </div>

        <DataTable
          data={data?.data.data || []}
          loading={isLoading}
          noDataMessage={'No Students'}
          columns={[
            {
              label: 'Full Name',
              key: 'fullname',
              render: (row) => {
                console.log(row);
                return (
                  <Link
                    className="text-primary-500 flex gap-2 items-center"
                    href={`/teachers/students/${row.userId}`}
                  >
                    <Avatar>
                      <AvatarImage
                        src={row.user?.attachment?.file_path}
                        alt="profile_image"
                      />
                    </Avatar>
                    {row.fullname || 'N/A'}
                  </Link>
                );
              },
            },
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
