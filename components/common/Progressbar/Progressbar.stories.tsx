import type { Meta, StoryObj } from '@storybook/react';
import Progressbar from './Progressbar'

const meta = {
    title: 'Ui/Progressbar',
    component: Progressbar,
    parameters: {
        layout: 'centered',
    },

    tags: ['autodocs'],
} satisfies Meta<typeof Progressbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    render: (args) => {
        return (
            <div className='w-[600px]' >
                <Progressbar {...args} />
            </div>
        );
    },
    args: {
        heading: 'start', percentage: 20
    }
};


