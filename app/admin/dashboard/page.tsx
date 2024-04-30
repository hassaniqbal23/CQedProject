'use client';
import React from 'react';
import DashboardStaticCards from '@/components/common/DashboardStaticCards';
import SchoolTable from '@/components/common/SchoolsTable';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import Link from 'next/link';
import { AdminWelCome } from './(components)/admin';
import http from '@/app/utils/http';

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
  const [data, setData] = React.useState([]);
  const [invitedSchools, setInvitedSchools] = React.useState([]);

  // fetch data
  React.useEffect(() => {
    http.get('/schools/all-schools').then((res) => {
      setData(res.data.data || []);
    });
    http.get('/invitation/all-invites').then((res) => {
      setInvitedSchools(res.data.data || []);
    });
  }, []);

  return (
    <div>
      {true ? (
        <>
          <AdminWelCome />
        </>
      ) : (
        <>
          <p>Thursday, January 18</p>
          <h1 className="text-2xl font-bold">Welcome to your Dashboard</h1>
          <DashboardStaticCards data={cardData} />
          <div className="flex justify-between gap-4 mt-9">
            <div className="w-2/3 h-[300px] p-3 border rounded">
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
            <div className="p-6 border h-[300px] w-1/3 rounded">
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
            <SchoolTable data={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
