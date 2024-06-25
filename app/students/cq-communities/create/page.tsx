import CreateCommunityPage from '@/components/Communities/CreateCommunityPage';
import React from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create your Community - GCED',
  description: 'Create your Community - GCED',
};

const CreateCommunity = () => {
  return (
    <div className="bg-white">
      <CreateCommunityPage module="students" />
    </div>
  );
};

export default CreateCommunity;
