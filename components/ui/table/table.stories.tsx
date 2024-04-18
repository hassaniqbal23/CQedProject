import type { Meta, StoryObj } from '@storybook/react';
import DataTable from './table';
import Link from 'next/link';
import { IoEllipsisVertical } from 'react-icons/io5';
import React from 'react';
import Image from 'next/image';

interface Schools {
  id: number;
  SchoolName: string;
  Country: string;
  EmailAddress: string;
  NumberOfTeachers: number;
  ImagePath: string;
}

const data: Schools[] = [
  {
    id: 1,
    SchoolName: 'St. Marys High School',
    Country: 'United States',
    EmailAddress: 'example@gmail.com',
    NumberOfTeachers: 20,
    ImagePath: '/assets/images/school1.svg',
  },
  {
    id: 1,
    SchoolName: 'Tokyo International School',
    Country: 'Japan',
    EmailAddress: 'example@gmail.com',
    NumberOfTeachers: 20,
    ImagePath: '/assets/images/school2.svg',
  },
  {
    id: 1,
    SchoolName: 'Westminster Academy',
    Country: 'United Kingdom',
    EmailAddress: 'example@gmail.com',
    NumberOfTeachers: 20,
    ImagePath: '/assets/images/school3.svg',
  },
  {
    id: 1,
    SchoolName: 'Sydney Grammar School',
    Country: 'Australia',
    EmailAddress: 'example@gmail.com',
    NumberOfTeachers: 20,
    ImagePath: '/assets/images/school4.svg',
  },
];

const meta = {
  title: 'Forms/Table',
  component: DataTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return (
      <>
        <div className="w-full  mb-6 lg:mb-0 p-3.5 rounded-lg border dark:border-none dark:bg-slate-900 dark:shadow-slate-800 dark:shadow-lg ">
          <div className="flex justify-between mb-4">
            <h1 className="text-blue-950 text-lg font-semibold dark:text-white">
              Schools{' '}
            </h1>
            <Link href={'/Table'} className="text-[#4146B8] font-medium">
              View All
            </Link>
          </div>

          <DataTable
            {...args}
          />
        </div>
      </>
    );
  },
  args: {
    selection: true,
    data: data,
    columns: [
          { label: 'School Name',
            key: 'SchoolName',
            render: (data) => {
              return (
                  <>
                    <Image
                        src={data.ImagePath}
                        alt={data.ImagePath}
                        width={30}
                        height={30}
                    />
                    <h2>{data['SchoolName']}</h2>
                  </>
              );
            }
          },
{ label: 'Country', key: 'Country' },
{ label: 'Email Address', key: 'EmailAddress' },
{ label: 'Number Of Teachers', key: 'NumberOfTeachers' },
{ label: 'Actions', key: 'actions',  render: (data) => {
  return (
      <>
        <div onClick={() => console .log(data)}>
          <IoEllipsisVertical />
        </div>
      </>
  )}
},
]}
};
