import type { Meta, StoryObj } from '@storybook/react';

import { Label } from '@/components/ui/label/label';
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
  args: {},
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};
