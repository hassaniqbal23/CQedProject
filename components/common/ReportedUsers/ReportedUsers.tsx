'use client';
import React, { Suspense, useState } from 'react';
import { useQuery } from 'react-query';
import { getReportedUsers } from '@/app/api/admin';
import { Typography } from '@/components/common/Typography/Typography';
import Pagination from '../pagination/pagination';
import ReportsTable from '../ReportsTable/Index';

const ReportedUsers = () => {
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10,
  });

  const { page, limit } = pagination;

  const [totalCount, setTotalCount] = useState<number>(1);

  const { data: reportData, isLoading } = useQuery(
    ['getReportedUsers', page, limit],
    () => getReportedUsers(page, limit),
    {
      enabled: true,
      onSuccess: (res) => {
        setTotalCount(res?.totalCount || 0);
      },
      onError(err) {
        console.log(err);
      },
    }
  );

  return (
    <Suspense>
      <div className="w-full py-3 mt-7">
        <div className="w-full flex flex-wrap mb-4 items-center">
          <div>
            <Typography variant="h3" weight="semibold">
              Reported Users
            </Typography>
            <Typography variant="p" weight="regular" className="mt-1">
              Reported users are listed below
            </Typography>
          </div>
        </div>
        <div className="mt-10">
          <ReportsTable data={reportData?.data || []} loading={isLoading} />
        </div>
        <div className={'flex justify-end w-full mt-4'}>
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalCount / limit)}
            pageSize={limit}
            onPageChange={(value: number) => {
              setPagination((prev) => ({
                ...prev,
                page: value,
              }));
            }}
            totalCount={totalCount}
            setPageSize={(pageSize) =>
              setPagination((prev) => ({
                ...prev,
                limit: pageSize,
              }))
            }
          />
        </div>
      </div>
    </Suspense>
  );
};

export default ReportedUsers;
