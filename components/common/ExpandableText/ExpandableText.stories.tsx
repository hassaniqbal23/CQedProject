import type { Meta, StoryObj } from '@storybook/react';
import { ExpandableText } from './ExpandableText';
const meta = {
  title: 'Common/ExpandableText',
  component: ExpandableText,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof ExpandableText>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis voluptatem tenetur aut, mollitia, obcaecati, similique eveniet error rem iste quis deleniti recusandae maxime velit quisquam. Atque iste itaque quibusdam optio.',
    maxLength: 24,
  },
};
