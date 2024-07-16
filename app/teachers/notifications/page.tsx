'use client';
import React from 'react';
import { NotificationPage } from '@/components/Notification/NotificationPage/NotificationPage';

const Notifications = () => {
  return (
    <div>
      <NotificationPage
        buttonText="Mark all as read"
        subTitle="Your latest update"
        title="Notifications"
        linkType="teachers"
      />
    </div>
  );
};

export default Notifications;
