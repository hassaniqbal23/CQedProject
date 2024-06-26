'use client';

import React from 'react';
import DashboardFeeds from '@/components/DashboardFeeds/DashboardFeeds';
import DashboardCards from '@/components/common/DashboardCards/DashboardCards';

const Dashboard = () => {
  return (
    <div className="flex relative">
      <DashboardFeeds />
      <DashboardCards />
    </div>
  );
};

export default Dashboard;
