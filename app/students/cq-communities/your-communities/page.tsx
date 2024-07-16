import React, { FC } from 'react';

import { YourCommunity } from '@/components/Communities/YourCommunity/YourCommunity';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Your Communities - Students - GCED',
  description: 'Your Communities - Students - GCED',
};

const YourCommunities: FC = () => {
  return (
    <div>
      <YourCommunity />
    </div>
  );
};
export default YourCommunities;
