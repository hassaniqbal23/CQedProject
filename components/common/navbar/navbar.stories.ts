import type { Meta, StoryObj } from "@storybook/react";

import navbar from "./navbar";

const meta: Meta<typeof navbar> = {
  title: "navbar",
  component: navbar,
};

export default meta;
type Story = StoryObj<typeof navbar>;

export const Default: Story = {
  args: {},
};
