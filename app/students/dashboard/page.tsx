'use client';
import React from 'react';
import DashboardFeeds from '@/components/DashboardFeeds/DashboardFeeds';
import DashboardCards from '@/components/common/DashboardCards/DashboardCards';

export default function StudentDashboard() {
  return (
    <div className="flex">
      <DashboardFeeds />
      <DashboardCards />
    </div>
  );
}
