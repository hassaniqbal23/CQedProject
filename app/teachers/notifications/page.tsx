import React from 'react';
import { NotificationPage } from '@/components/Notification/NotificationPage/NotificationPage';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Notifications - GCED',
  description: 'Notifications - GCED',
  icons: '/favi.png',
};

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
