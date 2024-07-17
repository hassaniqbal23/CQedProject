import AccessDeniedPage from '@/components/PageContainers/Unauthenticated/AccessDeniedPage/AccessDeniedPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Access Defined - GCED',
  description: 'Access Defined - GCED',
};

const AccessDenied = () => {
  return <AccessDeniedPage></AccessDeniedPage>;
};

export default AccessDenied;
