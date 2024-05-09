'use client';

import React from 'react';

import { TabsComponent } from '@/components/ui';
import StudentProfileNavbar from '@/components/common/StudentProfileNavbar/StudentProfileNavbar';
import StudentProfileProps from '@/components/common/studentProfile/studentProfileProps';

const Profile = () => {
  const tabContents = [
    {
      value: 'profile',
      content: <StudentProfileProps></StudentProfileProps>,
    },
    { value: 'Feeds', content: <div>coming soon.</div> },
    { value: 'Groups', content: <div>coming soon.</div> },
  ];
  return (
    <div>
      <StudentProfileNavbar
        userImage={'/assets/profile/profile.svg'}
        heading={'Moin Haikal'}
      />
      <TabsComponent
        defaultValue="profile"
        tabs={[
          {
            label: 'Profile',
            value: 'profile',
          },
          {
            label: 'Feeds',
            value: 'Feeds',
          },
          {
            label: 'Groups',
            value: 'Groups',
          },
        ]}
        tabContent={tabContents}
      />
    </div>
  );
};

export default Profile;
