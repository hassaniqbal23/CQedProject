import type { Meta, StoryObj } from "@storybook/react";

import Input from "./input";
const meta: Meta<typeof Input> = {
  title: "Forms/Input",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Full Name",
  },
};

export const Error: Story = {
  args: {
    label: "Email",
    error: "Please enter a valid email address.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disable",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: "loding",
    loading: true,
  },
};

export const Inputpassword: Story = {
  args: {
    label: "input password",
    loading: true,
  },
};
