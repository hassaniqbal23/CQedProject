import UniversityStudentsList from '@/components/PageContainers/University/StudentsList/StudentsList';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Students - GCED',
  description: 'Students - GCED',
};

const Students = () => {
  return <UniversityStudentsList></UniversityStudentsList>;
};

export default Students;
