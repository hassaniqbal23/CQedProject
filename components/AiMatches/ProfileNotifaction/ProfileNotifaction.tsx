import React, { FC } from 'react';
import Image from 'next/image';
import { Avatar, AvatarImage, Button } from '@/components/ui';
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
  caption?: string;
  userBio?: string;
  screen?: 'mobile' | 'tablet' | 'desktop';
}

export const ProfileNotification: FC<Iprops> = ({
  userImage,
  notification,
  countryFlag,
  heading,
  username,
  country,
  matches,
  caption,
  userBio,
  screen = 'desktop',
}: Iprops) => {
  return (
    <>
      {screen === 'mobile' && (
        <div className="bg-primary-50  p-4 pb-3 rounded-xl mt-3">
          <div className="flex justify-between">
            <div className="">
              <Typography variant={'h4'} weight={'semibold'}>
                {heading}
              </Typography>
              <Typography className="py-1" variant={'h6'} weight={'medium'}>
                {matches}
              </Typography>
            </div>
          </div>
          <div className="max-w-fit w-full bg-primary-50 lg:flex lg:items-center lg:flex-col sm:flex sm:items-center  ">
            <div className="">
              <div className="lg:flex lg:items-center lg:flex-col sm:flex flex justify-between items-center sm:gap-6 gap-5">
                <div className="relative lg:items-center">
                  <Avatar className="lg:w-[153px] lg:h-[153px] sm:w-[153px] sm:h-[153px] rounded-full bg-lightgray w-[75.098px] h-[75.098px]">
                    <AvatarImage
                      src={userImage}
                      alt="Profile Picture"
                      className="object-cover"
                    />
                  </Avatar>
                  <Typography
                    variant={'body'}
                    weight={'bold'}
                    className="absolute hidden sm:block sm:text-primary-500 lg:text-primary-500 sm:font-montserrat lg:font-montserrat sm:text-base lg:text-base sm:font-semibold lg:font-semibold sm:left-32 lg:left sm:bottom-5 lg:bottom-5 sm:z-10 lg:z-10"
                  >
                    {notification}
                  </Typography>

                  <Image
                    src="/messageIcon.svg"
                    alt="Message Icon"
                    width={60}
                    height={50}
                    className="hidden sm:block object-contain absolute sm:left-28 sm:bottom-2 lg:left-28 lg:bottom-2"
                  />
                  <Image
                    src="/messageIcon.svg"
                    alt="Message Icon"
                    width={30}
                    height={30}
                    className="lg:hidden sm:hidden object-contain absolute bottom-4 left-14"
                  />

                  <p className="absolute lg:hidden sm:hidden text-[8px] bottom-[22px] left-[60px] z-10 font-semibold text-primary-500">
                    {notification}
                  </p>
                </div>
                <div className="lg:flex lg:flex-col lg:items-center lg:justify-center sm:flex sm:flex-col sm:items-start sm:justify-center">
                  <h1 className="lg:text-center text-left text-[18px] font-semibold">
                    {username}
                  </h1>
                  <div className="lg:flex gap-2 sm:items-center  lg:items-center lg:justify-center lg:mt-2 flex justify-start items-center">
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
                    <Typography
                      variant={'body'}
                      weight={'regular'}
                      className="text-left mt-1 text-balance"
                    >
                      {userBio}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4 mb-1">
            <Button size={'sm'} className="bg-primary-500 text-white">
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
      )}
      {screen === 'tablet' && (
        <div className="bg-primary-50 py-6 p-4 pb-3 rounded-xl mt-4">
          <div className="flex justify-between">
            <div className="">
              <Typography variant={'h4'} weight={'semibold'}>
                {heading}
              </Typography>
              <Typography className="py-2" variant={'h6'} weight={'medium'}>
                {matches}
              </Typography>
            </div>
            <div className="">
              <Button size={'sm'} className="bg-primary-500">
                <MessageCircle /> Say Hello
              </Button>
            </div>
          </div>
          <div className="max-w-fit w-full bg-primary-50 lg:flex lg:items-center lg:flex-col sm:flex sm:items-center gap-8 ">
            <div className="">
              <div className="lg:flex lg:items-center lg:flex-col sm:flex flex justify-between items-center gap-8">
                <div className="relative lg:items-center">
                  <Avatar className="lg:w-[153px] lg:h-[153px] sm:w-[153px] sm:h-[153px] rounded-full bg-lightgray w-[75.098px] h-[75.098px]">
                    <AvatarImage
                      src={userImage}
                      alt="Profile Picture"
                      className="object-cover"
                    />
                  </Avatar>
                  <p className="absolute hidden sm:block sm:text-primary-500 lg:text-primary-500 sm:font-montserrat lg:font-montserrat sm:text-base lg:text-base sm:font-semibold lg:font-semibold sm:left-[120px] lg:left sm:bottom-5 lg:bottom-5 sm:z-10 lg:z-10">
                    {notification}
                  </p>
                  <Image
                    src="/messageIcon.svg"
                    alt="Message Icon"
                    width={60}
                    height={50}
                    className="hidden sm:block object-contain absolute sm:left-28 sm:bottom-2 lg:left-28 lg:bottom-2"
                  />
                  <Image
                    src="/messageIcon.svg"
                    alt="Message Icon"
                    width={30}
                    height={30}
                    className="lg:hidden sm:hidden object-contain absolute bottom-4 left-14"
                  />
                  <p className="absolute lg:hidden sm:hidden text-[8px] bottom-6 left-16 z-10 font-semibold text-primary-500">
                    {notification}
                  </p>
                </div>
                <div className="lg:flex lg:flex-col lg:items-center lg:justify-center sm:flex sm:flex-col sm:items-start sm:justify-center">
                  <h1 className="lg:text-center text-left text-[18px] font-semibold">
                    {username}
                  </h1>
                  <div className="lg:flex gap-2 sm:items-center  lg:items-center lg:justify-center lg:mt-2 flex justify-start items-start ">
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
                    <Typography
                      variant={'body'}
                      weight={'regular'}
                      className="text-left mt-3 text-balance  sm:text-balance"
                    >
                      {userBio}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button
              size={'sm'}
              className="text-primary-500 bg-white border border-primary-500 md:mb-3 sm:mb-3"
            >
              View Profile
            </Button>
          </div>
        </div>
      )}
      {screen === 'desktop' && (
        <div className="max-w-fit w-full bg-primary-50 p-4  pt-16   lg:flex lg:items-center lg:flex-col sm:flex sm:justify-between sm:items-center gap-8 rounded-xl">
          <div>
            <div className="">
              <Typography
                className=" lg:font-semibold  sm:font-semibold lg:text-center font-montserrat font-semibold whitespace-nowrap text-[14px]"
                variant={'h3'}
                weight={'bold'}
              >
                {heading}
              </Typography>
              <Typography
                className="text-center"
                variant={'h5'}
                weight={'semibold'}
              >
                {matches}
              </Typography>
            </div>
            <div className="lg:flex lg:items-center lg:flex-col sm:flex flex justify-between items-center gap-8">
              <div className="relative lg:items-center mt-4">
                <Avatar className="lg:w-[153px] lg:h-[153px] sm:w-[153px] sm:h-[153px] rounded-full bg-lightgray w-[75.098px] h-[75.098px]">
                  <AvatarImage
                    src={userImage}
                    alt="Profile Picture"
                    className="object-cover"
                  />
                </Avatar>
                <Typography
                  variant={'body'}
                  weight={'bold'}
                  className="absolute hidden sm:block sm:text-primary-500 lg:text-primary-500 sm:font-montserrat lg:font-montserrat sm:text-base lg:text-base sm:font-semibold lg:font-semibold sm:left-[120px] lg:left sm:bottom-5 lg:bottom-5 sm:z-10 lg:z-10"
                >
                  {notification}
                </Typography>

                <Image
                  src="/messageIcon.svg"
                  alt="Message Icon"
                  width={60}
                  height={50}
                  className="hidden sm:block object-contain absolute sm:left-28 sm:bottom-2 lg:left-28 lg:bottom-2"
                />
                <Image
                  src="/messageIcon.svg"
                  alt="Message Icon"
                  width={30}
                  height={30}
                  className="lg:hidden sm:hidden object-contain absolute bottom-4 left-14"
                />
                <p className="absolute lg:hidden sm:hidden text-[8px] bottom-6 left-16 z-10 font-semibold text-primary-500">
                  {notification}
                </p>
              </div>
              <div className="lg:flex lg:flex-col lg:items-center lg:justify-center sm:flex sm:flex-col sm:items-start sm:justify-center">
                <Typography
                  variant={'h4'}
                  weight={'semibold'}
                  className="lg:text-center text-left  "
                >
                  {username}
                </Typography>

                <div className="lg:flex gap-2 lg:items-center lg:justify-center lg:mt-2 flex justify-start items-start">
                  <Image
                    src={countryFlag}
                    alt="Country Flag"
                    width={22}
                    height={15}
                    className="object-contain"
                  />
                  <Typography variant={'h5'} weight={'regular'}>
                    {country}
                  </Typography>
                </div>
                <div>
                  <Typography
                    variant={'body'}
                    weight={'regular'}
                    className="text-center mt-4 text-balance"
                  >
                    {userBio}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex lg:flex-row lg:gap-4 lg:mt-8 sm:flex sm:flex-col sm:justify-between sm:gap-32 flex justify-center items-center  gap-4 ">
            <Button size={'md'} className="bg-primary-500">
              <MessageCircle /> Say Hello
            </Button>
            <Button
              size={'md'}
              className="text-primary-500 bg-white border border-primary-500"
            >
              View Profile
            </Button>
          </div>
          <div className="bg-[#c5c7e3] p-3 w-3/4 rounded-xl text-center mt-40 mb-3">
            <Typography variant={'body'} weight={'semibold'}>
              {caption}
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};
