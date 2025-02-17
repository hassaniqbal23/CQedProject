import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import Modal from './Modal';
import { GoArrowLeft } from 'react-icons/go';
import { Button } from '@/components/ui';

const meta = {
  title: 'Ui/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    return (
      <div>
        <Modal {...args}></Modal>
      </div>
    );
  },
  args: {
    header: true,
    openModalButton: <Button>open</Button>,
    children: 'Model',
  },
};
