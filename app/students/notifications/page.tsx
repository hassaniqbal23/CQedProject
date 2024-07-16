import React from 'react';
import { NotificationPage } from '@/components/Notification/NotificationPage/NotificationPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notifications - Students - GCED',
  description: 'Notifications - Students - GCED',
};

const Notifications = () => {
  return (
    <div>
      <NotificationPage
        buttonText="Mark all as read"
        subTitle="Your latest update"
        title="Notifications"
        linkType="students"
      />
    </div>
  );
};

export default Notifications;
