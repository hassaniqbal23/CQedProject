import React from 'react';
import { useQuery } from 'react-query';
import {
  ProfileBio,
  ProfileContactDetails,
  ProfileHeader,
  ProfileSkills,
} from '@/components/common/Profiles';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useParams } from 'next/navigation';
import { getProfiledata } from '@/app/api/teachers';
import { TabsComponent } from '@/components/ui/tabs/tabs';

export const TeacherProfileView = () => {
  const params = useParams();
  const { data, error, isLoading } = useQuery(['profileData', params?.id], () =>
    getProfiledata(params?.id as any)
  );
  console.log(data);

  if (isLoading) return <div>Loading...</div>;

  const bio = JSON.parse(data?.data.data.user.profile[0].meta).bio;

  const interestsArray = data?.data.data.user.interests.split(',');
  // console.log(interestsArray);

  const contactDetails = () => {
    const detailsData = data?.data.data.user.profile[0];
    const details: any = [
      {
        title: 'Email',
        content: data?.data.data.user.email,
        icon: Mail,
      },
      {
        title: 'Phone',
        content: detailsData.phone_number,
        icon: Phone,
      },
      {
        title: 'Address',
        content: `${detailsData.address}, ${detailsData.state}, ${detailsData.zip_code}`,
        icon: MapPin,
      },
    ];

    if (detailsData.skypeId) {
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
        name={data?.data.data.fullname}
        role={'N/A'}
        subrole={'N/A'}
        location={data?.data.data.user.profile[0].state}
        profileIcon={data?.data.data.user.attachment.file_path}
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
        skills={interestsArray.map((skill: string) => {
          return skill;
        })}
      />
      {/* <div className="sm:grid gap-4 grid-cols-5">
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
      </div> */}
    </div>
  );
};

export default TeacherProfileView;
