'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { deletePenpal } from '@/app/api/penpals';
import { Card, TabsComponent } from '@/components/ui';
import { getProfile } from '@/app/api/students';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Loading from '../ui/button/loading';
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

const PersonalProfilePage = () => {
  const queryClient = useQueryClient();
  const { sendRequest, isCreatingPenpal } = useSendPenpalRequest();
  const params = useParams();
  const router = useRouter();
  const currentProfileId = Number(params?.id);
  const { userInformation, myPenpals } = useGlobalState();
  const [isFriend, setIsFriend] = useState<boolean>(false);
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

  const { data, isLoading, error } = useQuery(
    ['getProfile', currentProfileId],
    () => getProfile(currentProfileId as any),
    {
      enabled: true,
      onSuccess: (data) => {
        let { isPenpal } = getPenpalInfo(currentProfileId);
        setIsFriend(userInformation?.id !== currentProfileId && isPenpal);
      },
    }
  );

  const studentProfile = data?.data?.data;
  const location = [
    studentProfile?.profile?.latitude,
    studentProfile?.profile?.longitude,
  ];

  const handleRemove = useMutation((id: number) => deletePenpal(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('MyPenPals');
    },
    onError: (error: any) => {
      console.error('Error:', error);
    },
  });
  const handleClick = () => {
    const { penpal } = getPenpalInfo(studentProfile?.id);

    userInformation?.id === currentProfileId
      ? router.push('/students/settings')
      : isFriend
        ? penpal && handleRemove.mutate(penpal?.id)
        : sendRequest({ receiverId: Number(studentProfile?.id) });
  };

  useEffect(() => {
    let { isPenpal } = getPenpalInfo(currentProfileId);
    setIsFriend(isPenpal);
  }, [myPenpals, currentProfileId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[500px] w-full">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error loading profile</div>;
  }

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
            isLoading: isCreatingPenpal,
            onClick: handleClick,
            buttonText,
            isFriend,
          }}
          profileIcon={studentProfile?.attachment?.file_path}
          mutualFriends={'5 Mutual Friends'}
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

export default PersonalProfilePage;
