'use client';
import React from 'react';
import { NotificationPage } from '@/components/Notification/NotificationPage/NotificationPage';

const Notifications = () => {
  return (
    <div>
      <NotificationPage
        buttonOnClick={() => {}}
        buttonText="Mark all as read"
        subTitle="The total number of teachers"
        title="Notifications"
      />
    </div>
  );
};

export default Notifications;
