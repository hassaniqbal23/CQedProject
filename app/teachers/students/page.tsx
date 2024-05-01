'use client';
import React, { useEffect, useState } from 'react';
import http from '@/app/utils/http';
import { IoEllipsisVertical } from 'react-icons/io5';
import DataTable from '@/components/ui/table/table';

export default function TeacherStudents() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    // fetch students
    http.get('/students/1/all-students').then((res) => {
      setStudents(res.data.data || []);
    });
  }, []);
  return (
    <>
      <div>
        <h2>Students</h2>

        <br />
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
