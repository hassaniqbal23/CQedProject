import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "@/components/ui/input/input";

const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Full Name",
    isIcon: false,
  },
};


export const Error: Story = {
  args: {
    label: "Full Name",
    isIcon: false,
  },
};


export const Disabled: Story = {
  args: {
    label: "Full Name",
    isIcon: false,
  },
};



export const Loading: Story = {
  args: {
    label: "Full Name",
    isIcon: false,
  },
};

