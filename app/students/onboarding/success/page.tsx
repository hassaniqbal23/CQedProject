'use client';

import React from 'react';
import TopNavbar from '../../../../components/common/navbar/TopNavbar';
import Progressbar from '../../../../components/common/Progressbar/Progressbar';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Typography } from '@/components/common/Typography/Typography';
import BottomNavbar from '@/components/common/navbar/bottomNavbar';
import { useGlobalState } from '@/app/globalContext/globalContext';

function Success() {
  const router = useRouter();
  const { userInformation } = useGlobalState();
  return (
    <div>
      <div className="flex flex-col max-w-3xl mx-auto mt-8 mb-8">
        <div className="flex items-center justify-center w-full mb-10 mt-14">
          <Image
            src={'/assets/GCEd/GCEdSuccess.svg'}
            alt="thumbsup.png"
            width={200}
            height={200}
          />
        </div>
        <div className="my-8">
          <Progressbar heading="Great Job!" percentage={100} />
        </div>
        <div className="flex flex-col justify-center items-center ">
          <Typography
            variant={'h2'}
            weight={'bold'}
            className="text-primary text-center"
          >
            Congratulations, {userInformation?.name}! Your GCEd journey begins
            here
          </Typography>
          <Typography variant={'h5'} weight={'regular'} className=" mt-3">
            Discover a world of cultures, connect with fellow learners, and
            start your journey of personal growth.
          </Typography>
        </div>
      </div>
      <div className="fixed bottom-0 w-full">
        <BottomNavbar
          onContinue={() => {
            router.push('/students/onboarding/update-password');
          }}
          isBackButton={true}
          onBackButton={() => {
            router.back();
          }}
        />
      </div>
    </div>
  );
}

export default Success;
