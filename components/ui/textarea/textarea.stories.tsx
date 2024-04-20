import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@/components/ui/label/label';
import { Textarea } from '@/components/ui/textarea/textarea';

interface TextareaStoryArgs {
  heading: string;
  title: string;
}

const meta = {
  title: 'Example/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render({ heading, title }: any) {
    return (
      <div className="grid  gap-1.5 ">
        <Label htmlFor="message" className="font-semibold text-lg">
          Write about yourself
        </Label>
        <Textarea
          placeholder="Tell us about you. What makes you smile!"
          id="message"
          className="w-96 p-4 h-32"
        />
      </div>
    );
  },
};
