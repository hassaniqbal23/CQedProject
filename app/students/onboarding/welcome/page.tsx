import React from 'react';
import StudentOnBoardingWelcome from '@/components/PageContainers/Student/Onboarding/StudentWelcomePage/StudentWelcomePage';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welcome - Onboarding - GCED',
  description: 'Welcome - Onboarding - GCED',
  icons: '/favi.png',
};

function Welcome() {
  return (
    <div>
      <StudentOnBoardingWelcome />
    </div>
  );
}

export default Welcome;
