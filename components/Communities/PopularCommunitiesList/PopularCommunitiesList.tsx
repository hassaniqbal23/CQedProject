import React from 'react';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { getCommunities } from '@/app/api/communities';
import { CommunityCard } from '../CommunityCard2/CommunityCard2';
import { Typography } from '@/components/common/Typography/Typography';
import Loading from '@/components/ui/button/loading';

export const PopularCommunitiesList = () => {
  const { data, isLoading } = useQuery('communities', () => getCommunities());
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
        {isLoading ? (
          <div className="w-full h-[500px] flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            {data.data.map((item: any, index: number) => (
              <CommunityCard
                description="This is a community description"
                title={item.name}
                id={item.id}
                members={1000}
                key={index}
                image="/avatar2.svg"
                onJoinClick={() => {
                  console.log('Join Clicked');
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
