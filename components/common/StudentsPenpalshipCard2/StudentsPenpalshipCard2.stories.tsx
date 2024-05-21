import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PenpalshipNewilyJoinedCard } from './StudentsPenpalshipCard2';

const meta: Meta<typeof PenpalshipNewilyJoinedCard> = {
  title: 'UI/PenpalshipNewilyJoinedCard',
  component: PenpalshipNewilyJoinedCard,
};

export default meta;

type Story = StoryObj<typeof PenpalshipNewilyJoinedCard>;

export const NewilyJoinedCard: Story = {
  render: (args) => (
    <div>
      <PenpalshipNewilyJoinedCard
        {...args}
        imgPath={'/Emily1.png'}
        title="Moominmadness"
        buttonText="Connect"
        buttonOnClick={() => {
          console.log('clicked');
        }}
        description="Even though our cultural backgrounds and lifestyles were completely different..."
        mutualFriends="5 mutual friends"
        countryName="Pakistan"
        studentAge="8 years old"
        countryFlag="/country-flags/svg/pk.svg"
      />
    </div>
  ),
};
