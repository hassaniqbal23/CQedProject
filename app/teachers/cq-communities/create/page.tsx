import CreateCommunityPage from '@/components/Communities/CreateCommunityPage';
import React from 'react';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Create Community - Teacher - GCED',
  description: 'Create Community - Teacher - GCED',
};

const CreateCommunity = () => {
  return (
    <div className="bg-white">
      <CreateCommunityPage module="teachers" />
    </div>
  );
};

export default CreateCommunity;
