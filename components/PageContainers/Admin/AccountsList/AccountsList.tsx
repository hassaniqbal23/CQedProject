'use client';
import React, { useState } from 'react';
import { Typography } from '@/components/common/Typography/Typography';
import Pagination from '@/components/common/pagination/pagination';
import UsersTable from '@/components/common/UsersTable';
import { useQuery } from 'react-query';
import { getAllUsers } from '@/app/api/admin';

const AccountsList = () => {
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10,
  });

  const { page, limit } = pagination;

  const [totalCount, setTotalCount] = useState<number>(1);

  const { data: allUsersData, isLoading } = useQuery(
    ['getAllUsers', page, limit],
    () => getAllUsers(page, limit),
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
    <>
      <div>
        <div className="flex mb-4 items-center">
          <div className="mb-2">
            <Typography variant="h2" weight="semibold">
              Users
            </Typography>
            <Typography variant="p" weight="regular">
              Users are listed below.
            </Typography>
          </div>
        </div>
      </div>
      <div>
        <UsersTable data={allUsersData} loading={isLoading} />
        <div className="flex justify-end w-full mt-4">
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
    </>
  );
};

export default AccountsList;
