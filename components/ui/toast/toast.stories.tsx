import type { Meta, StoryObj as StoryType } from '@storybook/react';
import { Button } from '../button/button';
import { useToast } from '../use-toast/use-toast';
import { Toast } from './toast';

import { Toaster } from '../toaster/toaster';

// Define props interface for the Description component
interface DescriptionProps {
  title?: string;
  description?: string;
  variant?: string;
}

// Define a generic version of StoryObj
type GenericStory<Args> = StoryType<Args>;

const meta: Meta<typeof Toast> = {
  title: 'Ui/Toast',
  component: Toast,
  tags: ['autodocs'],
};

export default meta;

// Define a type alias for the story object
type Story = GenericStory<DescriptionProps>;

export const Description: Story = (args: any) => {
  const { title, description } = args;
  const { toast } = useToast();

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Default Title',
            description: 'Default Description',
          });
        }}
      >
        Show Toast
      </Button>
      <Toaster />
    </>
  );
};

Description.args = {
  title: 'Uh oh! Something went wrong.',
  description: 'There was a problem with your request.',
  variant: 'success', // Corrected spelling of 'variant'
};
