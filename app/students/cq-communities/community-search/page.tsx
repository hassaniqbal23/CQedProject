'use client';

import React, { useState, useEffect } from 'react';
import { SearchFilter } from '@/components/common/From/SearchFilter';
import { useSearchParams } from 'next/navigation';
import { getCommunities, getCommunityTypes } from '@/app/api/communities';
import { useQuery } from 'react-query';
import { useRouter } from 'next/navigation';

const CommunitySearch = () => {
  const router = useRouter();
  const params = useSearchParams();
  const [value, setValue] = useState<string | null>(null);

  const {
    data,
    isLoading,
    refetch: search,
  } = useQuery(['search_communities', value], () => getCommunities(value));

  const {
    data: community_types_data,
    isLoading: community_types_isLoading,
    refetch: fetchCommunityTypes,
  } = useQuery(['search_community_types', value], () =>
    getCommunityTypes(value)
  );

  useEffect(() => {
    if (params && params.get('q')) {
      setValue(params.get('q'));
    }
  }, [params]);

  useEffect(() => {
    if (value !== null) {
      search();
      fetchCommunityTypes();
    }
  }, [value, search]);

  const communities = data?.data || [];
  const community_types = community_types_data?.data || [];

  return (
    <div>
      <SearchFilter
        title="Search results for communities"
        buttonText="Back"
        onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue((e.target as HTMLInputElement).value);
        }}
        onSearchClick={(e: React.KeyboardEvent<HTMLInputElement>) => {}}
        results={communities}
        resultTypes={community_types}
        totalCount={data?.totalCount || 0}
        onRequestBack={() => {
          router.push('/students/cq-communities');
        }}
      />
    </div>
  );
};

export default CommunitySearch;
