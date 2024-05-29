import type { Meta, StoryObj } from '@storybook/react';
import { ProfileNotification } from './ProfileNotifaction';
import locationIcon from '../../../public/countries/uk.svg';
const meta: Meta<typeof ProfileNotification> = {
  title: 'AiMatches/ProfileNotification',
  component: ProfileNotification,
};

export default meta;

type Story = StoryObj<typeof ProfileNotification>;

export const ViewNotifcation: Story = {
  args: {
    userImage: '/avatar2.svg',
    notification: 'Hello',
    countryFlag: locationIcon,
    heading: 'We have a match for you',
    username: 'john -2',
    country: 'united states',
    matches: '5/7 interests matched',
    caption: 'Did you know John has read 20 books last year 📖 🙂',
    userBio: `Hi, I am John, a 24-year-old from the United States with a love for
    drawing and a passion for adventure`,
  },
};
