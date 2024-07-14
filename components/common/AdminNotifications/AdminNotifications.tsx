'use client';
import { getNotifications } from '@/app/api/admin';
import { Suspense, useState } from 'react';
import { useQuery } from 'react-query';
import Pagination from '../pagination/pagination';
// import ReportsTable from '../ReportsTable/Index';
import NotificationsTable from '../NotificationsTable';
import { Typography } from '../Typography/Typography';

const AdminNotifications = () => {
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10,
  });

  const { page, limit } = pagination;

  const [totalCount, setTotalCount] = useState<number>(1);

  const { data: notificationsData, isLoading } = useQuery(
    ['getNotifications', page, limit],
    () => getNotifications(page, limit),
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
      <div>
        <div className="w-full flex flex-wrap mb-4 items-center">
          <div>
            <Typography variant="h3" weight="semibold">
              Notifications
            </Typography>
            <Typography variant="p" weight="regular" className="mt-1">
              Notifications are listed below
            </Typography>
          </div>
        </div>
        <div className="mt-10">
          {' '}
          <NotificationsTable data={notificationsData} loading={isLoading} />
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
      </div>
    </Suspense>
  );
};

export default AdminNotifications;
