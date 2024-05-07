import React from 'react';
import { GreatJob } from './great-job';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof GreatJob> = {
  title: 'Ui/Great Job',
  component: GreatJob,
};

export default meta;

const Default: StoryObj<typeof GreatJob> = {
  args: {},
};

export const DefaultStory = () => <GreatJob />;
