import type { Meta, StoryObj } from '@storybook/react';
import { UniversityIntegrationPage } from './UniIntegrationPage';

const meta: Meta<typeof UniversityIntegrationPage> = {
  title: 'Universitysetting/UniversityIntegrationPage',
  component: UniversityIntegrationPage,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof UniversityIntegrationPage>;

export const Default: Story = {
  render: (args) => {
    return <UniversityIntegrationPage {...args} />;
  },
  args: {
    buttonClick: () => {},
  },
};
