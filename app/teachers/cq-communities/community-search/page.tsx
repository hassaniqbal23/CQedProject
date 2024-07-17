import React from 'react';
import CommunitySearchPage from '@/components/Communities/CommunitySearchPage';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) {
  return {
    title: `Showing results for ${searchParams.q} - Teachers - GCED`,
    description: `Showing results for ${searchParams.q} - Teachers - GCED`,
  };
}

const CommunitySearch = () => {
  return (
    <div>
      <CommunitySearchPage module="teachers" />
    </div>
  );
};

export default CommunitySearch;
