'use client';

import React from 'react';
import CommunitySearchPage from '@/components/Communities/CommunitySearchPage';
import { Card } from '@/components/ui';

const CommunitySearch = () => {
  return (
    <Card className="px-10 py-5">
      <CommunitySearchPage module="students" />
    </Card>
  );
};

export default CommunitySearch;
