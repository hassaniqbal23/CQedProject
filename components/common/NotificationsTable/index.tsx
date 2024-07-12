'use client';
import { deleteNotifications, deleteReports } from '@/app/api/admin';
import { Dropdown } from '@/components/ui';
import DataTable from '@/components/ui/table/table';
import React from 'react';
import { IoEllipsisVertical } from 'react-icons/io5';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from 'react-query';
import Image from 'next/image';

export interface NotificationsTableProps {
  data: any;
  noDataMessage?: string;
  loading?: boolean;
}

function NotificationsTable(props: NotificationsTableProps) {
  const { data, noDataMessage, loading } = props;
  const queryClient = useQueryClient();

  const { mutate: deleteNotificationMutation } = useMutation(
    (ids: number[]) => deleteNotifications(ids),
    {
      onSuccess: (res) => {
        toast.success(`${res.data.message}`, {
          position: 'bottom-center',
        });
        queryClient.refetchQueries('getNotifications');
      },
      onError: (error) => {
        console.log('Error deleting notifications', error);
      },
    }
  );

  const handleDelete = (id: number) => {
    deleteNotificationMutation([id]);
  };

  return (
    <div className="w-full">
      <DataTable
        data={data && data?.data}
        noDataMessage={noDataMessage || 'No Notifications'}
        loading={loading}
        columns={[
          {
            label: 'Name',
            key: 'User.name',
            render: (data) => {
              return (
                <div className="flex items-center  gap-2 w-full">
                  <Image
                    src={
                      data.createdByUser?.attachment?.file_path ||
                      '/assets/profile/profile.svg'
                    }
                    alt={'data.user.name'}
                    width={30}
                    height={30}
                    unoptimized={true}
                    className="rounded-full h-[30px] object-cover"
                  />
                  <h2>{data.createdByUser.name}</h2>
                </div>
              );
            },
          },
          {
            label: 'Title',
            key: 'title',
            render: (data) => {
              return (
                <div className="flex items-center gap-2 w-full">
                  <h2>{data.title}</h2>
                </div>
              );
            },
          },
          {
            label: 'Notification Type',
            key: 'Notification.Type',
            render: (data) => {
              return (
                <div className="flex items-center gap-2 w-full">
                  <h2>{data.notificationType}</h2>
                </div>
              );
            },
          },
          {
            label: 'Actions',
            key: 'actions',
            render: (data) => {
              return (
                <div className="w-8">
                  <Dropdown
                    trigger={
                      <div>
                        <IoEllipsisVertical className="cursor-pointer" />
                      </div>
                    }
                    options={[
                      {
                        content: (
                          <div onClick={() => handleDelete(data.id)}>
                            Delete Notifications
                          </div>
                        ),
                      },
                    ]}
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

export default NotificationsTable;
