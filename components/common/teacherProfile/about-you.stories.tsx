import React from 'react';
import { AboutYou } from './about-you'; // Import the AboutYou component

import type { Meta, StoryObj } from '@storybook/react'; // Import types for Storybook

const meta: Meta<typeof AboutYou> = {
  title: 'Ui/About You',
  component: AboutYou,
};

export default meta;

const Default: StoryObj<typeof AboutYou> = {
  args: {},
};

export const DefaultStory = () => <AboutYou />;
