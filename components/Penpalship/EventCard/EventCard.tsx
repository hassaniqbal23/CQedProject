import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react';
import { Typography } from '../../common/Typography/Typography';

interface IEventCardProps {
  title: string;
  image: string;
  link: string;
}

export const EventCard: FC<{ events: IEventCardProps[] }> = ({ events }) => {
  return (
    <div className="grid grid-cols-1">
      {events.map((card: IEventCardProps, index: number) => (
        <div
          key={index}
          className="flex  rounded overflow-hidden   border-b border-[#D1D1D1] pb-4 pt-4"
        >
          <Image
            className="rounded-xl object-cover"
            src={card.image}
            alt={card.title}
            width={136}
            height={103}
          />
          <div className="px-6 py-4 pb-2 flex flex-wrap justify-start">
            <Typography variant={'h6'} weight={'semibold'}>
              {card.title}
            </Typography>
            <Link
              href={card.link}
              className="text-[#12121B] hover:text-primary-500 border-[#D1D1D1] pt-5"
            >
              Read news article
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
