import React, { FC } from 'react';
import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage, Button } from '@/components/ui';
import { MessageCircle } from 'lucide-react';
import { Typography } from '@/components/common/Typography/Typography';

interface Iprops {
  userImage: string;
  heading: string;
  countryFlag: string;
  notification: string;
  username: string;
  country: string;
  matches: string;
}
export const ProfileNotification: FC<Iprops> = ({
  userImage,
  notification,
  countryFlag,
  heading,
  username,
  country,
  matches,
}: Iprops) => {
  return (
    <>
      <div className="max-w-fit w-full bg-primary-50 p-4 lg:flex lg:items-center lg:flex-col  sm:flex sm:justify-between sm:items-center gap-8 ">
        <div>
          <div className="">
            <Typography
              className="lg:text-md lg:font-semibold sm:text-sm sm:font-semibold lg:text-center font-montserrat text-base font-semibold whitespace-nowrap text-[14px]"
              variant={'body'}
              weight={'bold'}
            >
              {heading}
            </Typography>

            <Typography
              className="lg:text-2 sm:text-[16px] text-[14px] lg:text-center"
              variant={'body'}
              weight={'regular'}
            >
              {matches}
            </Typography>
          </div>
          <div className="lg:flex lg:items-center lg:flex-col  sm:flex flex justify-between items-center gap-8">
            <div className="relative lg:items-center ">
              <Avatar className="lg:w-[153px] lg:h-[153px] sm:w-[153px] sm:h-[153px]  rounded-full bg-lightgray w-[75.098px] h-[75.098px]">
                <AvatarImage src={userImage} alt="Profile Picture" />
              </Avatar>
              <p className="absolute hidden sm:block  sm:text-primary-500 lg:text-primary-500 sm:font-montserrat lg:font-montserrat sm:text-base lg:text-base sm:font-semibold lg:font-semibold sm:left-32 lg:left sm:bottom-5 lg:bottom-5 sm:z-10 lg:z-10 ">
                {notification}
              </p>
              <Image
                src="/messageIcon.svg"
                alt="Message Icon"
                width={60}
                height={50}
                className=" hidden sm:block object-contain absolute sm:left-28 sm:bottom-2 lg:left-28 lg:bottom-2 "
              />
              <Image
                src="/messageIcon.svg"
                alt="Message Icon"
                width={30}
                height={30}
                className=" lg:hidden sm:hidden object-contain absolute bottom-4 left-14 "
              />
              <p className="absolute lg:hidden sm:hidden text-[8px] bottom-6 left-16 z-10 font-semibold text-primary-500">
                {notification}
              </p>
            </div>

            <div className="lg:flex lg:flex-col lg:items-center lg:justify-center sm:flex sm:flex-col sm:items-start  sm:justify-center  ">
              <h1 className="lg:text-center  text-left text-[18px] font-semibold">
                {username}
              </h1>
              <div className="lg:flex gap-2 lg:items-center lg:justify-center lg:mt-2 flex justify-start items-start">
                <Image
                  src={countryFlag}
                  alt="Country Flag"
                  width={22}
                  height={15}
                  className="object-contain"
                />
                <h1>{country}</h1>
              </div>

              <div>
                <p className="max-w-sm w-full lg:mt-4 lg:items-center lg:text-[14px] sm:text-[14px] text-foreground-secondary font-montserrat text-[12px] font-medium leading-[20.8px] sm:w-full md:w-[640px] lg:w-auto">
                  Hi, I am John, an 8-year-old from the United States with a
                  love for drawing and a passion for adventure.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className=" lg:flex  lg:flex-row lg:gap-4 lg:mt-8  sm:flex sm:flex-col sm:justify-between sm:gap-32 flex justify-center items-center mt-3 gap-4 ">
          <Button size={'sm'} className="bg-primary-500 ">
            <MessageCircle /> Say Hello
          </Button>
          <Button
            size={'sm'}
            className="text-primary-500 bg-white border border-primary-500"
          >
            View Profile
          </Button>
        </div>
      </div>
    </>
  );
};
