import CreateCommunityPage from '@/components/Communities/CreateCommunityPage';
import React from 'react';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Create Community - Student - GCED',
  description: 'Create Community - Student - GCED',
  icons: '/favi.png',
};

const CreateCommunity = () => {
  return (
    <div className="bg-white">
      <CreateCommunityPage module="students" />
    </div>
  );
};

export default CreateCommunity;
