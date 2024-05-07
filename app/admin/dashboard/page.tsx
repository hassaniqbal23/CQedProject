'use client';
import React, { useEffect, useState } from 'react';
import DashboardStaticCards from '@/components/common/DashboardStaticCards';
import SchoolTable from '@/components/common/SchoolsTable';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';
import Link from 'next/link';
import { AdminWelCome } from './(components)/admin';
import http from '@/app/utils/http';
import { useQuery } from 'react-query';
import { getInvitedSchools } from '@/app/api/admin';
import Loading from '@/components/ui/button/loading';
import { format } from 'date-fns';
import AdminCharts from '@/components/common/AdminCharts';
import { getBarOptions } from '@/lib/utils';
import * as echarts from 'echarts';

const initialBar = {
  data: [],
  error: undefined,
  loading: true,
  vertical: false,
};

const Dashboard = () => {
  const [lineData, setLineData] = useState<any>(initialBar);
  const [barData, setbarData] = useState<any>(initialBar);
  const { data, isLoading } = useQuery(['getInvitedSchools'], () =>
    getInvitedSchools()
  );
  const currentDate = format(new Date(), 'EEEE, MMMM do');

  const cardData = [
    {
      title: 'Total Schools',
      link: '/',
      number: data?.data?.totalCount,
      percentage: 2.5,
    },
    { title: 'Total Teachers', link: '/', number: '1,400', percentage: 2.5 },
    { title: 'Total Students', link: '/', number: '15,000', percentage: 2.5 },
    { title: 'Total Sales', link: '/', number: '$10,000', percentage: 2.5 },
  ];

  function getBarChart() {
    setLineData((prev: any) => ({ ...prev, loading: true }));
    setbarData((prev: any) => ({ ...prev, loading: true }));
    setTimeout(() => {
      const lineLabels = {
        xAxis: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        yAxis: ['$0', '$20k', '$40k', '$60k', '$80k', '$100k'],
      };

      const labels = {
        xAxis: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        yAxis: ['$0', '$20k', '$40k', '$60k', '$80k', '$100k'],
      };

      const datasets = [
        {
          data: [
            50000, 35000, 45000, 52000, 60000, 55000, 48000, 50000, 58000,
            62000, 58000, 65000, 20000, 35000, 45000, 52000, 60000, 55000,
            48000, 50000, 58000, 62000, 58000, 65000, 20000, 35000, 45000,
            52000, 60000, 55000, 48000, 50000, 58000, 62000, 58000, 65000,
            20000, 35000, 45000, 52000, 60000, 55000, 48000, 50000, 58000,
            62000, 58000, 65000, 20000, 35000, 45000, 52000, 60000, 55000,
            48000, 50000, 58000, 62000, 58000, 65000, 20000, 35000, 45000,
            52000, 60000, 55000, 48000, 50000, 58000, 62000, 58000, 65000,
          ],
          name: 'This Year',
          smooth: false,
          type: 'line',
        },
      ];

      const datasetsBar = [
        {
          data: [
            50000, 35000, 45000, 52000, 60000, 55000, 48000, 50000, 58000,
            62000, 58000, 65000, 20000, 35000, 45000, 52000, 60000, 55000,
            48000, 50000, 58000, 62000, 58000, 65000, 20000, 35000, 45000,
            52000, 60000, 55000, 48000, 50000, 58000, 62000, 58000, 65000,
            20000, 35000, 45000, 52000, 60000, 55000, 48000, 50000, 58000,
            62000, 58000, 65000, 20000, 35000, 45000, 52000, 60000, 55000,
            48000, 50000, 58000, 62000, 58000, 65000, 20000, 35000, 45000,
            52000, 60000, 55000, 48000, 50000, 58000, 62000, 58000, 65000,
          ],
          name: 'This Year',
          smooth: false,
          type: 'bar',
        },
      ];

      const gradient = new echarts.graphic.LinearGradient(0, 1, 0, 0, [
        { offset: 0, color: '#ffffff' },
        { offset: 0.2, color: '#ffffff' },
        { offset: 0.3, color: '#ffffff' },
        { offset: 0.8, color: '#e9fbed' },
        { offset: 1, color: '#d0e1d4' },
      ]);

      const lineOptions = getBarOptions(datasets, lineLabels, gradient);
      const barOptions = getBarOptions(datasetsBar, labels);
      setLineData({
        data: lineOptions,
        error: false,
        loading: false,
        vertical: false,
      });

      setbarData({
        data: barOptions,
        error: false,
        loading: false,
        vertical: false,
      });
    }, 2000);
  }

  return (
    <div>
      <>
        {!isLoading ? (
          <>
            {!data && data.data?.length === 0 ? (
              <>
                <AdminWelCome />
              </>
            ) : (
              <>
                <p>{currentDate}</p>
                <h1 className="text-2xl font-bold">
                  Welcome to your Dashboard
                </h1>
                <DashboardStaticCards data={cardData} />
                <div className="xl:flex  xl:flex-row justify-between gap-4 mt-9 sm:flex-col ">
                  <div className=" xl:w-2/3 h-[350px] p-3 border rounded  sm:w-full">
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
                    <AdminCharts
                      xLabel={lineData.labels}
                      loading={lineData.loading}
                      options={lineData.data}
                    />
                  </div>
                  <div className="p-6 border h-[350px] xl:w-1/3 rounded sm:w-full ">
                    <h2 className="text-2xl font-bold">$9,650</h2>
                    <p>Income of March 2024</p>

                    <AdminCharts
                      xLabel={barData.labels}
                      loading={barData.loading}
                      options={barData.data}
                    />
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
            )}
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-screen">
            <Loading />
          </div>
        )}
      </>
    </div>
  );
};

export default Dashboard;
