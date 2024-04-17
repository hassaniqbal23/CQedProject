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

export const bottom: Story = {
  args: {
    variant: "Bottom navigation bar",
    onClick: () => console.log("Bottom navigation bar"),
  },
};

export const TopBar: Story = {
  args: {
    variant: "Top bar",
    onClick: () => alert("open top bar"),
  },
};
