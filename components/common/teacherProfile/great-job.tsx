'use client';
import React from 'react';
import TopNavbar from '../navbar/TopNavbar';
import Progressbar from '../Progressbar/Progressbar';
import Image from 'next/image';

import BottomNavbar from '../navbar/bottomNavbar';
import { useRouter } from 'next/navigation';

export const GreatJob: React.FC = () => {
  const router = useRouter();
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <div className=" p-4 mx-auto ">
        <div className="">
          <div className="mx-auto w-max mt-4">
            <h1 className="text-primary-500 text-3xl font-mono text-center pt-3 mb-2 not-italic font-bold leading-10">
              Great Job!
            </h1>
            <p className="text-2xl">Explore more on how to use CQED</p>
          </div>
        </div>
        <div className="flex justify-center py-20">
          <Image
            src="/assets/profile/congrates.png"
            width={600}
            height={600}
            alt="Great Job"
          />
        </div>
        <div className="fixed bottom-0 w-full z-50 left-0">
          <BottomNavbar
            buttonType="submit"
            buttonLoading={false}
            onContinue={() => router.push('/teachers/dashboard')}
            onBackButton={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </div>
      </div>
    </div>
  );
};
