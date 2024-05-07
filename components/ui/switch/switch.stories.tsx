import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from '@/components/ui/switch/switch';

// Define the meta information for the component
const meta: Meta<typeof Switch> = {
  title: 'Ui/Switch',
  component: Switch,
  parameters: {
    // Consider using a centered layout for better visualization
    layout: 'centered',
  },
};

export default meta;

// Define a type alias for the story object
type Story = StoryObj<typeof Switch>;

// Create the story
export const Default: Story = {
  render: (args) => {
    return (
      <>
        <Switch {...args} />
      </>
    );
  },
  args: {
    title: 'Airplane-mode',
  },
};
