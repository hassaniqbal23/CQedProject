'use client';

import React, { Suspense } from 'react';

import { TabsComponent } from '@/components/ui';
import AccountSetting from '@/components/AccountSetting/AccountSetting';
import ProfileSetting from '@/components/ProfileSetting/ProfileSetting';

const tabContents = [
  { value: 'profile', content: <ProfileSetting></ProfileSetting> },
  { value: 'security', content: <AccountSetting></AccountSetting> },
];

const AccountSettings = () => {
  return (
    <Suspense>
      <div>
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
      </div>
    </Suspense>
  );
};

export default AccountSettings;
