'use client';

import React, { useMemo } from 'react';
import { Card, TabsComponent } from '@/components/ui';
import {
  ProfileHeader,
  ProfileAbout,
  ProfileInterests,
  WishCountries,
  Gallery,
} from '@/components/common/Profiles';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { startConversation } from '@/app/api/chat';
import { getStudentProfile } from '@/app/api/students';
import Loading from '../ui/button/loading';
import dynamic from 'next/dynamic';

let details: string =
  " Meet John, a spirited 12-year-old with a contagious enthusiasm for life. His bright blue eyes sparkle with curiosity, and his perpetually messy hair reflects the adventures he embarks on each day. Jake's world is filled with a kaleidoscope of interests, from building intricate LEGO masterpieces to exploring the fascinating realms of video games. With a backpack full of dreams and a heart full of laughter, Jake navigates the maze of adolescence with an infectious";

const PersonalProfilePage = () => {
  const params = useParams();
  const router = useRouter();
  let studentProfile = [] as any;
  // const {
  //   data: studentProfile,
  //   isLoading,
  //   error,
  // } = useQuery(['getStudentProfile', params?.id], () =>
  //   getStudentProfile(params?.id as any)
  // );

  // const { mutate } = useMutation(
  //   ['startConversation'],
  //   (params: { id: number | string }) => startConversation(params.id),
  //   {
  //     onSuccess(data) {
  //       router.push('/teachers/chats');
  //     },
  //   }
  // );

  if (false) {
    return (
      <div className="flex items-center justify-center h-[500px] w-full">
        <Loading />
      </div>
    );
  }

  if (false) {
    return <div>Error loading profile</div>;
  }
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/ui/MapComponent/Map'), {
        loading: () => <p>Loading Map</p>,
        ssr: false,
      }),
    []
  );

  const tabContents = [
    {
      value: 'about',
      content: (
        <div className="space-y-4 mt-4">
          <Card>
            <ProfileAbout
              title="About"
              className="border-0 shadow-0"
              details={details}
            />
            <ProfileAbout
              title="About my culture"
              className="border-0 shadow-0"
              details={details}
            />
            <WishCountries
              className="border-0 shadow-0"
              title="Countries I wish to visit"
              countriesList={[
                { flag: '/country-flags/svg/us.svg', countryCode: 'US' },
                { flag: '/country-flags/svg/ca.svg', countryCode: 'CA' },
              ]}
            />
          </Card>
          <ProfileInterests
            title="Interests"
            interests={[
              { title: 'Nature', img: '' },
              { title: 'Dancing', img: '' },
              { title: 'Culture', img: '' },
              { title: 'Pets', img: '' },
              { title: 'Food', img: '' },
              { title: 'Movies', img: '' },
              { title: 'Cooking', img: '' },
              { title: 'Dancing', img: '' },
              { title: 'Nature', img: '' },
            ]}
          />
          <Card>
            <ProfileAbout
              title="About your culture, city, country and food"
              className="border-0 shadow-0"
              details={details}
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
          name={'Test Name'}
          age={'14'}
          gender={'Male'}
          imageSize={{ width: 100, height: 100 }}
          country="PK"
          titleClass="text-3xl"
          profileId={'896372'}
          buttonProps={{
            isVisbile: true,
            onClick: () => {
              // mutate({ id: params?.id as any });
            },
            buttonText: 'Add Friend',
          }}
          profileIcon="/assets/profile/teacherprofile.svg"
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
          <Map />
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
