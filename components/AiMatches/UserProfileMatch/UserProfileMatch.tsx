import React, { FC } from 'react';
import Image from 'next/image';
import { Avatar, AvatarImage, Button } from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';
import countriesData from '@/public/countries/countries.json';
import useSendPenpalRequest from '@/lib/useSendPenpalRequest';
interface Countries {
  [key: string]: string;
}

interface Iprops {
  user: {
    user?: any;
    id: string;
    attachment: { file_path: string };
    full_name: string;
    age: number;
    country: string;
    countryFlag: string;
    state: string;
  };
  buttonText?: string;
  interestsMatched?: string;
  screenType?: string;
  onButtonClick?: () => void;
  onViewProfile?: () => void;
}

const countries: Countries = countriesData;

export const UserProfileMatch: FC<Iprops> = ({
  user,
  onButtonClick,
  onViewProfile,
  buttonText,
  interestsMatched,
  screenType,
}: Iprops) => {
  const { isCreatingPenpal, isDeletingPenpal } = useSendPenpalRequest();

  const { full_name, country } = user;
  const countryFlag = `/country-flags/svg/${user.country.toLowerCase()}.svg`;
  const notification = 'Hello';
  const userImage = user.user.attachment.file_path;
  const heading = 'We have a match for you.';
  const userBio = `Hi, I am ${user.full_name}, a ${user.age}-year-old from ${user.state} with a love for drawing and a passion for adventure`;
  const caption = `Did you know ${user.full_name} has read 20 books last year 📖 🙂`;

  console.log(buttonText, 'buttonTextbuttonTextbuttonText');
  return (
    <>
      {screenType === 'mobile' && (
        <div className="bg-primary-50  p-4 pb-3 rounded-xl mt-3">
          <div className="flex justify-between">
            <div className="">
              <Typography variant={'h4'} weight={'semibold'}>
                {heading}
              </Typography>
              <Typography className="py-1" variant={'h6'} weight={'medium'}>
                {interestsMatched}
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
                    {full_name}
                  </h1>
                  <div className="lg:flex gap-2 sm:items-center  lg:items-center lg:justify-center lg:mt-2 flex justify-start items-center">
                    <Image
                      src={countryFlag}
                      alt="Country Flag"
                      width={22}
                      height={15}
                      className="object-contain"
                    />
                    <h1>{countries[country] || 'Unknown Country'}</h1>
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
            <Button
              size={'md'}
              loading={isDeletingPenpal || isCreatingPenpal}
              className={
                buttonText ? 'bg-red-100 text-red-600' : 'bg-primary-500'
              }
              onClick={onButtonClick}
            >
              {buttonText ? 'Remove' : 'Connect'}
            </Button>
            <Button
              size={'sm'}
              className="text-primary-500 bg-white border hover:bg-primary-50 border-primary-500"
              onClick={onViewProfile}
            >
              View Profile
            </Button>
          </div>
        </div>
      )}
      {screenType === 'tablet' && (
        <div className="bg-primary-50 py-6 p-4 pb-3 rounded-xl mt-4">
          <div className="flex justify-between">
            <div className="">
              <Typography variant={'h4'} weight={'semibold'}>
                {heading}
              </Typography>
              <Typography className="py-2" variant={'h6'} weight={'medium'}>
                {interestsMatched}
              </Typography>
            </div>
            <div className="">
              <Button
                size={'md'}
                loading={isDeletingPenpal || isCreatingPenpal}
                className={
                  buttonText ? 'bg-red-100 text-red-600' : 'bg-primary-500'
                }
                onClick={onButtonClick}
              >
                {buttonText ? 'Remove' : 'Connect'}
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
                    {full_name}
                  </h1>
                  <div className="lg:flex gap-2 sm:items-center  lg:items-center lg:justify-center lg:mt-2 flex justify-start items-start ">
                    <Image
                      src={countryFlag}
                      alt="Country Flag"
                      width={22}
                      height={15}
                      className="object-contain"
                    />
                    <h1>{countries[country] || 'Unknown Country'}</h1>
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
              className="text-primary-500 bg-white border border-primary-500 hover:bg-primary-50 md:mb-3 sm:mb-3"
              onClick={onViewProfile}
            >
              View Profile
            </Button>
          </div>
        </div>
      )}
      {screenType === 'desktop' && (
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
                {interestsMatched}
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
                  {full_name}
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
                    {countries[country] || 'Unknown Country'}
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
            <Button
              size={'md'}
              loading={isDeletingPenpal || isCreatingPenpal}
              className={
                buttonText ? 'bg-red-100 text-red-600' : 'bg-primary-500'
              }
              onClick={onButtonClick}
            >
              {buttonText ? 'Remove' : 'Connect'}
            </Button>
            <Button
              size={'md'}
              className="text-primary-500 bg-white border border-primary-500 hover:bg-primary-50"
              onClick={onViewProfile}
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
