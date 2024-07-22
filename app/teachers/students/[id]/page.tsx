import React from 'react';
import StudentsProfilePage from '@/components/StudentProfilePage/StudentProfilePage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Student profile view - GCED',
  description: 'Student profile view - GCED',
  icons: '/favi.png',
};

const Profile = () => {
  return (
    <div className="">
      <StudentsProfilePage />
    </div>
  );
};

export default Profile;
