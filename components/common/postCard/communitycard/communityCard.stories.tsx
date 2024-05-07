import type { Meta, StoryObj } from '@storybook/react';

import CommunityCard from './communityCard';

const meta: Meta<typeof CommunityCard> = {
  title: 'UI/CommunityCard',
  component: CommunityCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommunityCard>;

export const communityCard: Story = {
  render: (args) => (
    <div>
      <CommunityCard {...args} />
    </div>
  ),

  args: {
    totalMembers: 100,
    totalDiscussions: 150000,
    imageSrc: '/assets/profile/profile.svg',
    title: 'Volunteering around',
  },
};
