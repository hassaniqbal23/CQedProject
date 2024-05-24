import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { GroupCard } from '@/components/common/GroupCard/GroupCard';

const meta: Meta<typeof GroupCard> = {
  title: 'UI/GroupCard',
  component: GroupCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof GroupCard>;

export const primary: Story = {
  render: (args) => (
    <div className={'w-[300px]'}>
      <GroupCard
        {...args}
        imageUrl={{
          height: 190,
          width: 298,
          src: "/assets/students/group2.svg'",
        }}
        title="Sharing your culture education"
        label="5k Members"
        description="Welcome to a place from where your sharing and learn about different.."
      />
    </div>
  ),
};

export const secondry: Story = {
  render: (args) => (
    <div className={'w-[300px]'}>
      <GroupCard
        {...args}
        imageUrl={{
          height: 190,
          width: 298,
          src: '/assets/students/group1.svg',
        }}
        title="Sharing your culture education"
        label="5k Members"
        description="Welcome to a place from where your sharing and learn about different.."
      />
    </div>
  ),
};
