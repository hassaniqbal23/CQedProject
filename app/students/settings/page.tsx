'use client';

import React from 'react';
import SecuritySettings from '@/components/common/SecuritySettings';
import { TabsComponent } from '@/components/ui';
import StudentProfileSettings from '@/components/common/StudentsProfileSettings';

const tabContents = [
  {
    value: 'studetn-profile',
    content: <StudentProfileSettings></StudentProfileSettings>,
  },
  { value: 'student-security', content: <SecuritySettings></SecuritySettings> },
];

const Profile = () => {
  return (
    <div>
      <TabsComponent
        defaultValue="studetn-profile"
        tabs={[
          {
            label: 'Profile',
            value: 'studetn-profile',
          },
          {
            label: 'Security',
            value: 'student-security',
          },
        ]}
        tabContent={tabContents}
      />
    </div>
  );
};

export default Profile;
