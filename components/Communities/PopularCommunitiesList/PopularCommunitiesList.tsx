import React, { useState } from 'react';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { getCommunities } from '@/app/api/communities';
import { CommunityCard } from '../CommunityCard2/CommunityCard2';
import { Typography } from '@/components/common/Typography/Typography';
import { Separator } from '@/components/ui';
import Pagination from '@/components/common/pagination/pagination';

interface PopularCommunitiesList {
  module?: 'students' | 'teachers';
}

export const PopularCommunitiesList: React.FC<PopularCommunitiesList> = ({
  module = 'students',
}) => {
  const [paginationsCommunities, setPaginationsCommunities] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10,
  });
  const [totalCount, setTotalCount] = useState<number>(1);

  const { page, limit } = paginationsCommunities;

  const { data: communities, isLoading } = useQuery(
    ['communities', page, limit],
    () => getCommunities('', '', page, limit),
    {
      onSuccess: (res) => {
        setTotalCount(res?.totalCount);
      },
    }
  );

  return (
    <div>
      <Typography
        variant="h3"
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
        {isLoading && (
          <>
            {[1, 2, 3, 4, 5].map((item, index) => {
              return (
                <CommunityCard
                  loading={isLoading}
                  description={''}
                  title={''}
                  id={0}
                  members={0}
                  key={index}
                  image={''}
                  module={module}
                />
              );
            })}
          </>
        )}
        {!isLoading &&
          communities?.data &&
          communities?.data.map((item: any, index: number) => (
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
        <div className="flex justify-end py-5">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalCount / limit)}
            pageSize={limit}
            onPageChange={(value: number) => {
              setPaginationsCommunities((prev) => ({
                ...prev,
                page: value,
              }));
            }}
            totalCount={totalCount}
          />
        </div>
      </div>
    </div>
  );
};
