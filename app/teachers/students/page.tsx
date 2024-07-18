import StudentsListPage from '@/components/PageContainers/Teacher/StudentsListPage/StudentsListPage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Students - GCED',
  description: 'Students - GCED',
  icons: '/favi.png',
};

const Students = () => {
  return <StudentsListPage></StudentsListPage>;
};

export default Students;
