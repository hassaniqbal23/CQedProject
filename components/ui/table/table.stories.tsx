import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from './table';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { IoEllipsisVertical } from 'react-icons/io5';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox/checkbox';
import React from 'react';

interface Schools {
  id: number;
  schoolName: string;
  schoolCountry: string;
  schoolEmail: string;
  numberOfTeachers: number;
  ImagePath: string;
}

interface IProps {
  SchoolsData: Schools[];
}

const data: IProps = {
  SchoolsData: [
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
  ],
};

const meta = {
  title: 'Example/Table',
  component: Table,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => {
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
          <Table className=" w-[1117px] border">
            <TableHeader className="text-center">
              <TableRow className="bg-[#E0E0E0] ">
                <TableHead>
                  <Checkbox id="terms" />
                </TableHead>
                <TableHead className="text-blue-950 text-[13px] font-semibold text-left dark:text-white rounded-t-sm">
                  School Name
                </TableHead>
                <TableHead className="text-blue-950 text-[13px] font-semibold dark:text-white">
                  Country
                </TableHead>
                <TableHead className="text-blue-950 text-[13px] font-semibold dark:text-white">
                  Email Address
                </TableHead>
                <TableHead className="text-blue-950 text-[13px] font-semibold dark:text-white ">
                  No of Teachers
                </TableHead>
                <TableHead className="text-blue-950 text-[13px] font-semibold dark:text-white rounded-t-sm">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.SchoolsData ? (
                data.SchoolsData.map((schools: Schools, index: number) => (
                  <TableRow key={index}>
                    <TableCell className="text-[#282931] text-[13px] font-normal dark:text-white">
                      <Checkbox id="terms" className="bg-[#E0E0E0]" />
                    </TableCell>
                    <TableCell className="text-[#282931]  text-[13px] font-normal dark:text-white">
                      <div className="flex justify-start gap-2 items-center">
                        <Image
                          src={schools.ImagePath}
                          alt={schools.ImagePath}
                          width={30}
                          height={30}
                        />
                        {schools?.schoolName}
                      </div>
                    </TableCell>
                    <TableCell className="text-[#282931] text-[13px] font-normal dark:text-white">
                      {schools?.schoolCountry}
                    </TableCell>
                    <TableCell className="text-[#282931]">
                      {schools.schoolEmail}
                    </TableCell>
                    <TableCell className="text-[#282931] text-center">
                      {schools.numberOfTeachers}
                    </TableCell>
                    <TableCell className="text-[#282931]  dark:text-white">
                      <div className="flex flex-start  rounded-full">
                        <IoEllipsisVertical className="cursor-pointer  " />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Loader2 className="animate-spin w-14 h-14 mx-auto my-24   text-center" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </>
    );
  },
};
