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
import { Card } from '@/components/ui';
import { TeacherProfileCard } from '../../teacherProfile/TeacherProfileCard';
import { Typography } from '../../Typography/Typography';
import Link from 'next/link';

interface IProps {
  id: number;
}
export const SchoolProfileView: FC<IProps> = ({ id }) => {
  const { data: getProfileData } = useQuery(['getSchoolByID', id], () =>
    getSchoolByID(id).then((res) => res?.data?.data as ISchoolProfile)
  );
  const teachers = [
    {
      profileImg: '/assets/teacher/EthanAvatar.svg',
      about:
        'Hi I am Ethan, an 8-year-old form United States with a passion for drawing and a heart full love',
      name: 'Ethan',
      buttonText: 'View Profile',
      href: '/admin',
    },

    {
      profileImg: '/assets/teacher/EthanAvatar.svg',
      about:
        'Hi I am Ethan, an 8-year-old form United States with a passion for drawing and a heart full love',
      name: 'Lily',
      buttonText: 'View Profile',
      href: '/admin',
    },

    {
      profileImg: '/assets/teacher/EthanAvatar.svg',
      about:
        'Hi I am Ethan, an 8-year-old form United States with a passion for drawing and a heart full love',
      name: 'Moominmadeness',
      buttonText: 'View Profile',
      href: '/admin',
    },
    {
      profileImg: '/assets/teacher/EthanAvatar.svg',
      about:
        'Hi I am Ethan, an 8-year-old form United States with a passion for drawing and a heart full love',
      name: 'Ethan',
      buttonText: 'View Profile',
      href: '/admin',
    },
  ];

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

      <Card className="py-4">
        <div className={'w-full flex px-7 py-4'}>
          <div className={'flex gap-2 items-center'}>
            <Typography variant={'h4'} weight={'semibold'}>
              Teachers
            </Typography>
          </div>
          <div className={'ml-auto'}>
            <Link className="text-primary-500" href={'#'}>
              View all
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-12 px-7 gap-3 space-x-3 ">
          {teachers &&
            teachers?.map((teacher, index) => (
              <div
                key={index}
                className="col-span-12 md:col-span-4 lg:col-span-3"
              >
                <TeacherProfileCard
                  profileImg={teacher?.profileImg || ''}
                  name={teacher?.name || ''}
                  about={teacher?.about || ''}
                  href={teacher?.href || ''}
                  buttonText={teacher?.buttonText || ''}
                />
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
};
