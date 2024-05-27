import React, { useState, useEffect, Suspense } from 'react';
import { SearchFilter } from '../../common/From/SearchFilter';
import {
  getCommunities,
  getCommunityTypes,
} from '../../../app/api/communities';
import { useQuery } from 'react-query';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const CommunitySearchPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState<{
    q: string | null;
    community_type: string | null;
  }>({
    q: null,
    community_type: null,
  });

  const {
    data,
    isLoading,
    refetch: search,
  } = useQuery(
    ['search_communities', filters.q],
    () => getCommunities(filters.q, filters.community_type),
    {
      enabled: false,
    }
  );

  const searchCommunities = () => {
    const url = new URL(window.location.href);
    if (filters.q) {
      url.searchParams.set('q', filters.q || '');
    } else {
      url.searchParams.delete('q');
    }
    if (filters.community_type) {
      url.searchParams.set('community_type', filters.community_type || '');
    } else {
      url.searchParams.delete('community_type');
    }
    router.push(url.toString());
    search();
  };

  const {
    data: community_types_data,
    isLoading: community_types_isLoading,
    refetch: fetchCommunityTypes,
  } = useQuery(['search_community_types', filters], () =>
    getCommunityTypes(filters.q)
  );

  useEffect(() => {
    if (filters) {
      searchCommunities();
      fetchCommunityTypes();
    }
  }, [filters, search]);

  useEffect(() => {
    if (filters.community_type !== null) {
      searchCommunities();
    }
  }, [filters.community_type]);

  const communities = data?.data || [];
  const community_types = community_types_data?.data || [];

  return (
    <Suspense>
      <SearchFilter
        title="Search results for communities"
        buttonText="Back"
        onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFilters({ ...filters, q: e.target.value });
        }}
        onSearchClick={(e: React.KeyboardEvent<HTMLInputElement>) => {}}
        results={communities}
        resultTypes={community_types}
        totalCount={data?.totalCount || 0}
        onRequestBack={() => {
          router.push(
            pathname?.replace(`community-search?q=${filters.q}`, '') || ''
          );
        }}
        onCategoryChange={(e: number) => {
          setFilters({ ...filters, community_type: e.toString() });
        }}
        onFiltersChange={(filters) => {
          setFilters(filters);
        }}
      />
    </Suspense>
  );
};

export default CommunitySearchPage;
