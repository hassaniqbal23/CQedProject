import type { Meta, StoryObj } from '@storybook/react';
import { DataTable as NewTable} from './table';
import Link from 'next/link';

import React from 'react';

interface Schools {
  id: number;
  schoolName: string;
  schoolCountry: string;
  schoolEmail: string;
  numberOfTeachers: number;
  ImagePath: string;
}

const data: Schools[] = [
  {
    id: 1,
    schoolName: 'St. Marys High School',
    schoolCountry: 'United States',
    schoolEmail: 'example@gmail.com',
    numberOfTeachers: 20,
    ImagePath: '/assets/images/school1.svg',
  },
  {
    id: 1,
    schoolName: 'Tokyo International School',
    schoolCountry: 'Japan',
    schoolEmail: 'example@gmail.com',
    numberOfTeachers: 20,
    ImagePath: '/assets/images/school2.svg',
  },
  {
    id: 1,
    schoolName: 'Westminster Academy',
    schoolCountry: 'United Kingdom',
    schoolEmail: 'example@gmail.com',
    numberOfTeachers: 20,
    ImagePath: '/assets/images/school3.svg',
  },
  {
    id: 1,
    schoolName: 'Sydney Grammar School',
    schoolCountry: 'Australia',
    schoolEmail: 'example@gmail.com',
    numberOfTeachers: 20,
    ImagePath: '/assets/images/school4.svg',
  },
]

const meta = {
  title: 'Example/Table',
  component: NewTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { },
} satisfies Meta<typeof NewTable>;

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
            <NewTable data={data} columns={["schoolName","schoolCountry", "schoolEmail","numberOfTeachers"]} ></NewTable>
          </div>
      </>
    );
  },
  args: {
    columns: [],
    data: [],
  }
};
