import React, { FC } from 'react';

import { YourCommunity } from '@/components/Communities/YourCommunity/YourCommunity';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Your Communities - Teacher - GCED',
  description: 'Your Communities - Teacher - GCED',
};

const YourCommunities: FC = () => {
  return (
    <div>
      <YourCommunity />
    </div>
  );
};
export default YourCommunities;
