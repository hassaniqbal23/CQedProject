import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Model from './Model'
import { GoArrowLeft } from 'react-icons/go';
import { Button } from '@/components/ui';

const meta = {
    title: 'Ui/Model',
    component: Model,
    parameters: {
        layout: 'centered',
    },

    tags: ['autodocs'],
} satisfies Meta<typeof Model>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: () => {
        return (
            <div>
                <Model openModelButton={<Button> open</Button>}>Model</Model>
            </div>
        );
    },
    args : {}
};


