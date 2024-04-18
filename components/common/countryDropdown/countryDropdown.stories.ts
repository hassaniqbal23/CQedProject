import type { Meta, StoryObj } from "@storybook/react";

import countyDropdown from "./countyDropdown";

const meta: Meta<typeof countyDropdown> = {
  title: "Forms/countyDropdown",
  component: countyDropdown,
};

export default meta;
type Story = StoryObj<typeof countyDropdown>;

export const DatePicker: Story = {
  args: {},
};

export const DatePickerRange: Story = {
  args: {
    mode: "range",
  },
};
