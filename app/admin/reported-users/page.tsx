import ReportedUsers from '@/components/common/ReportedUsers/ReportedUsers';
import React from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reported Users - Dashboard - GCED',
  description: 'Reported Users - Dashboard - GCED',
};

const Reports = () => {
  return (
    <div>
      <ReportedUsers />
    </div>
  );
};

export default Reports;
