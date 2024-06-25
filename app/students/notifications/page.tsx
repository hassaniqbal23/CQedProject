'use client';
import React from 'react';
import { NotificationPage } from '@/components/Notification/NotificationPage/NotificationPage';

const Notifications = () => {
  return (
    <div>
      <NotificationPage
        buttonOnClick={() => {}}
        buttonText="Mark all as read"
        subTitle="Your latest update"
        title="Notifications"
      />
    </div>
  );
};

export default Notifications;
