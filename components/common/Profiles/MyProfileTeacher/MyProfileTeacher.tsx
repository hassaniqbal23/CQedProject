import React, { FC } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import {
  ProfileBio,
  ProfileCertificates,
  ProfileContactDetails,
  ProfileEducation,
  ProfileHeader,
  ProfileSkills,
  ProfileWorkHistory,
  // UniversityLink,
} from '@/components/common/Profiles';
import { Mail, MapPin, Phone } from 'lucide-react';
import { TabsComponent } from '@/components/ui/tabs/tabs';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { ITeacherProfileResponse } from '@/types/tearcher';
import { getProfileInfo } from '@/app/api/auth';

export const MyProfileTeacher: FC = () => {
  const { userInformation } = useGlobalState();
  const {
    data: profileData,
    error,
    isLoading,
  }: UseQueryResult<ITeacherProfileResponse, Error> = useQuery(
    ['getProfileLoginUser'],
    () => getProfileInfo(userInformation.id),
    {
      enabled: userInformation.id ? true : false,
    }
  );
  if (isLoading)
    return <div className="flex justify-center py-8 ">Loading...</div>;

  const bio = (profileData && profileData?.data?.profile?.bio) || '';

  const interestsArray = profileData?.data.profile?.skills;

  const contactDetails = () => {
    const detailsData = profileData?.data?.profile;
    const details: any = [
      {
        title: 'Email',
        content: profileData?.data?.email,
        icon: Mail,
      },
      {
        title: 'Address',
        content: `${detailsData?.address}, ${detailsData?.state}, ${detailsData?.zip_code}`,
        icon: MapPin,
      },
    ];

    if (detailsData?.skypeId) {
      details.push({
        title: 'Skype',
        content: '@leonardcamp',
        icon: MapPin,
      });
    }

    return details;
  };

  return (
    <div className="space-y-4">
      <ProfileHeader
        name={profileData?.data?.name}
        role={profileData?.data?.profile?.address}
        subrole={profileData?.data?.school?.name}
        location={profileData?.data?.profile?.state}
        profileIcon={profileData?.data?.attachment?.file_path}
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
      <div className="">
        <ProfileBio title="About The Teacher" bio={bio} />
      </div>
      <div className="">
        <ProfileContactDetails
          title="Contact Details"
          details={contactDetails()}
        />
      </div>
      <ProfileSkills title="Skills" skills={interestsArray || []} />
      <div>
        <ProfileWorkHistory
          title="Work History"
          jobs={[
            {
              id: '1',
              title: 'Senior Professor',
              institution: 'Massachusetts Institute of Technology (MIT)',
              location: 'United Kingdom',
              startDate: 'Dec 2019 ',
              endDate: 'Present',
            },
            {
              id: '2',
              title: 'Senior Developer',
              institution: 'harvard University',
              location: 'United Kingdom',
              startDate: 'Dec 2019 ',
              endDate: 'Present',
            },
          ]}
        />

        <ProfileEducation
          title="Education"
          jobs={[
            {
              id: '1',
              educationLevel: "Master's",
              fieldOfStudy: 'Information Techonology',
              countryCode: 'United Kingdom',
              institution: 'Stanford University',
              startDate: 'Dec 2019 ',
              endDate: 'Present',
            },
            {
              id: '2',
              educationLevel: "Master's",
              fieldOfStudy: 'Information Techonology',
              countryCode: 'United Kingdom',

              institution: 'Stanford University',
              startDate: 'Dec 2019 ',
              endDate: 'Present',
            },
          ]}
        />
      </div>
      <div className="">
        {/* <UniversityLink /> */}
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
    </div>
  );
};
