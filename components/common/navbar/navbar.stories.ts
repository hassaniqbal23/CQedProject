import type { Meta, StoryObj } from "@storybook/react";

import Navbar from "./navbar";

const meta: Meta<typeof navbar> = {
  title: "Navbar",
  component: Navbar,
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {},
};

export const bottom: Story = {
  args: {
    variant: "BOTTOM",
    onClick: () => console.log("Bottom navigation bar"),
  },
};

export const TopBar: Story = {
  args: {
    variant: "TOP",
    onClick: () => alert("open top bar"),
  },
};
