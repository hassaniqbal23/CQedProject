'use client';

import React from 'react';
import TopNavbar from '../../../../components/common/navbar/TopNavbar';
import Progressbar from '../../../../components/common/Progressbar/Progressbar';
import { Button } from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '@/components/common/Typography/Typography';

function Success() {
  return (
    <div>
      <TopNavbar onLogout={() => {}}></TopNavbar>
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
          <Typography variant={'h2'} weight={'bold'} className="text-primary">
            Well done! Your dashboard is ready for you.
          </Typography>
          <Typography variant={'h2'} weight={'bold'} className="text-primary">
            Welcome to the GCE journey.
          </Typography>
          <Typography variant={'h5'} weight={'regular'} className=" mt-3">
            Your future is in your hands. Enjoy this opportunity
          </Typography>
          <h3 className="font-semibold text-center text-[#a3adbc] text-2xl "></h3>
          <div className="mt-10">
            <Button variant={'secondary'} className="rounded-lg shadow-lg px-4">
              <Link
                href={'/students/dashboard'}
                className="text-primary font-bold"
              >
                Continue To Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
