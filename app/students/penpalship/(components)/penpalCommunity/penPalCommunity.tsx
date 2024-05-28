import {
  PenpalshipNewilyJoinedCard,
  PenpalshipPublishStoryCard,
  PenpalshipStoriesCard,
} from '@/components/Penpalship';
import { Typography } from '@/components/common/Typography/Typography';
import React from 'react';

export const PenPalCommunity = () => {
  return (
    <>
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
    </>
  );
};
