import type { Meta, StoryObj } from '@storybook/react';
import { EventCard } from './EventCard';

const meta: Meta<typeof EventCard> = {
  title: 'PenpalShip/EventCard',
  component: EventCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof EventCard>;
export const Dafualt: Story = {
  render: (args) => (
    <div className="">
      <EventCard {...args} />
    </div>
  ),
  args: {
    title: 'Celebrating Hanukkah, The Jewish Festival Of Lights',
    image: '/assets/students/event1.svg',
    link: '#',
  },
};
