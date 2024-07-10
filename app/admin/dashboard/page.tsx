import React from 'react';
import { DashboardPage } from './(components)/DashboardPage';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - GCED',
  description: 'Dashboard - GCED',
};

const Dashboard = () => {
  return <DashboardPage />;
};

export default Dashboard;
