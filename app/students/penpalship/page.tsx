'use client';

import React from 'react';
import { PenpalshipStoriesCard } from '@/components/common/StudentsPenpalshipCard1/StudentsPenpalshipCard1';
import { PenpalshipNewilyJoinedCard } from '@/components/common/StudentsPenpalshipCard2/StudentsPenpalshipCard2';
import { Typography } from '@/components/common/Typography/Typography';
import { Info } from 'lucide-react';
import { PenpalshipPublishStoryCard } from '@/components/common/StudentsPenpalshipCard3/StudentsPenpalshipCard3';
import { TabsComponent as Tabs } from '@/components/ui';

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
          tabs={[
            { label: 'PenPal Community', value: '' },
            { label: 'AI Matches', value: '' },
            { label: 'Pal ID Search', value: '' },
            { label: 'My Penpals', value: '' },
          ]}
          tabContent={[]}
          variant="secondary"
        />
      </div>
      <div className="mb-8">
        <Typography variant={'h3'} weight={'bold'} className="mb-4">
          Stories
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <PenpalshipPublishStoryCard
            title={'Publish your story'}
            iconOnClick={() => {
              console.log('upload your image');
            }}
          />
          {[1, 2, 3].map((item, index) => (
            <PenpalshipStoriesCard
              key={index}
              imgPath={'/Emily.png'}
              title={'Emily - 12 - UK'}
              link={'Read more'}
              description={
                'Hi I am Lily, an 8-year-old form United States with a passion for drawing and a heart full love'
              }
            />
          ))}
        </div>
      </div>
      <div>
        <Typography variant={'h3'} weight={'bold'} className="mb-4">
          Newly Joined
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item, index) => (
            <PenpalshipNewilyJoinedCard
              key={index}
              imgPath={'/Emily1.png'}
              title="Moominmadness"
              mutualFriends={'5 mutual friends'}
              buttonOnClick={() => {
                // Implement button functionality here
              }}
              buttonText="Connect"
              description="Even though our cultural backgrounds and lifestyles were completely different..."
              countryFlag={'/country-flags/svg/pk.svg'}
              countryName={'Pakistan'}
              studentAge={'8 years old'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Penpalship;
