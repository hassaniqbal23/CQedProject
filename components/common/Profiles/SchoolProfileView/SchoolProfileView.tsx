import {
  ProfileBio,
  ProfileContactDetails,
  ProfileHeader,
} from '@/components/common/Profiles';
import { Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';

export const SchoolProfileView = () => {
  return (
    <div className="space-y-4">
      <ProfileHeader
        name="Minerva McGonagall"
        role="10th Grade Geometry at "
        subrole=" Oak Ridge H.S."
        location="Glenwood, CA"
        profileIcon="/assets/profile/teacherprofile.svg"
      />

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        <div className="sm:col-span-3  h-full">
          <ProfileBio
            title="About The School"
            bio="Meet Aliyan, a spirited 12-year-old with a contagious enthusiasm for life. His bright blue eyes sparkle with curiosity, and his perpetually messy hair reflects the adventures he embarks on each day. Jake's world is filled with a kaleidoscope of interests, from building intricate LEGO masterpieces to exploring the fascinating realms of video games. With a backpack full of dreams and a heart full of laughter, Jake navigates the maze of adolescence with "
          />
        </div>
        <div className="sm:col-span-2">
          <ProfileContactDetails
            title="Contact Details"
            details={[
              {
                title: 'Email',
                content: 'stmaryhighschool@gmail.com',
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
    </div>
  );
};

SchoolProfileView.display = 'SchoolProfileView';
