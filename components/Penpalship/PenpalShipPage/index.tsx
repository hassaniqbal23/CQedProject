import React from 'react';
import { Typography } from '@/components/common/Typography/Typography';
import { Info } from 'lucide-react';
import { TabsComponent as Tabs } from '@/components/ui';
import {
  AiMatch,
  MyPenpals,
  PalSearchId,
  PenPalCommunity,
} from './(components)';

const PenpalshipPage = () => {
  return (
    <div>
      <div className="flex flex-row items-center mb-4">
        <Typography variant={'h2'} weight={'bold'}>
          Global Friends
        </Typography>
        <Info className="ml-2 text-[#5D5E68] stroke-slate-500" size={26} />
      </div>
      <div className="mt-2 mb-3">
        <Tabs
          defaultValue="GlobalCommunity"
          tabs={[
            { label: 'Global Community', value: 'GlobalCommunity' },
            { label: 'AI Matches', value: 'aiMatches' },
            { label: 'Pal ID Search', value: 'palIDSearch' },
            { label: 'My Global Friends', value: 'MyGlobalFriends' },
          ]}
          tabContent={[
            {
              value: 'GlobalCommunity',
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
              content: (
                <div className="mt-5">
                  <PalSearchId />
                </div>
              ),
            },
            {
              value: 'MyGlobalFriends',
              content: <MyPenpals />,
            },
          ]}
          variant="secondary"
        />
      </div>
    </div>
  );
};

export default PenpalshipPage;
