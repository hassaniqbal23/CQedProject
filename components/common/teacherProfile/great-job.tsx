'use client';
import React from 'react';
import Image from 'next/image';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { useModule } from '@/components/ModuleProvider/ModuleProvider';

export const GreatJob: React.FC = () => {
  const router = useRouter();
  const { module } = useModule();
  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <div className=" p-4 mx-auto ">
        <div className="">
          <div className="mx-auto w-max mt-4">
            <h1 className="text-primary-500 text-3xl font-mono text-center pt-3 mb-2 not-italic font-bold leading-10">
              Welcome to GCEd! Let's Get Started
            </h1>
            <p className="text-xl text-center">
              Watch this quick video to learn how to use GCEd
            </p>
          </div>
        </div>
        <div className="flex justify-center pt-10 pb-14">
          <Image
            src="/assets/profile/congrates.png"
            width={600}
            height={600}
            alt="Great Job"
          />
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
            variant="secondary"
            className="px-7 py-2 rounded-[14px] text-xl text-[#4146B8]"
            loading={false}
            onClick={() => router.push(`/${module}/dashboard`)}
          >
            Continue To Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
