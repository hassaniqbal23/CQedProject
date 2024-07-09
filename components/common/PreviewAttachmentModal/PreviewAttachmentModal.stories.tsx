import type { Meta, StoryObj } from '@storybook/react';
import { PreviewAttachmentModal } from './PreviewAttachmentModal';

const meta = {
  title: 'Ui/PreviewAttachmentModal',
  component: PreviewAttachmentModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PreviewAttachmentModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CreatePost: Story = {
  render(args) {
    return (
      <div>
        <PreviewAttachmentModal {...args} />
      </div>
    );
  },
  args: {
    buttonTrigger: 'Preview Attachments',
    attachment: {
      upload_type: 'image',
      file_path: '/path/to/image',
    },
  },
};
