import React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { ChatEmojiPicker } from './ChatEmojiPicker';

const meta: Meta<typeof ChatEmojiPicker> = {
    title: 'Chat/ChatEmojiPicker',
    component: ChatEmojiPicker,
};

export default meta;

type Story = StoryObj<typeof ChatEmojiPicker>;

export const chatDafualt: Story = {
    args: {
        button: <div>Click</div>,
        open: true,
        onPickEmoji(emoji) {
            console.log(emoji)
        },
    }
};
