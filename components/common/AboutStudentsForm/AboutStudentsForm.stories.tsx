import React from 'react';
import AboutStudentsForm from './index';

import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof AboutStudentsForm> = {
  title: 'Forms/About Students Form',
  component: AboutStudentsForm,
};

export default meta;

const Default: StoryObj<typeof AboutStudentsForm> = {
  args: {},
};

export const DefaultStory = () => <AboutStudentsForm />;
