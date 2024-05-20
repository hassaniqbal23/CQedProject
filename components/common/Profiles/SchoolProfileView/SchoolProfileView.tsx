import React, { FC } from 'react';
import {
  ProfileBio,
  ProfileContactDetails,
  ProfileHeader,
} from '@/components/common/Profiles';
import { Mail, MapPin, Phone } from 'lucide-react';
import { getSchoolByID } from '@/app/api/schools';
import { useQuery } from 'react-query';
import { ISchoolProfile } from '@/types/school';

interface IProps {
  id: number;
}
export const SchoolProfileView: FC<IProps> = ({ id }) => {
  const { data: getProfileData } = useQuery(['getSchoolByID', id], () =>
    getSchoolByID(id).then((res) => res?.data?.data as ISchoolProfile)
  );

  return (
    <div className="space-y-4">
      <ProfileHeader
        name={getProfileData?.name || ''}
        role="10th Grade Geometry at "
        subrole=" Oak Ridge H.S."
        location={getProfileData?.address || ''}
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
                content: getProfileData?.email || '',
                icon: Mail,
              },
              {
                title: 'Phone',
                content: getProfileData?.phone_number || '',
                icon: Phone,
              },
              {
                title: 'Skype',
                content: '@leonardcamp',
                icon: MapPin,
              },
              {
                title: 'Address',
                content: getProfileData?.address || '',
                icon: MapPin,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
