import type { StoryObj } from '@storybook/react';
import DasboardDataTable from './TeacherDashboardDataTable';
import React from 'react';
import Image from 'next/image';
import { Badge } from '../badge/badge';
import { Typography } from '@/components/common/Typography/Typography';

interface classroom {
  id: number;
  ClassName: string;
  Students: string;
  Status: string;
  Badge: React.ReactNode;
}

const teachersDasboarddata: classroom[] = [
  {
    id: 1,
    ClassName: 'Class name-1',
    Students: '15 students',
    Status: 'Active',
    Badge: (
      <>
        <Badge className="bg-[#ECEDF8] text-[#4146B8] p-2">View</Badge>
      </>
    ),
  },
  {
    id: 2,
    ClassName: 'Class name-2',
    Students: '20 students',
    Status: 'Active',
    Badge: (
      <>
        <Badge className="bg-[#ECEDF8] text-[#4146B8] p-2 ">View</Badge>
      </>
    ),
  },
  {
    id: 3,
    ClassName: 'Class name-3',
    Students: '05 students',
    Status: 'Active',
    Badge: (
      <>
        <Badge className="bg-[#ECEDF8] text-[#4146B8] p-2">View</Badge>
      </>
    ),
  },
  {
    id: 4,
    ClassName: 'Class name-4',
    Students: '10 students',
    Status: 'Active',
    Badge: (
      <>
        <Badge className="bg-[#ECEDF8] text-[#4146B8] p-2">View</Badge>
      </>
    ),
  },
];

const meta = {
  title: 'Forms/DasboardDataTable',
  component: DasboardDataTable,

  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ClassroomTable: Story = {
  render: (args) => {
    return (
      <>
        <div className="w-full  mb-6 lg:mb-0 p-3.5 rounded-lg ">
          <DasboardDataTable {...args} />
        </div>
      </>
    );
  },
  args: {
    data: teachersDasboarddata,
    columns: [
      {
        label: 'Class name',
        key: 'ClassName',
        render: (data) => {
          return (
            <div className="flex  items-center gap-2 w-full">
              <Typography variant={'p'} weight={'semibold'}>
                {data['ClassName']}
              </Typography>
            </div>
          );
        },
      },
      {
        label: 'Student',
        key: 'Students',
        render: (data) => {
          return (
            <div className="flex  items-center gap-2 w-full">
              <Typography variant={'p'} weight={'semibold'}>
                {data['Students']}
              </Typography>
            </div>
          );
        },
      },
      {
        label: 'Status',
        key: 'Status',
        render: (data) => {
          return (
            <div className="flex  items-center gap-2 w-full text-[#0288D1] font-semibold">
              {data['Status']}
            </div>
          );
        },
      },
      {
        label: '',
        key: 'Badge',
        render: (data) => {
          return (
            <button className="text-[#676BC6] font-semibold bg-[#ECEDF8] rounded-full px-4 py-2">
              View
            </button>
          );
        },
      },
    ],
  },
};
