import type { Meta, StoryObj } from '@storybook/react';
import { EmailInput } from './TagInput';
import { useState } from 'react';

const meta = {
  title: 'Forms/EmailInput',
  component: EmailInput,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof EmailInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmailInputComponent: Story = {
  render: (args) => {
    const [initialEmails, setInitialEmails] = useState<string[]>([]);
    return (
      <EmailInput
        initialValue={initialEmails}
        maxEmails={5}
        onChange={(value: string[]) => {
          setInitialEmails(value);
        }}
        placeholder="Enter your emails"
      />
    );
  },
  args: {},
};
