import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PenpalshipCard } from './PenpalshipCard';

const meta: Meta<typeof PenpalshipCard> = {
  title: 'Penpalship/PenpalshipCard',
  component: PenpalshipCard,
};

export default meta;

type Story = StoryObj<typeof PenpalshipCard>;

export const NewilyJoinedCard: Story = {
  render: (args) => (
    <div>
      <PenpalshipCard
        {...args}
        imgPath={'/Emily1.png'}
        title="Moominmadness"
        description="Even though our cultural backgrounds and lifestyles were completely different..."
        mutualFriends={0}
        countryName="Pakistan"
        studentAge="8 years old"
      />
    </div>
  ),
};
