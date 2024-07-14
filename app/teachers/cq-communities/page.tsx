import React from 'react';
import CommunitiesPage from '@/components/Communities/CommunitiesPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Communities - Teachers - GCED',
  description: 'Communities - Teachers - GCED',
};

const CQCommunities = () => {
  return (
    <div>
      <CommunitiesPage module="teachers" />
    </div>
  );
};

export default CQCommunities;
