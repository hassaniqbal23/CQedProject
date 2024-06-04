import React, { useState, useMemo, useCallback } from 'react';
import { deletePenpal, myPenpals, searchPenpal } from '@/app/api/penpals';
import { GlobalState, useGlobalState } from '@/app/gobalContext/globalContext';
import { PenpalshipCard } from '@/components/Penpalship';
import SearchBar from '@/components/common/SearchBar';
import { Typography } from '@/components/common/Typography/Typography';
import Pagination from '@/components/common/pagination/pagination';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import SkeletonCard from '@/components/common/SkeletonCard/SkeletonCard';
import { debounce } from 'lodash';

export interface MyPenpalsProps {}

export const MyPenpals: React.FC<MyPenpalsProps> = () => {
  const queryClient = useQueryClient();
  const { userInformation } = useGlobalState();
  const [totalCount, setTotalCount] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [paginationPenpals, setPaginationPenpals] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10,
  });

  const { page, limit } = paginationPenpals;

  const { mutate: handleRemove, isLoading: isDeletingConversation } =
    useMutation((id: number) => deletePenpal(id), {
      onSuccess: () => {
        queryClient.refetchQueries('getMyPenpals');
        queryClient.refetchQueries('MyPenPals');
        queryClient.refetchQueries('searchMyPenpal');
      },
      onError: (error: any) => {
        console.log(error, 'Error =====> log');
      },
    });

  const {
    data: penpalData,
    isLoading,
    isError,
  } = useQuery(['getMyPenpals', page, limit], () => myPenpals(page, limit), {
    enabled: !searchTerm,
    onSuccess: (res) => {
      setTotalCount(res?.data?.total_count);
    },
    onError(err) {
      console.log(err);
    },
  });
  const { data: searchedPenpal, isLoading: searchPenpalLoading } = useQuery(
    ['searchMyPenpal', searchTerm, page, limit],
    () => searchPenpal(searchTerm, page, limit),
    {
      enabled: !!searchTerm,
      onSuccess: (res) => {
        setTotalCount(res?.data?.total_count);
      },
      onError(err) {
        console.log(err);
      },
    }
  );
  const penpals = useMemo(() => {
    let list = searchTerm
      ? searchedPenpal?.data?.data || []
      : penpalData?.data?.data || [];
    return list?.map((c: any) => {
      return {
        ...c,
        user:
          c?.sender?.id == userInformation.id
            ? { ...c?.receiver, profile: c?.receiver?.profile?.[0] }
            : { ...c?.sender, profile: c?.sender?.profile?.[0] },
      };
    });
  }, [penpalData, searchedPenpal, searchTerm, userInformation.id]);

  const handleSearchTermChange = useCallback(
    debounce((term) => {
      setSearchTerm(term);
      setPaginationPenpals({ page: 1, limit: 10 });
    }, 400),
    []
  );
  return (
    <div>
      <div className="flex py-5 justify-between flex-wrap items-end">
        <Typography variant={'h3'} weight={'semibold'} className="mb-4">
          My Penpals
        </Typography>
        <div className="">
          <SearchBar
            inputClassName="w-full rounded-full"
            setSearchTerm={(term) => {
              handleSearchTermChange(term);
            }}
            placeholder="Search for Penpal"
          ></SearchBar>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {penpals.map((item: any, index: number) => (
          <PenpalshipCard
            key={index}
            imgPath={item?.user?.attachment?.file_path}
            title={item?.user?.profile?.fullname || ''}
            mutualFriends={'5 mutual friends'}
            buttonOnClick={() => {
              handleRemove(item?.id);
            }}
            buttonText="Remove"
            description={JSON.parse(item?.user?.profile?.meta || '{}').bio}
            countryFlag={`/country-flags/svg/${item?.user?.profile?.country.toLowerCase()}.svg`}
            countryName={item?.user?.profile?.country.toUpperCase()}
            studentAge={item?.user?.profile?.age}
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
      {penpals.length === 0 && searchPenpalLoading === false ? (
        <div> No penpals yet.</div>
      ) : (
        <></>
      )}
      {isLoading || searchPenpalLoading ? <SkeletonCard /> : <></>}
    </div>
  );
};
