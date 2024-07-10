'use client';
import React from 'react';
import DataTable from '@/components/ui/table/table';
import { PreviewAttachmentModal } from '../PreviewAttachmentModal/PreviewAttachmentModal';
import { Avatar, AvatarImage, Button } from '@/components/ui';
import { Typography } from '../Typography/Typography';

export interface AttachmentTableProps {
  data: any;
  noDataMessage?: string;
  loading?: boolean;
}

function AttachmentTable(props: AttachmentTableProps) {
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
        data={props?.data || []}
        loading={props?.loading}
        columns={[
          {
            label: 'User Name',
            key: 'userName',
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
    </div>
  );
}

export default AttachmentTable;
