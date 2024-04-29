import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Forms/checkBox",
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "checkbox",
    // checked: false,
    // disabled: false,
    onChange: () => {},
  },
};
export const error: Story = {
  args: {
    label: "checkbox",
    onChange: () => {},
    error: "",
  },
};

export const disabled: Story = {
  args: {
    label: "checkbox",

    disabled: true,
    onChange: () => {},
  },
};
