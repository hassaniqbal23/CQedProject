import React from 'react';
import DashboardFeeds from '@/components/DashboardFeeds/DashboardFeeds';
import DashboardCards from '@/components/common/DashboardCards/DashboardCards';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student Dashboard - GCED',
  description: 'Student Dashboard - GCED',
};

export default function StudentDashboard() {
  return (
    <div className="flex">
      <DashboardFeeds />
      <DashboardCards />
    </div>
  );
}
