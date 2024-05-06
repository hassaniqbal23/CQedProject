import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '@/components/ui/button/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip/tooltip';

// Define the meta information for the component
const meta: Meta<typeof TooltipContent> = {
  title: 'Ui/TooltipDemo',
  component: TooltipContent,
  parameters: {
    // Consider using a centered layout for better visualization
    layout: 'centered',
  },
};

export default meta;

// Define a type alias for the story object
type Story = StoryObj<typeof TooltipContent>;

// Create the story
export const Default: Story = {
  args: {},
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
