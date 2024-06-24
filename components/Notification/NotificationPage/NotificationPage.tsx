import React from 'react';
import { Notification } from '../Notification';
import { Typography } from '../../common/Typography/Typography';
import { Button } from '../../ui';
import { useGlobalState } from '@/app/globalContext/globalContext';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useMutation, useQueryClient } from 'react-query';
import {
  communityUserAcceptInvite,
  deleteNotification,
  notificationMarkRead,
  penpalAcceptRequest,
} from '@/app/api/auth';
import { ICommunityAcceptInvite, INotifications } from '@/types/auth';

interface NotificationPageProps {
  title: string;
  subTitle: string;
  buttonText: string;
  buttonOnClick: () => void;
}

export const NotificationPage: React.FC<NotificationPageProps> = ({
  title,
  subTitle,
  buttonText,
  buttonOnClick,
}) => {
  dayjs.extend(relativeTime);
  const { notifications } = useGlobalState();
  const client = useQueryClient();

  const {
    mutate: muateCommunityUserAcceptInvite,
    isLoading: isCommunityUserAccepting,
  } = useMutation(
    (payload: ICommunityAcceptInvite) => communityUserAcceptInvite(payload),
    {
      onSuccess: (res) => {},
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    }
  );
  const { mutate: muatePenpalAcceptRequest, isLoading: isPenpalAccepting } =
    useMutation(
      (payload: ICommunityAcceptInvite) => penpalAcceptRequest(payload),
      {
        onSuccess: (res) => {},
        onError: (error: any) => {
          console.log(error, 'Error =====> log');
        },
      }
    );

  const { mutate: muateNotificationMarkRead, isLoading: isReading } =
    useMutation(
      (payload: { id?: number; status: true }) =>
        notificationMarkRead(payload as { id: number; status: true }),
      {
        onSuccess: (res) => {
          client.invalidateQueries('getNotifications');
        },
        onError: (error: any) => {
          console.log(error, 'Error =====> log');
        },
      }
    );

  const { mutate: muateNotificationDelete, isLoading: isDeleting } =
    useMutation((id: number) => deleteNotification(id as number), {
      onSuccess: (res) => {
        client.invalidateQueries('getNotifications');
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    });

  const handleClick = (payload: INotifications, status: string) => {
    if (payload?.notificationType === 'COMMUNITY_JOIN_REQUEST') {
      const submit = {
        userId: payload?.createdById,
        communityId: payload.community_id,
        status: status,
      };
      muateCommunityUserAcceptInvite(submit as ICommunityAcceptInvite);
    }
    if (payload?.notificationType === 'PENPAL_REQUEST') {
      const submit = {
        userId: payload?.createdById,
        requestId: payload.penpal_id,
        status: status,
      };
      muatePenpalAcceptRequest(submit as ICommunityAcceptInvite);
    }
  };

  const handelReadNotification = (id?: number) => {
    muateNotificationMarkRead({ id: id, status: true });
  };

  return (
    <div className="">
      <div className="px-4 flex flex-wrap items-center justify-between mb-4">
        <div>
          <Typography variant="h2" weight="bold">
            {title}
          </Typography>
          <Typography variant="p" weight="regular" className="text-gray-600">
            {subTitle}
          </Typography>
        </div>
        <div>
          <Button
            size={'md'}
            variant={'outline'}
            className=" text-primary-900 bg-[#ECEDF8] "
            onClick={() => {
              handelReadNotification();
              buttonOnClick;
            }}
          >
            {buttonText}
          </Button>
        </div>
      </div>
      <div className="mt-14">
        {notifications?.map((notification, index) => {
          const createdAt = notification?.created_at ?? '';
          return (
            <Notification
              onMarkAsRead={() => handelReadNotification(notification.id)}
              onDelete={() => muateNotificationDelete(notification.id)}
              key={index}
              avatar={notification?.createdByUser?.attachment?.file_path || ''}
              isRead={notification.isRead}
              message={
                <>
                  <b>@{notification?.createdByUser?.name} </b>
                  {notification?.body}
                </>
              }
              actions={() => (
                <div className="block">
                  <p className="text-xs text-gray-500 block">
                    {notification?.created_at && dayjs(createdAt).fromNow()}
                  </p>
                  {(notification.notificationType === 'PENPAL_REQUEST' ||
                    notification.notificationType ===
                      'COMMUNITY_JOIN_REQUEST') && (
                    <div className="flex items-center">
                      <Button
                        onClick={() => handleClick(notification, 'ACCEPTED')}
                        size={'sm'}
                        className="bg-primary-500 text-white rounded-full px-6 py-2 mt-1  "
                      >
                        {notification.notificationType === 'PENPAL_REQUEST'
                          ? 'Friend Request'
                          : 'Join'}
                      </Button>
                      <Button
                        size={'sm'}
                        onClick={() => handleClick(notification, 'REJECTED')}
                        className="border border-solid border-primary-500 text-primary-500 px-8 py-2 rounded-full ml-4 bg-transparent"
                      >
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              )}
            />
          );
        })}
      </div>
    </div>
  );
};
