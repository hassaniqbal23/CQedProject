'use client';
import React from 'react';
import ProfileSettings from '@/components/common/ProfileSettings';
import SecuritySettings from '@/components/common/SecuritySettings';
import { TabsComponent } from '@/components/ui';

const tabContents = [
  { value: 'profile', content: <ProfileSettings></ProfileSettings> },
  { value: 'security', content: <SecuritySettings></SecuritySettings> },
];

const Profile = () => {
  return (
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
  );
};

export default Profile;
