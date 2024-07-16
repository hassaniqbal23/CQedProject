import React from 'react';
import StudentProfilePage from '@/components/StudentProfilePage/StudentProfilePage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'University Profile - GCED',
  description: 'University Profile - GCED',
};

const UniversityStudentsProfile = () => {
  return (
    <div>
      <StudentProfilePage />
    </div>
  );
};

export default UniversityStudentsProfile;
