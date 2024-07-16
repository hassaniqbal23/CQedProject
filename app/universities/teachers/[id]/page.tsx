'use client';

import { TeacherProfileView } from '@/components/common/Profiles/TeacherProfileView/TeacherProfileView';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teacher view - GCED',
  description: 'Teacher view - GCED',
};

const UniversityTeachersProfile = () => {
  return <TeacherProfileView />;
};

export default UniversityTeachersProfile;
