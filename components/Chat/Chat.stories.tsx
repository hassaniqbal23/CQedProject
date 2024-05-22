import type { Meta, StoryObj } from '@storybook/react';
import { Chat } from './Chat';

const meta: Meta<typeof Chat> = {
  title: 'Chat/Chat',
  component: Chat,
};

export default meta;

type Story = StoryObj<typeof Chat>;

export const chatDafualt: Story = {};
