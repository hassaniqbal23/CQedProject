import React, { useState, useMemo, useCallback } from 'react';
import { searchPenpal } from '@/app/api/penpals';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { PenpalshipCard } from '@/components/Penpalship';
import SearchBar from '@/components/common/SearchBar';
import { Typography } from '@/components/common/Typography/Typography';
import Pagination from '@/components/common/pagination/pagination';
import { useQuery } from 'react-query';
import SkeletonCard from '@/components/common/SkeletonCard/SkeletonCard';
import { debounce } from 'lodash';

export const MyPenpals: React.FC = () => {
  const { userInformation, myPenpals, isFetchingMyPenPals } = useGlobalState();
  const [totalCount, setTotalCount] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    {
      page: 1,
      limit: 12,
    }
  );

  const { page, limit } = pagination;

  const searchPenpalsQuery = useQuery(
    ['searchMyPenpal', searchTerm, page, limit],
    () => searchPenpal(searchTerm, page, limit),
    {
      enabled: !!searchTerm,
      onSuccess: (res) => {
        setTotalCount(res?.data?.total_count);
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );

  const penpals = useMemo(() => {
    const list = searchTerm
      ? searchPenpalsQuery.data?.data?.data || []
      : myPenpals || [];
    return list
      .filter((c: any) => c.status !== 'PENDING')
      .map((c: any) => ({
        ...c,
        user:
          c.sender.id === userInformation.id
            ? { ...c.receiver, profile: c.receiver.profile }
            : { ...c.sender, profile: c.sender.profile },
      }));
  }, [myPenpals, searchPenpalsQuery.data, searchTerm, userInformation.id]);

  const handleSearchTermChange = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
      setPagination({ page: 1, limit: 12 });
    }, 400),
    []
  );

  return (
    <div>
      <div className="flex pt-5 justify-between flex-wrap items-end">
        <Typography variant="h2" weight="semibold" className="mb-4 text-[24px]">
          My Global Friends
        </Typography>
        <SearchBar
          inputClassName="w-full rounded-full"
          setSearchTerm={handleSearchTermChange}
          placeholder="Search for Penpal"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {penpals.map((item: any, index: number) => (
          <PenpalshipCard
            key={index}
            id={item?.user?.id}
            imgPath={item?.user?.attachment?.file_path}
            title={item?.user?.profile?.full_name || ''}
            mutualFriends={item?.user?.mutualFriends || 0}
            description={item?.user?.profile?.bio}
            countryName={item?.user?.profile?.country.toUpperCase()}
            studentAge={item?.user?.profile?.age}
            showRemoveButton={item?.status === 'PENDING' ? true : false}
            showIcons={item?.status === 'PENDING' ? false : true}
            penpalId={item?.id}
          />
        ))}
      </div>
      {penpals.length > 0 && !isFetchingMyPenPals && (
        <div className="flex justify-end py-5">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalCount / limit)}
            pageSize={limit}
            onPageChange={(value: number) => {
              setPagination((prev) => ({
                ...prev,
                page: value,
              }));
            }}
            totalCount={totalCount}
          />
        </div>
      )}
      {penpals.length === 0 &&
        !searchPenpalsQuery.isLoading &&
        !isFetchingMyPenPals && (
          <div className="flex justify-center text-center">
            {searchTerm ? 'No penpal found.' : 'No penpals yet.'}
          </div>
        )}
      {(isFetchingMyPenPals || searchPenpalsQuery.isLoading) && (
        <SkeletonCard />
      )}
    </div>
  );
};
