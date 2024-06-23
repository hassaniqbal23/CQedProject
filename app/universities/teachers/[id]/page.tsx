'use client';

import { useParams } from 'next/navigation';
import { TeacherProfileView } from '@/components/common/Profiles/TeacherProfileView/TeacherProfileView';

const UniversityTeachersProfile = () => {
  const params = useParams();
  return <TeacherProfileView />;
};

export default UniversityTeachersProfile;
