import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { TeacherProfileCard } from './TeacherProfileCard';
import EthanAvatar from '../../../public/EthanAvatar.svg';
import MoominAvatar from '../../../public/MoominAvatar.svg';
import LilyAvatar from '../../../public/LilyAvatar.svg';
const meta: Meta<typeof TeacherProfileCard> = {
  title: 'TeacherProfileCard',
  component: TeacherProfileCard,
};

export default meta;
type Story = StoryObj<typeof TeacherProfileCard>;

export const Default: Story = {
  args: {
    profileImg: MoominAvatar,
    about:
      'Hi I am Ethan, an 8-year-old form United States with a passion for drawing and a heart full love',
    name: 'Ethan',
    buttonText: 'View Profile',
    buttonOnClick: () => {},
  },
};

export const primary: Story = {
  args: {
    profileImg: LilyAvatar,
    about:
      'Hi I am Ethan, an 8-year-old form United States with a passion for drawing and a heart full love',
    name: 'Ethan',
    buttonText: 'View Profile',
    buttonOnClick: () => {},
  },
};

export const secondry: Story = {
  args: {
    profileImg: MoominAvatar,
    about:
      'Hi I am Ethan, an 8-year-old form United States with a passion for drawing and a heart full love',
    name: 'Ethan',
    buttonText: 'View Profile',
    buttonOnClick: () => {},
  },
};

export const standard: Story = {
  args: {
    profileImg: EthanAvatar,
    about:
      'Hi I am Ethan, an 8-year-old form United States with a passion for drawing and a heart full love',
    name: 'Ethan',
    buttonText: 'View Profile',
    buttonOnClick: () => {},
  },
};
