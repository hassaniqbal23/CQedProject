import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SendEmailModel from './SendEmail'
import { GoArrowLeft } from 'react-icons/go';
import { Button } from '@/components/ui';

const meta = {
    title: 'Ui/SendEmailModel',
    component: SendEmailModel,
    parameters: {
        layout: 'centered',
    },

    tags: ['autodocs'],
} satisfies Meta<typeof SendEmailModel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: (args) => {
        return (
            <div>
                <SendEmailModel {...args} ></SendEmailModel>
            </div>
        );
    },
    args: {
        onSubmit: (data) => console.log(data)
    }
};


