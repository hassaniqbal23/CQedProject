import React from 'react';
import DashboardFeeds from '@/components/DashboardFeeds/DashboardFeeds';
import DashboardCards from '@/components/common/DashboardCards/DashboardCards';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - Teacher - GCED',
  description: 'Dashboard - Teacher - GCED',
  icons: '/favi.png',
};

const Dashboard = () => {
  return (
    <div className="flex relative">
      <DashboardFeeds />
      <DashboardCards />
    </div>
  );
};

export default Dashboard;
