import UniversityDashboard from '@/components/PageContainers/University/Dashboard/UniversityDashboard';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'University Dashboard - GCED',
  description: 'University Dashboard - GCED',
};

const UniversityDashboardPage = () => {
  return <UniversityDashboard></UniversityDashboard>;
};

export default UniversityDashboardPage;
