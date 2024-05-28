'use client';

import React from 'react';
import { Typography } from '@/components/common/Typography/Typography';
import { Info } from 'lucide-react';
import { TabsComponent as Tabs } from '@/components/ui';
import { PenPalCommunity } from './(components)/penpalCommunity/penPalCommunity';
import { AiMatch } from './(components)/aiMatch/aiMatch';
import { MyPenpals } from './(components)/MyPenPals/MyPenpals';

const Penpalship = () => {
  return (
    <div>
      <div className="flex flex-row items-center mb-4">
        <Typography variant={'h1'} weight={'bold'}>
          Penpalship
        </Typography>
        <Info className="ml-2 text-[#5D5E68] stroke-slate-500" size={26} />
      </div>
      <div className="mt-2 mb-3">
        <Tabs
          defaultValue="penpalCommunity"
          tabs={[
            { label: 'PenPal Community', value: 'penpalCommunity' },
            { label: 'AI Matches', value: 'aiMatches' },
            { label: 'Pal ID Search', value: 'palIDSearch' },
            { label: 'My Penpals', value: 'myPenpals' },
          ]}
          tabContent={[
            {
              value: 'penpalCommunity',
              content: (
                <div className="mt-5">
                  <PenPalCommunity />
                </div>
              ),
            },
            {
              value: 'aiMatches',
              content: (
                <div className="mt-5">
                  <AiMatch />
                </div>
              ),
            },
            {
              value: 'palIDSearch',
              content: <div className="mt-5">Pal ID Search</div>,
            },
            {
              value: 'myPenpals',
              content: <MyPenpals></MyPenpals>,
            },
          ]}
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default Penpalship;
