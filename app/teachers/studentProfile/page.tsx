'use client';

import React from 'react';


import { TabsComponent } from '@/components/ui';
import StudentProfileNavbar from '@/components/common/StudentProfileNavbar/studentProfileNavbar';
import StudentProfileProps from '@/components/common/studentProfile/studentProfileProps';
import PostProps from '@/components/common/postCard/post/post-props';
import StudentGruopProps from '@/components/common/studentGroups/studentGroupsProps';

const Profile = () => {
  const tabContents = [
    {
      value: 'profile',
      content: <StudentProfileProps></StudentProfileProps>
      
      
    },
    { value: 'Feeds', content: <PostProps></PostProps> },
    { value: 'Groups', content: <StudentGruopProps></StudentGruopProps> },
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
