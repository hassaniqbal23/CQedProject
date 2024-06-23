'use client';
import React, { useEffect, useMemo, FC } from 'react';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { Card, TabsComponent } from '@/components/ui';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  ProfileHeader,
  ProfileAbout,
  ProfileInterests,
  WishCountries,
  Gallery,
  Languages,
} from '@/components/common/Profiles';
import useSendPenpalRequest from '@/lib/useSendPenpalRequest';
import { ProfilesDetailPageProps } from '@/app/api/types';

const StudentDetailsPage: FC<ProfilesDetailPageProps> = ({
  isFriend,
  data,
  setIsFriend,
}) => {
  const { sendRequest, isCreatingPenpal, deleteRequest, isDeletingPenpal } =
    useSendPenpalRequest();
  const params = useParams();
  const router = useRouter();
  const currentProfileId = Number(params?.id);
  const { userInformation, myPenpals } = useGlobalState();
  const buttonText =
    userInformation?.id === currentProfileId ? 'Edit Profile' : 'Add Friend';
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/ui/MapComponent/Map'), {
        loading: () => <p>Loading Map</p>,
        ssr: false,
      }),
    []
  );

  const getPenpalInfo = (id: number | string) => {
    const penpal = myPenpals.find((penpal) => penpal.friend.id === id);
    return { isPenpal: !!penpal, penpal };
  };

  const studentProfile = data?.data?.data;
  const location = [
    studentProfile?.profile?.latitude,
    studentProfile?.profile?.longitude,
  ];
  const handleClick = () => {
    const { penpal } = getPenpalInfo(studentProfile?.id);

    userInformation?.id === currentProfileId
      ? router.push('/students/account-settings')
      : isFriend
        ? penpal && deleteRequest(penpal?.id)
        : sendRequest({ receiverId: Number(studentProfile?.id) });
  };

  useEffect(() => {
    let { isPenpal } = getPenpalInfo(currentProfileId);
    setIsFriend && setIsFriend(isPenpal);
  }, [myPenpals, currentProfileId]);

  const tabContents = [
    {
      value: 'about',
      content: (
        <div className="space-y-4 mt-4">
          <Card>
            <ProfileAbout
              title="About"
              className="border-0 shadow-0"
              details={studentProfile?.profile?.bio}
            />
            <ProfileAbout
              title="About my culture"
              className="border-0 shadow-0"
              details={studentProfile?.profile?.culture_information?.[0]}
            />
            <WishCountries
              className="border-0 shadow-0"
              title="Countries I wish to visit"
              countriesList={studentProfile?.profile?.countriesWishToVisit}
            />
          </Card>
          <ProfileInterests
            title="Interests"
            interests={studentProfile?.profile?.interests}
          />
          <Languages
            title="Languages"
            languages={studentProfile?.profile?.languages}
          />
          <Card>
            <ProfileAbout
              title="About your culture, city, country and food"
              className="border-0 shadow-0"
              details={studentProfile?.profile?.culture_information?.[0]}
            />
            <Gallery
              title="Gallery"
              className="border-0 shadow-0"
              images={[
                '/assets/images/LoginPage.png',
                '/assets/images/LoginPage.png',
                '/assets/images/LoginPage.png',
                '/assets/images/LoginPage.png',
              ]}
            />
          </Card>
        </div>
      ),
    },
    {
      value: 'photos',
      content: (
        <Gallery
          title=""
          className="border-0 shadow-0 mt-4 pt-4"
          images={[
            '/assets/images/LoginPage.png',
            '/assets/images/LoginPage.png',
            '/assets/images/LoginPage.png',
            '/assets/images/LoginPage.png',
          ]}
        />
      ),
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      <div className="md:col-span-9">
        <ProfileHeader
          name={studentProfile?.name}
          loggedInUser={userInformation?.id === currentProfileId ? true : false}
          age={studentProfile?.profile?.age}
          gender={studentProfile?.profile?.gender}
          imageSize={{ width: 100, height: 100 }}
          country={studentProfile?.profile?.country}
          titleClass="text-3xl"
          profileId={studentProfile?.id}
          buttonProps={{
            isVisbile: true,
            isLoading: isCreatingPenpal || isDeletingPenpal,
            onClick: handleClick,
            buttonText,
            isFriend,
          }}
          profileIcon={studentProfile?.attachment?.file_path}
          mutualFriends={studentProfile?.mutualFriends || 0}
        />
        <div className="mt-4">
          <TabsComponent
            defaultValue="about"
            isSeparator={true}
            tabs={[
              {
                label: 'About',
                value: 'about',
              },
              {
                label: 'Photos',
                value: 'photos',
              },
            ]}
            tabContent={tabContents}
          />
        </div>
      </div>
      <div className="md:col-span-3">
        <Card className="p-4 mb-4">
          <Map position={location} />
        </Card>
        <ProfileAbout
          className="text-center"
          title="A fact about United Kingdom"
          details="“The Queen does not have a passport.”"
        />
      </div>
    </div>
  );
};

export default StudentDetailsPage;
