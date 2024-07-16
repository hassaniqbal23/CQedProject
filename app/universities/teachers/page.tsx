import UniversityTeachersList from '@/components/PageContainers/University/TeachersList/TeachersList';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teachers - GCED',
  description: 'Teachers - GCED',
};

const UniversityTeachers = () => {
  return <UniversityTeachersList></UniversityTeachersList>;
};

export default UniversityTeachers;
