import type { Meta, StoryObj } from '@storybook/react';
import { MentionInput } from './MentionInput';

const meta = {
  title: 'Ui/MentionInput',
  component: MentionInput,
  tags: ['autodocs'],
} satisfies Meta<typeof MentionInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return (
      <div>
        <MentionInput {...args}></MentionInput>
      </div>
    );
  },
  args: {
    value: 'Mention Input',
    onChange: () => {},
    mentionSuggestions: [
      {
        id: '1',
        display: 'John Doe',
      },
      {
        id: '2',
        display: 'Jane Doe',
      },
      {
        id: '3',
        display: 'John Smith',
      },
    ],
  },
};
