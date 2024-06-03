import React, { useState, useEffect, Suspense } from 'react';
import { SearchFilter } from '../../common/From/SearchFilter';
import {
  getCommunities,
  getCommunityTypes,
} from '../../../app/api/communities';
import { useQuery } from 'react-query';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Pagination from '@/components/common/pagination/pagination';

interface CommunitySearchPageProps {
  module: 'students' | 'teachers';
}

const CommunitySearchPage: React.FC<CommunitySearchPageProps> = (props) => {
  const router = useRouter();
  const pathname = usePathname();
  const [paginationsCommunities, setPaginationsCommunities] = useState<{
    page: number;
    limit: number;
  }>({
    page: 1,
    limit: 10,
  });
  const { page, limit } = paginationsCommunities;
  const [totalCount, setTotalCount] = useState<number>(1);

  const [filters, setFilters] = useState<{
    q: string | null;
    community_type: string | null;
  }>({
    q: null,
    community_type: null,
  });

  const {
    data: communitiesList,
    isLoading,
    refetch: search,
  } = useQuery(
    ['search_communities', filters.q, filters.community_type, page, limit],
    () => getCommunities(filters.q, filters.community_type, page, limit),

    {
      onSuccess: (res) => {
        setTotalCount(res?.totalCount);
      },
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

  const communities = communitiesList?.data || [];
  const community_types = community_types_data?.data || [];

  return (
    <Suspense>
      <SearchFilter
        title={`Search results for ${filters.q || 'communities'}`}
        buttonText="Back"
        onInputChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFilters({ ...filters, q: e.target.value });
        }}
        onSearchClick={(e: React.KeyboardEvent<HTMLInputElement>) => {}}
        results={communities}
        resultTypes={community_types}
        totalCount={communitiesList?.totalCount || 0}
        onRequestBack={() => {
          router.push(`/${props.module}/cq-communities`);
        }}
        onCategoryChange={(e: number) => {
          if (e == -1) {
            setFilters({ ...filters, community_type: null });
          } else {
            setFilters({ ...filters, community_type: e.toString() });
          }
        }}
        onFiltersChange={(filters) => {
          setFilters(filters);
        }}
      />
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
    </Suspense>
  );
};

export default CommunitySearchPage;
