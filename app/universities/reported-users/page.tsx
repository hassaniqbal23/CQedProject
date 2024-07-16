import ReportedUsers from '@/components/common/ReportedUsers/ReportedUsers';
import React from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reported Users - GCED',
  description: 'Reported Users - GCED',
};

const Reports = () => {
  return (
    <div>
      <ReportedUsers />
    </div>
  );
};

export default Reports;
