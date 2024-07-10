'use client';
import React, { useState } from 'react';

import { useGlobalState } from '@/app/globalContext/globalContext';
import AttachmentTable from '@/components/common/AttachmentsTable';
import { useQuery } from 'react-query';
import { getAttachments } from '@/app/api/admin';
import { LoaderCircle } from 'lucide-react';
import { Typography } from '@/components/common/Typography/Typography';

const AttachmentsPage = () => {
  const { isUserGetInfo } = useGlobalState();
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10,
  });

  const { page, limit } = pagination;

  const [totalCount, setTotalCount] = useState<number>(1);
  const { data: NewData, isLoading } = useQuery(
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
  if (isUserGetInfo)
    return (
      <div className="flex  items-center">
        <Typography variant={'h3'} weight={'semibold'} className="mr-2">
          Loading
        </Typography>
        <LoaderCircle className="animate-spin spin-in-1 shadow-yellow-50" />
      </div>
    );
  return (
    <div className="w-full">
      <AttachmentTable data={NewData} />
    </div>
  );
};

export default AttachmentsPage;
