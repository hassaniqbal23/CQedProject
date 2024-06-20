import type { Meta, StoryObj } from '@storybook/react';
import { UniversitySettingPage } from './UniSettingPage';
import ar from 'date-fns/locale/ar';

const meta: Meta<typeof UniversitySettingPage> = {
  title: 'Universitysetting/UniversitySettingPage',
  component: UniversitySettingPage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof UniversitySettingPage>;

export const Default: Story = {
  render: (args) => {
    return <UniversitySettingPage {...args} />;
  },
  args: {
    buttonClick: () => {},
  },
};
