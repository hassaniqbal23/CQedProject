'use client';

import React from 'react';
import Progressbar from '../Progressbar/Progressbar';
import BottomNavbar from '../navbar/bottomNavbar';
import ChipSelector from '../../ui/ChipSelect/ChipSelector';
import { useRouter } from 'next/navigation';

function StudentsQualities() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col max-w-3xl mx-auto mt-8 mb-8 h-[calc(100vh_-_30px)] lg:h-[calc(100vh_-_224px)] ">
        <div className="my-8">
          <Progressbar heading="You are almost there." percentage={75} />
        </div>
        <div className="flex flex-col justify-center items-center mb-4">
          <h1 className="text-primary font-bold text-2xl text-center ">
            What are your hobbies? What are you interested in?
          </h1>
          <h3 className="font-semibold text-[#a3adbc] text-[17px] text-center ">
            We match you with peers based on common interests.
          </h3>
        </div>
        <div className="flex items-center w-2/3 mx-auto">
          <ChipSelector
            rounded
            multiSelect
            options={[
              {
                label: 'Gardening',
                value: 'Gardening',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
              {
                label: 'Adventure',
                value: 'Adventure',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
              {
                label: 'Fitness',
                value: 'Fitness',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
              {
                label: 'Music',
                value: 'Music',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
              {
                label: 'Nature',
                value: 'Nature',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
              {
                label: 'Dancing',
                value: 'Dancing',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
              {
                label: 'Beauty',
                value: 'Beauty',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
              {
                label: 'Drawing',
                value: 'Drawing',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
              {
                label: 'Handicraft',
                value: 'Handicraft',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
              {
                label: 'Sports',
                value: 'Sports',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
              {
                label: 'Writing',
                value: 'Writing',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
              {
                label: 'Books',
                value: 'Books',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
              {
                label: 'Culture',
                value: 'Culture',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
              {
                label: 'Cooking',
                value: 'Cooking',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
              {
                label: 'Movies',
                value: 'Movies',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
              {
                label: 'Computers',
                value: 'Computers',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
              {
                label: 'Others - Tell us what.',
                value: 'Others',
                render: (data: any) => <div className="p-1">{data.label}</div>,
              },
            ]}
          />
        </div>
      </div>
      <BottomNavbar
        isBackButton={false}
        onContinue={() => {
          // onSubmit(form.getValues())
          router.push('/students/onboarding/update-password');
        }}
      ></BottomNavbar>
    </>
  );
}

export default StudentsQualities;
