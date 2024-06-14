import type { Meta, StoryObj } from '@storybook/react';
import { UserProfileMatch } from './UserProfileMatch';
import locationIcon from '../../../public/countries/uk.svg';

const meta: Meta<typeof UserProfileMatch> = {
  title: 'AiMatches/UserProfileMatch',
  component: UserProfileMatch,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof UserProfileMatch>;

export const ViewNotification: Story = {
  args: {
    user: {
      id: '123',
      attachment: { file_path: '/John.jpeg' },
      fullname: 'John Doe',
      country: 'United States',
      countryFlag: locationIcon,
      state: 'California',
    },
  },
};
