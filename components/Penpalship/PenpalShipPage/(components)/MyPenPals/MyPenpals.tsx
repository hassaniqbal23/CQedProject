import React, { useState, useMemo, useCallback } from 'react';
import { deletePenpal, myPenpals, searchPenpal } from '@/app/api/penpals';
import { useGlobalState } from '@/app/globalContext/globalContext';
import { PenpalshipCard } from '@/components/Penpalship';
import SearchBar from '@/components/common/SearchBar';
import { Typography } from '@/components/common/Typography/Typography';
import Pagination from '@/components/common/pagination/pagination';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import SkeletonCard from '@/components/common/SkeletonCard/SkeletonCard';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';

export const MyPenpals: React.FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { userInformation } = useGlobalState();
  const [totalCount, setTotalCount] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    {
      page: 1,
      limit: 12,
    }
  );

  const { page, limit } = pagination;

  const handleRemove = useMutation((id: number) => deletePenpal(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('getMyPenpals');
      queryClient.invalidateQueries('searchMyPenpal');
    },
    onError: (error: any) => {
      console.error('Error:', error);
    },
  });

  const penpalsQuery = useQuery(
    ['getMyPenpals', page, limit],
    () => myPenpals(page, limit),
    {
      enabled: !searchTerm,
      onSuccess: (res) => {
        setTotalCount(res?.data?.total_count);
      },
      onError: (err) => {
        console.error(err);
      },
    }
  );

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
      : penpalsQuery.data?.data?.data || [];
    return list.map((c: any) => ({
      ...c,
      user:
        c.sender.id === userInformation.id
          ? { ...c.receiver, profile: c.receiver.profile?.[0] }
          : { ...c.sender, profile: c.sender.profile?.[0] },
    }));
  }, [
    penpalsQuery.data,
    searchPenpalsQuery.data,
    searchTerm,
    userInformation.id,
  ]);

  const handleSearchTermChange = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
      setPagination({ page: 1, limit: 10 });
    }, 400),
    []
  );

  const handleChatClick = () => {
    // console.log('chat click');
    router.push(`/students/chats`);
  };

  // const handleUserClick = (userId: string) => {
  //   console.log(`${userId} clicked`);
  //   router.push(`/students/profile/${userId}`);
  // };

  return (
    <div>
      <div className="flex py-5 justify-between flex-wrap items-end">
        <Typography variant="h2" weight="semibold" className="mb-4">
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
            imgPath={item?.user?.attachment?.file_path}
            title={item?.user?.profile?.fullname || ''}
            mutualFriends="5 mutual friends"
            buttonOnClick={() => handleRemove.mutate(item?.id)}
            buttonText="Remove"
            description={JSON.parse(item?.user?.profile?.meta || '{}').bio}
            countryFlag={`/country-flags/svg/${item?.user?.profile?.country.toLowerCase()}.svg`}
            countryName={item?.user?.profile?.country.toUpperCase()}
            studentAge={item?.user?.profile?.age}
            onChatClick={() => handleChatClick()}
            // onUserClick={() => handleUserClick(item.user.id)}
            showRemoveButton={false}
            showIcons={true}
          />
        ))}
      </div>
      {penpals.length > 0 && !penpalsQuery.isLoading && (
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
      {penpals.length === 0 && !searchPenpalsQuery.isLoading && (
        <div>No penpals yet.</div>
      )}
      {(penpalsQuery.isLoading || searchPenpalsQuery.isLoading) && (
        <SkeletonCard />
      )}
    </div>
  );
};
