import React, { FC } from 'react';
import { useQuery } from 'react-query';
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
import { getProfiledata } from '@/app/api/teachers';
import { TabsComponent } from '@/components/ui/tabs/tabs';

interface IProps {
  id: number;
}

export const TeacherProfileView: FC<IProps> = ({ id }) => {
  const {
    data: profileData,
    error,
    isLoading,
  } = useQuery(
    ['profileData', id],
    () =>
      getProfiledata(id as number).then((res) => {
        return res.data.data;
      }),
    {
      enabled: id ? true : false,
    }
  );

  if (isLoading)
    return <div className="flex justify-center py-8 ">Loading...</div>;

  const bio =
    (profileData && JSON.parse(profileData?.user?.profile[0]?.meta)?.bio) || '';

  const interestsArray = profileData?.user.interests.split(',');

  const contactDetails = () => {
    const detailsData = profileData?.user?.profile[0];
    const details: any = [
      {
        title: 'Email',
        content: profileData?.email,
        icon: Mail,
      },
      {
        title: 'Phone',
        content: detailsData?.phone_number,
        icon: Phone,
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
        name={profileData?.fullname}
        role={'N/A'}
        subrole={'N/A'}
        location={profileData?.user?.profile[0]?.state}
        profileIcon={profileData?.user?.attachment?.file_path}
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
        <div className="sm:col-span-3 h-full">
          <ProfileBio title="About The Teacher" bio={bio} />
        </div>
        <div className="sm:col-span-2">
          <ProfileContactDetails
            title="Contact Details"
            details={contactDetails()}
          />
        </div>
      </div>
      <ProfileSkills
        title="Skills"
        skills={
          interestsArray?.map((skill: string) => {
            return skill;
          }) || []
        }
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

export default TeacherProfileView;
