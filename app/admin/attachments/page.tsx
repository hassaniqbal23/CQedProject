import React from 'react';

import type { Metadata } from 'next';
import { AdminAttachments } from '@/components/PageContainers/Admin/Attachments/AttachmentsPage';

export const metadata: Metadata = {
  title: 'All Attachments - Dashboard - GCED',
  description: 'All Attachments - Dashboard - GCED',
};

const Notifications = () => {
  return (
    <div>
      <AdminAttachments />
    </div>
  );
};

export default Notifications;
