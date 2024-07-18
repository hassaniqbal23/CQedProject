import React from 'react';
import CommunitiesPage from '@/components/Communities/CommunitiesPage';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Communities - Students - GCED',
  description: 'Communities - Students - GCED',
  icons: '/favi.png',
};

const CQCommunities = () => {
  return (
    <div>
      <CommunitiesPage module="students" />
    </div>
  );
};

export default CQCommunities;
