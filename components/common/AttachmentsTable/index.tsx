'use client';
import DataTable from '@/components/ui/table/table';
import React, { useState } from 'react';
import { PreviewAttachmentModal } from '../PreviewAttachmentModal/PreviewAttachmentModal';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { Avatar, AvatarImage, Button } from '@/components/ui';
import { Typography } from '../Typography/Typography';
import Pagination from '@/components/common/pagination/pagination';
import { useQuery } from 'react-query';
import { getAttachments } from '@/app/api/admin';

export interface AttachmentTableProps {
  data: any;
  noDataMessage?: string;
  loading?: boolean;
}

function AttachmentTable(props: AttachmentTableProps) {
  const [totalAttachment, setTotalAttachment] = useState<number>(1);
  const [paginationSchools, setPaginationSchools] = useState<{
    attachmentPage: number;
    attachmentLimit: number;
  }>({
    attachmentPage: 1,
    attachmentLimit: 10,
  });
  const { attachmentPage, attachmentLimit } = paginationSchools;
  const { data: attachmentsData, isLoading } = useQuery(
    ['getAttachments', attachmentPage, attachmentLimit],
    () => getAttachments(attachmentPage, attachmentLimit),
    {
      enabled: true,
      onSuccess: (res) => {
        setTotalAttachment(res?.data?.totalCount);
      },
      onError(err) {
        console.log(err);
      },
    }
  );

  return (
    <div className="w-full">
      <div className="mb-3">
        <Typography variant={'h2'} weight={'semibold'}>
          Attachments
        </Typography>
        <Typography variant={'h6'} weight={'regular'}>
          All attachments uploaded by Users
        </Typography>
      </div>
      <DataTable
        data={attachmentsData?.data || []}
        loading={isLoading}
        columns={[
          {
            label: 'University Name',
            key: 'school',
            render: (data) => {
              return (
                <div className="flex items-center gap-2 w-full">
                  <Avatar className="w-9 h-9 ">
                    <AvatarImage
                      src={
                        data?.User?.attachment?.file_path ||
                        '/assets/profile/profile.svg'
                      }
                      alt={data?.profile?.full_name || 'user profile'}
                    />
                  </Avatar>
                  <Typography variant={'body'} weight={'regular'}>
                    {data?.User?.name}
                  </Typography>
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
                    attachment={data.file_path}
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
          currentPage={attachmentPage}
          totalPages={Math.ceil(totalAttachment / attachmentLimit)}
          pageSize={attachmentLimit}
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
