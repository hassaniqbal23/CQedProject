'use client';

import React from 'react';
import { TabsComponent } from '@/components/ui';
import StudentProfileNavbar from '@/components/common/StudentProfileNavbar/StudentProfileNavbar';
import ProfileStudent from '@/components/common/StudentProfile/StudentProfile';

const Profile = () => {
  const tabContents = [
    {
      value: 'profile',
      content: (
        <ProfileStudent
          cardtitle="PERSONAL INFO"
          name="arslan"
          email="arslan@gmail.com"
          age={25}
          birthDate="21/12/1999"
          gender="male"
          country="Pakistan"
          address="Gilgit-Baltistan"
          status="Active"
          Schedule="View all schedules"
          studentId="#12458u"
        />
      ),
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
