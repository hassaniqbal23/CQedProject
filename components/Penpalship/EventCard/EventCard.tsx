import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { Typography } from '../../common/Typography/Typography';

interface IEventCardProps {
  title: string;
  image: string;
  link: string;
}

export const EventCard: FC<IEventCardProps> = ({ title, image, link }) => {
  return (
    <div className="flex items-center rounded overflow-hidden border-b border-[#D1D1D1] pb-4 pt-4">
      <Image
        className="rounded-xl object-cover"
        src={image}
        alt={title}
        width={136}
        height={103}
      />
      <div className="px-6 ">
        <Typography variant={'h6'} weight={'semibold'} className="mb-2 pr-20">
          {title}
        </Typography>
        <Link
          href={link}
          className="text-[#12121B] hover:text-primary-500 border-[#D1D1D1]  underline"
        >
          Read news article
        </Link>
      </div>
    </div>
  );
};
