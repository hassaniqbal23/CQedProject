'use client';

import React, { Suspense } from 'react';
import SecuritySettings from '@/components/common/SecuritySettings';
import { TabsComponent } from '@/components/ui';
import StudentProfileSettings from '@/components/common/StudentsProfileSettings';

const tabContents = [
  {
    value: 'student-profile',
    content: <StudentProfileSettings></StudentProfileSettings>,
  },
  { value: 'student-security', content: <SecuritySettings></SecuritySettings> },
];

const StudentProfileSettingsPage = () => {
  return (
    <Suspense>
      <div>
        <TabsComponent
          defaultValue="student-profile"
          tabs={[
            {
              label: 'Profile',
              value: 'student-profile',
            },
            {
              label: 'Security',
              value: 'student-security',
            },
          ]}
          tabContent={tabContents}
        />
      </div>
    </Suspense>
  );
};

export default StudentProfileSettingsPage;
