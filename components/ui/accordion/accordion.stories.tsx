import type { Meta, StoryObj } from '@storybook/react';
import { AccordionDemo } from './accordion';

const meta: Meta<typeof AccordionDemo> = {
  title: 'Ui/Accordian',
  component: AccordionDemo,
};
export default meta;
type Story = StoryObj<typeof AccordionDemo>;

export const Default: Story = {
  render: (args) => {
    return <AccordionDemo {...args} />;
  },
  args: {
    TriggerTitle: 'Is it accessible?',
    AccordionTitle: ' Yes. It adheres to the WAI-ARIA design pattern.',
  },
};
