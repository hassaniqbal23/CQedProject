import React from 'react';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { getCommunities } from '@/app/api/communities';
import { CommunityCard } from '../CommunityCard2/CommunityCard2';
import { Typography } from '@/components/common/Typography/Typography';
import Loading from '@/components/ui/button/loading';
import { Separator } from '@/components/ui';

interface PopularCommunitiesList {
  module?: 'students' | 'teachers';
}

export const PopularCommunitiesList: React.FC<PopularCommunitiesList> = ({
  module = 'students',
}) => {
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
        />
        Popular Communities
      </Typography>
      <Separator className="mt-5"></Separator>

      <div className="mt-2">
        {isLoading ? (
          <div className="w-full h-[500px] flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            {!isLoading &&
              data?.data &&
              data?.data?.map((item: any, index: number) => (
                <CommunityCard
                  loading={isLoading}
                  description={item.description}
                  title={item.name}
                  id={item.id}
                  members={item._count.CommunityUsers}
                  key={index}
                  image={item?.profile_picture.file_path}
                  module={module}
                />
              ))}
          </>
        )}
      </div>
    </div>
  );
};
