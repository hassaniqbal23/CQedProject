import type { Meta, StoryObj } from '@storybook/react';
import { CreateCommunityForm } from './CreateCommunityForm';

const meta = {
  title: 'Communities/CreateCommunityForm',
  component: CreateCommunityForm,
  parameters: {
    layout: '',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof CreateCommunityForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render(args) {
    return (
      <div>
        <CreateCommunityForm {...args} />
      </div>
    );
  },
  args: {
  },
};
