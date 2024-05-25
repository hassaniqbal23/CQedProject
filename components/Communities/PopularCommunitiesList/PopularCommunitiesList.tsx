import { CommunityCard } from '../CommunityCard2/CommunityCard2';
import { Typography } from '@/components/common/Typography/Typography';
import Image from 'next/image';
import React from 'react';

export const PopularCommunitiesList = () => {
  return (
    <div>
      <Typography
        variant="h4"
        weight="semibold"
        className="flex gap-3 items-end"
      >
        <Image
          src={'/yellowChart.svg'}
          alt="chart"
          className="w-10 h-10"
          width={25}
          height={25}
        />{' '}
        Popular Groups
      </Typography>

      <div className="mt-5">
        {[1, 2, 3].map((item, index) => (
          <CommunityCard
            description="This is a community description"
            title="Community"
            id={item}
            members={1000}
            key={index}
            image="avatar2.svg"
            onJoinClick={() => {
              console.log('Join Clicked');
            }}
          />
        ))}
      </div>
    </div>
  );
};
