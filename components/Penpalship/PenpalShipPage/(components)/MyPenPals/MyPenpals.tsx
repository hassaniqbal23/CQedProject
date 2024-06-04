import React, { useState } from 'react';
import { myPenpals } from '@/app/api/penpals';
import { GlobalState, useGlobalState } from '@/app/gobalContext/globalContext';
import { PenpalshipCard } from '@/components/Penpalship';
import SearchBar from '@/components/common/SearchBar';
import { Typography } from '@/components/common/Typography/Typography';
import Pagination from '@/components/common/pagination/pagination';
import Loading from '@/components/ui/button/loading';
import { useQuery } from 'react-query';
import SkeletonCard from '@/components/common/SkeletonCard/SkeletonCard';

export interface MyPenpalsProps {}

export const MyPenpals: React.FC<MyPenpalsProps> = () => {
  const { userInformation } = useGlobalState();
  const [totalCount, setTotalCount] = useState<number>(1);
  const [paginationPenpals, setPaginationPenpals] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10,
  });

  const { page, limit } = paginationPenpals;

  const { data, isLoading, isError } = useQuery(
    ['getMyPenpals'],
    () => myPenpals(),
    {
      enabled: true,
      onSuccess: (res) => {},
      onError(err) {
        console.log(err);
      },
    }
  );

  const penpals = React.useMemo(() => {
    let list = data ? data.data.data || [] : [];
    return list.map((c: any) => {
      return {
        ...c,
        user:
          c.sender.id == userInformation.id
            ? { ...c.receiver, profile: c.receiver.profile[0] }
            : { ...c.sender, profile: c.sender.profile[0] },
      };
    });
  }, [data]);

  return (
    <div>
      <div className="flex py-5 justify-between flex-wrap items-end">
        <Typography variant={'h3'} weight={'semibold'} className="mb-4">
          My Penpals
        </Typography>
        <div className="">
          <SearchBar
            inputClassName="w-full rounded-full"
            setSearchTerm={() => {}}
            placeholder="Search for Penpal"
          ></SearchBar>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {penpals.map((item: any, index: number) => (
          <PenpalshipCard
            key={index}
            imgPath={item?.user?.attachment?.file_path}
            title={item?.user?.fullname || ''}
            mutualFriends={'5 mutual friends'}
            buttonOnClick={() => {
              // @todo implement send message functionality
            }}
            buttonText="Say Hi"
            description={JSON.parse(item?.user?.profile?.meta || '{}').bio}
            countryFlag={'/country-flags/svg/pk.svg'}
            countryName={'Pakistan'}
            studentAge={'8 years old'}
          />
        ))}
      </div>
      {penpals?.length > 0 && !isLoading && (
        <div className="flex justify-end py-5">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalCount / limit)}
            pageSize={limit}
            onPageChange={(value: number) => {
              setPaginationPenpals((prev) => ({
                ...prev,
                page: value,
              }));
            }}
            totalCount={totalCount}
            setPageSize={(pageSize) => console.log(pageSize, 'pagesize')}
          />
        </div>
      )}
      {penpals.length === 0 && isLoading === false ? (
        <div> No suggestions found, Please come back later </div>
      ) : (
        <></>
      )}
      {isLoading ? <SkeletonCard /> : <></>}
    </div>
  );
};
