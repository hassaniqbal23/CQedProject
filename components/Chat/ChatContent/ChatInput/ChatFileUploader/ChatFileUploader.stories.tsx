import React from 'react'
import type { Meta, StoryObj } from '@storybook/react';
import { ChatFileUploader } from './ChatFileUploader';

const meta: Meta<typeof ChatFileUploader> = {
    title: 'Chat/ChatFileUploader',
    component: ChatFileUploader,
};

export default meta;

type Story = StoryObj<typeof ChatFileUploader>;

export const chatDafualt: Story = {
    args: {
        files: [],
        onFileSelect(data) {
            console.log(data)
        },
    }
};
