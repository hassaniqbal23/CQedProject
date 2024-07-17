'use client';
import React, { useState } from 'react';
import AttachmentTable from '@/components/common/AttachmentsTable';
import { useQuery } from 'react-query';
import { getAttachments } from '@/app/api/admin';
import Pagination from '@/components/common/pagination/pagination';

const AdminAttachments = () => {
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10,
  });

  const { page, limit } = pagination;

  const [totalCount, setTotalCount] = useState<number>(1);

  const { data: attachmentsData, isLoading } = useQuery(
    ['getAttachments', page, limit],
    () => getAttachments(page, limit),
    {
      onSuccess: (res) => {
        setTotalCount(res?.totalCount || 0);
      },
      onError(err) {
        console.log(err);
      },
    }
  );

  return (
    <div className="w-full">
      <AttachmentTable data={attachmentsData?.data} loading={isLoading} />
      <div className={'flex justify-end w-full mt-4'}>
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(totalCount / limit)}
          pageSize={limit}
          totalCount={totalCount}
          onPageChange={(value: number) => {
            setPagination((prev) => ({
              ...prev,
              page: value,
            }));
          }}
        />
      </div>
    </div>
  );
};

export { AdminAttachments };
