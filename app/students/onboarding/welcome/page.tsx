'use client'

import React from 'react'
import TopNavbar from "../../../../components/common/navbar/TopNavbar";
import Progressbar from '../../../../components/common/Progressbar/Progressbar'
import { Button } from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';


function Welcome() {
  return (
    <div>
      <TopNavbar
        onLogout={() => {
        }}></TopNavbar>
      <div className='flex flex-col max-w-3xl mx-auto mt-8 mb-8' >
        <div className='flex items-center justify-center w-full mb-10' >
          <Image src={'/thumbsup.png'} alt='thumbsup.png' width={400} height={400} />
        </div>
        <div className="my-8">
          <Progressbar heading="Great Job!" percentage={100} />
        </div  >
        <div className="flex flex-col justify-center items-center mb-4">
          <h1 className="text-primary text-center font-bold text-4xl">
            Well done! Your dashboard is ready for you. Welcome to the CQ journey.
          </h1>
          <h3 className="font-semibold text-center text-[#a3adbc] text-2xl ">
            Your future is in your hands. Enjoy this opportunity
          </h3>
          <div className='mt-10' >
            <Button variant={'secondary'} className='rounded-lg shadow-lg' >
              <Link href={'/students/dashboard'} className='text-primary font-bold' >
                Continue To Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
