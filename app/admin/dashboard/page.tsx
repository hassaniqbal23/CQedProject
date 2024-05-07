'use client';
import React from 'react';
import DashboardStaticCards from '@/components/common/DashboardStaticCards';
import SchoolTable from '@/components/common/SchoolsTable';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import Link from 'next/link';
import { AdminWelCome } from './(components)/admin';
import http from '@/app/utils/http';
import { useQuery } from 'react-query';
import { getInvitedSchools } from '@/app/api/admin';
import Loading from '@/components/ui/button/loading';

const data1 = [
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

const cardData = [
  { title: 'Total Schools', link: '/', number: 300, percentage: 2.5 },
  { title: 'Total Teachers', link: '/', number: '1,400', percentage: 2.5 },
  { title: 'Total Students', link: '/', number: '15,000', percentage: 2.5 },
  { title: 'Total Sales', link: '/', number: '$10,000', percentage: 2.5 },
];

const Dashboard = () => {
  const { data, isLoading } = useQuery(['getInvitedSchools'], () => getInvitedSchools())
  return (
    <div>
      <>{!isLoading ? <>{!data && data.data?.length === 0 ? (
        <>
          <AdminWelCome />
        </>
      ) : (
        <>
          <p>Thursday, January 18</p>
          <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
          <DashboardStaticCards data={cardData} />
          <div className="xl:flex  xl:flex-row justify-between gap-4 mt-9 sm:flex-col ">
            <div className=" xl:w-2/3 h-[300px] p-3 border rounded  sm:w-full">
              <div className="flex justify-between w-full">
                <h2 className="font-bold text-lg">Overview</h2>
                <ChipSelector
                  variant="link"
                  defaultValue={['days']}
                  rounded={true}
                  options={[
                    {
                      label: 'This year',
                      value: 'thisYear',
                    },
                    {
                      label: '6 months',
                      value: 'sixMonths',
                    },
                    {
                      label: 'This Month',
                      value: 'thisMonth',
                    },
                    {
                      label: '7 Days',
                      value: 'days',
                    },
                  ]}
                />
              </div>
              <div>Chart</div>
            </div>
            <div className="p-6 border h-[300px] xl:w-1/3 rounded sm:w-full ">
              <h2 className="text-2xl font-bold">$9,650</h2>
              <p>Income of March 2024</p>

              <div>Bar chart</div>
            </div>
          </div>
          <div className="w-full py-3 mt-7">
            <div className="w-full flex justify-between mb-4">
              <h2 className="font-semibold">Schools</h2>
              <Link
                href={'/admin/schools'}
                className="text-primary font-semibold"
              >
                View All
              </Link>
            </div>
            <SchoolTable data={data.data.data} />
          </div>
        </>
      )}</> : <div className='flex items-center justify-center w-full h-screen' ><Loading /></div>}</>
    </div>
  );
};

export default Dashboard;
