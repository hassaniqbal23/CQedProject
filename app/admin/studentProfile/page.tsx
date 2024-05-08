'use client';

import React from 'react';
import ProfileStudent from '@/components/common/studentProfile/studentProfile';
// import { Post } from '@/components/common/postCard/post/post';
import { TabsComponent } from '@/components/ui';
import StudentProfileNavbar from '@/components/common/StudentProfileNavbar/studentProfileNavbar';

import PostProps from '@/components/common/postCard/post/post-props';
import StudentGruopProps from '@/components/common/studentGroups/studentGroupsProps';



const Profile = () => {
    const tabContents = [
        { value: 'profile', content: <ProfileStudent cardtitle={'PERSONAL INFO'} name={'arslan'} email={'arslan@gmail'} age={25} birthDate={'21/12/1999'} gender={'male'} country={'pakistan'} address={'gilgit-baltistan'} status={'active'} Schedule={'View all schedules'} studentId={'#12458u'}></ProfileStudent> },
        { value: 'Feeds', content: <PostProps></PostProps> },
        {value: 'Groups', content:<StudentGruopProps></StudentGruopProps>},
        
      
      ];
  return (
    <div>
        <StudentProfileNavbar userImage={ '/assets/profile/profile.svg'} heading={'Moin Haikal'}/>
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
