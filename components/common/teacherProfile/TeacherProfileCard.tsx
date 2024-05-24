import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Typography } from '../Typography/Typography';
interface TeacherProfileCardProps {
  profileImg: string;
  name: string;
  about: string;
  href: string;
  className?: string;
  buttonText: string;
}

const TeacherProfileCard: React.FC<TeacherProfileCardProps> = ({
  profileImg,
  name,
  about,
  href,
  className,
  buttonText,
}) => {
  return (
    <>
      <div className={`bg-[#F7F7F7] p-2 rounded-lg ${className}`}>
        <div className="flex justify-center items-center w-full ">
          <Image
            src={profileImg}
            height={100}
            width={100}
            alt="profile"
            className="w-full rounded-md"
          />
        </div>
        <div>
          <Typography
            variant="h6"
            weight="bold"
            className="mt-2 text-base font-bold text-[#12121B]"
          >
            {name}
          </Typography>
          <Typography
            variant="p"
            weight="medium"
            className="mb-1 mt-1 text-[#282931]"
          >
            {about}
          </Typography>
          <div className="flex justify-center px-0 ">
            <Link
              href={href}
              className="w-full my-2 bg-primary-50 flex justify-center text-primary-500 py-2  rounded-full text-sm font-semibold"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export { TeacherProfileCard };
