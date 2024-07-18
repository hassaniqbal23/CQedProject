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
    title: `Showing results for ${searchParams.q} - Students - GCED`,
    description: `Showing results for ${searchParams.q} - Students - GCED`,
    icons: '/favi.png',
  };
}

const CommunitySearch = () => {
  return (
    <div>
      <CommunitySearchPage module="students" />
    </div>
  );
};

export default CommunitySearch;
