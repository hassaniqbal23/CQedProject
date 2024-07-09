'use client';
import DataTable from '@/components/ui/table/table';
import Image from 'next/image';
import React, { useState } from 'react';
import { PreviewAttachmentModal } from '../PreviewAttachmentModal/PreviewAttachmentModal';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { Button } from '@/components/ui';
import { Typography } from '../Typography/Typography';
import Pagination from '@/components/common/pagination/pagination';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getAllSchools } from '@/app/api/admin';

export interface AttachmentTableProps {
  data: any;
  noDataMessage?: string;
  loading?: boolean;
}

function AttachmentTable(props: AttachmentTableProps) {
  const { userInformation } = useGlobalState();
  const [totalCountSchool, setTotalCountSchool] = useState<number>(1);
  const [paginationSchools, setPaginationSchools] = useState<{
    schoolPage: number;
    schoolLimit: number;
  }>({
    schoolPage: 1,
    schoolLimit: 10,
  });

  const { schoolPage, schoolLimit } = paginationSchools;
  const { data, isLoading } = useQuery(
    ['getInvitedSchools', schoolPage, schoolLimit],
    () => getAllSchools(schoolPage, schoolLimit),
    {
      enabled: true,
      onSuccess: (res) => {
        setTotalCountSchool(res?.data?.totalCount);
      },
      onError(err) {
        console.log(err);
      },
    }
  );

  return (
    <div className="w-full">
      <div className="mb-3">
        <Typography variant={'h2'} weight={'bold'}>
          Attachments
        </Typography>
        <Typography variant={'h6'} weight={'regular'}>
          All attachments uploaded by Users
        </Typography>
      </div>
      <DataTable
        data={data?.data?.data || []}
        loading={isLoading}
        columns={[
          {
            label: 'University Name',
            key: 'school',
            render: (data) => {
              return (
                <div className="flex items-center gap-2 w-full">
                  <Image
                    src={
                      data?.profile?.profilePicture ||
                      '/assets/profile/profile.svg'
                    }
                    alt={data?.profile?.full_name || 'user profile'}
                    width={30}
                    height={30}
                    unoptimized={true}
                  />
                  <h2>{data?.name}</h2>
                </div>
              );
            },
          },
          {
            label: 'Actions',
            key: 'preview_attachments',
            render: (data) => {
              return (
                <div className="flex items-center w-full">
                  <PreviewAttachmentModal
                    attachment={data?.attachment}
                    buttonTrigger={
                      <Button variant={'default'} size={'sm'}>
                        Preview
                      </Button>
                    }
                  />
                </div>
              );
            },
          },
        ]}
      />
      <div className={'flex justify-end w-full mt-4'}>
        <Pagination
          currentPage={schoolPage}
          totalPages={Math.ceil(totalCountSchool / schoolLimit)}
          pageSize={schoolLimit}
          totalCount={0}
          onPageChange={(value: number) => {
            setPaginationSchools((prev) => ({
              ...prev,
              schoolPage: value,
            }));
          }}
        />
      </div>
    </div>
  );
}

export default AttachmentTable;
