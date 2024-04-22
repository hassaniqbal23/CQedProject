import type { Meta, StoryObj } from '@storybook/react';
import SendEmailModal from './SendEmailModal'

const meta = {
    title: 'UI/Modal',
    component: SendEmailModal,
    parameters: {
        layout: 'centered',
    },

    tags: ['autodocs'],
} satisfies Meta<typeof SendEmailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InviteSchoolModal: Story = {
    render: (args) => {
        return (
            <div>
                <SendEmailModal {...args} ></SendEmailModal>
            </div>
        );
    },
    args: {
        onSubmit: (data) => console.log(data)
    }
};


