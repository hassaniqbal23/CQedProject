'use client';

import React, { Suspense } from 'react';

import { TabsComponent } from '@/components/ui';
import AccountSetting from '@/components/AccountSetting/AccountSetting';
import ProfileSetting from '@/components/ProfileSetting/ProfileSetting';

const tabContents = [
  { value: 'profile', content: <ProfileSetting></ProfileSetting> },
  { value: 'security', content: <AccountSetting></AccountSetting> },
];

const TeacherAccountSettingsPage = () => {
  return (
    <div>
      <Suspense fallback={<div></div>}>
        <TabsComponent
          defaultValue="profile"
          tabs={[
            {
              label: 'Profile',
              value: 'profile',
            },
            {
              label: 'Security',
              value: 'security',
            },
          ]}
          tabContent={tabContents}
        />
      </Suspense>
    </div>
  );
};

export default TeacherAccountSettingsPage;
