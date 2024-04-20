import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./checkbox";
const meta: Meta<typeof Checkbox> = {
  title: "Che/checkBox",
  component: Checkbox,
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {},
};
