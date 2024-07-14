import AdminNotifications from '@/components/common/AdminNotifications/AdminNotifications';
import React from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'User Notifications - Dashboard - GCED',
  description: 'User Notifications - Dashboard - GCED',
};

const Notifications = () => {
  return (
    <div>
      <AdminNotifications />
    </div>
  );
};

export default Notifications;
