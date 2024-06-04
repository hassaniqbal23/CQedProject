import React from 'react';

import {
  ProfileBio,
  ProfileCertificates,
  ProfileContactDetails,
  ProfileEducation,
  ProfileHeader,
  ProfileSkills,
  ProfileWorkHistory,
  UniversityLink,
} from '@/components/common/Profiles';
import { Mail, MapPin, Phone } from 'lucide-react';
import { TabsComponent } from '@/components/ui/tabs/tabs';

export const TeacherProfileView = () => {
  return (
    <div className="space-y-4">
      <ProfileHeader
        name="Minerva McGonagall"
        role="10th Grade Geometry at "
        subrole=" Oak Ridge H.S."
        location="Glenwood, CA"
        profileIcon="/assets/profile/teacherprofile.svg"
      />
      <div>
        <TabsComponent
          defaultValue="profile"
          isSeparator={true}
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
              label: 'Photos',
              value: 'Photos',
            },
          ]}
          tabContent={[]}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        <div className="sm:col-span-3  h-full">
          <ProfileBio
            title="About The Teacher"
            bio="Meet Aliyan, a spirited 12-year-old with a contagious enthusiasm for life. His bright blue eyes sparkle with curiosity, and his perpetually messy hair reflects the adventures he embarks on each day. Jake's world is filled with a kaleidoscope of interests, from building intricate LEGO masterpieces to exploring the fascinating realms of video games. With a backpack full of dreams and a heart full of laughter, Jake navigates the maze of adolescence with "
          />
        </div>
        <div className="sm:col-span-2">
          <ProfileContactDetails
            title="Contact Details"
            details={[
              {
                title: 'Email',
                content: 'leonardcampbell@gmail.com',
                icon: Mail,
              },
              {
                title: 'Phone',
                content: '03000000000',
                icon: Phone,
              },
              {
                title: 'Skype',
                content: '@leonardcamp',
                icon: MapPin,
              },
              {
                title: 'Address',
                content: '225 cherry street #24, New york,NY',
                icon: MapPin,
              },
            ]}
          />
        </div>
      </div>
      <ProfileSkills
        title="Skills"
        skills={[
          'Communication',
          'Adaptability',
          'Classroom Management',
          'Subject Matter Expertise',
          'Adaptability',
          'Classroom Management',
          'Subject Matter Expertise',
          'Adaptability',
          'Classroom Management',
          'Subject Matter Expertise',
        ]}
      />
      <div className="sm:grid gap-4 grid-cols-5">
        <div className="w-full space-y-4 col-span-2">
          <UniversityLink />
          <ProfileCertificates
            title="Certificates"
            certificates={[
              {
                id: '1',
                name: 'Teaching Certificate',
                date: '02/04 2024',
                issueName: 'Certificate issuer',
              },
              {
                id: '2',
                name: 'Professional Development',
                date: '02/04 2024',
                issueName: 'Certificate issuer',
              },
            ]}
          />
        </div>
        <div className="col-span-3">
          <div className="w-full grid grid-cols-1 gap-4">
            <ProfileWorkHistory
              title="Work History"
              jobs={[
                {
                  id: '1',
                  company: 'Massachusetts Institute of Technology (MIT)',
                  role: 'Simply Design',
                  duration: 'Dec 2019 - Present',
                },
                {
                  id: '2',
                  company: 'Harvard University',
                  role: 'Simply Design',
                  duration: 'Dec 2019 - Present',
                },
              ]}
            />

            <ProfileEducation
              title="Education"
              jobs={[
                {
                  id: '1',
                  company: 'Mater’s degree in information Technolog',
                  role: 'Simply Design',
                  duration: 'Dec 2019 - Present',
                },
                {
                  id: '2',
                  company: 'Mater’s degree in information Technologyy',
                  role: 'Simply Design',
                  duration: 'Dec 2019 - Present',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

TeacherProfileView.display = 'TeacherProfileView';
