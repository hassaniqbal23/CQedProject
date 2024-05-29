import type { Meta, StoryObj } from '@storybook/react';
import { ActionCard } from './ActionCard';

const meta: Meta<typeof ActionCard> = {
  title: ' PenpalShip/ ActionCard ',
  component: ActionCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ActionCard>;

export const Action: Story = {
  render: (args) => {
    return (
      <div>
        <ActionCard {...args} />
      </div>
    );
  },
  args: {
    title: 'Language Learning',
    description: 'Learn a new language',
    buttonText: 'Take Action',
    icon: '/assets/students/plant1.svg',
    onButtonClick: () => console.log('okay'),
  },
};
