'use client';

import React from 'react';
import DashboardFeeds from '@/components/DashboardFeeds/DashboardFeeds';
import DashboardCards from '@/components/common/DashboardCards/DashboardCards';

const Dashboard = () => {
  return (
    <div className="grid grid-cols-2">
      <DashboardFeeds />
      <DashboardCards />
    </div>
  );
};

export default Dashboard;
