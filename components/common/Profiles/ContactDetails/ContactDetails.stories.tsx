import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ProfileContactDetails } from './ContactDetails';
import { Mail, MapPin, Phone } from 'lucide-react';

const meta = {
  title: 'Profiles/ProfileContactDetails',
  component: ProfileContactDetails,
  parameters: {},

  tags: ['autodocs'],
} satisfies Meta<typeof ProfileContactDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileContactDetailsComponents: Story = {
  render: (args) => {
    return <ProfileContactDetails {...args} />;
  },
  args: {
    title: 'Contact Details',
    details: [
      {
        title: 'Email',
        content: 'leonardcampbell@gmail.com',
        icon: Mail,
      },
      {
        title: 'Phone',
        content: '03000000000',
        icon: Phone,
      },
      {
        title: 'Skype',
        content: '@leonardcamp',
        icon: MapPin,
      },
      {
        title: 'Address',
        content: '225 cherry street #24, New york,NY',
        icon: MapPin,
      },
    ],
  },
};
