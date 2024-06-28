import React, { FC } from 'react';
import {
  Gallery,
  ProfileBio,
  ProfileCertificates,
  ProfileContactDetails,
  ProfileEducation,
  ProfileHeader,
  ProfileSkills,
  ProfileWorkHistory,
  CurrentlyWorking,
} from '@/components/common/Profiles';
import { Mail, MapPin, Phone } from 'lucide-react';
import { TabsComponent } from '@/components/ui/tabs/tabs';
import Loading from '@/components/ui/button/loading';
import TeacherProfileFeeds from './Feeds/page';
import { ProfilesDetailPageProps } from '@/app/api/types';

export const TeacherProfileView: FC<ProfilesDetailPageProps> = ({
  data: profileData,
  isFriend,
  isPending,
  handleClick,
  isCreatingPenpal,
  isDeletingPenpal,
  buttonText,
  penpalStatus,
}) => {
  const bio = (profileData && profileData?.profile?.bio) || '';

  const contactDetails = () => {
    const detailsData = profileData?.profile;
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

  const tabContents = [
    {
      label: 'Profile',
      value: 'profile',
      content: profileData ? (
        <div>
          {' '}
          <div className="mb-3 mt-4">
            <ProfileBio title="About Me" bio={bio} />
          </div>
          <div className="mb-3 mt-3">
            <ProfileContactDetails
              title="Contact Details"
              details={contactDetails()}
            />
          </div>
          <div className="w-full grid grid-cols-1 gap-4">
            <ProfileEducation
              title="My Education"
              jobs={profileData.education}
            />
            <ProfileWorkHistory
              title="Work History"
              jobs={profileData.workExperience}
            />
          </div>
          <div className="mb-3 mt-3">
            <ProfileSkills
              title="Skills"
              skills={profileData?.profile?.skills || []}
            />
          </div>
          <div className="w-full space-y-4 col-span-2">
            <CurrentlyWorking data={profileData} />
            <ProfileCertificates title="Certificates" certificates={[]} />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[500px] w-full">
          <Loading />
        </div>
      ),
    },
    {
      label: 'Feeds',
      value: 'Feeds',
      content: <TeacherProfileFeeds />,
    },
  ];

  return (
    <div className="space-y-4">
      <ProfileHeader
        name={profileData?.profile?.full_name}
        role={profileData?.role?.name}
        subrole={profileData?.school?.name}
        location={profileData?.profile?.state}
        profileIcon={profileData?.attachment?.file_path}
        profileId={profileData?.id}
        buttonProps={{
          isVisbile: true,
          isLoading: isCreatingPenpal || isDeletingPenpal,
          onClick: handleClick,
          buttonText,
          isFriend: isPending ? false : isFriend,
        }}
        mutualFriends={profileData?.mutualFriends}
        penpalStatus={penpalStatus}
        penpalId={profileData?.penpalId}
      />
      <div>
        <TabsComponent
          defaultValue="profile"
          isSeparator={true}
          tabs={tabContents.map((tab) => ({
            label: tab.label,
            value: tab.value,
          }))}
          tabContent={tabContents}
        />
      </div>
    </div>
  );
};

export default TeacherProfileView;
