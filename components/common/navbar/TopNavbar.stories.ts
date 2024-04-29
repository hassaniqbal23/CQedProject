import type { Meta, StoryObj } from "@storybook/react";

import TopNavbar from "./TopNavbar";

const meta: Meta<typeof TopNavbar> = {
  title: "Navigation/TopNavbar",
  component: TopNavbar,
};

export default meta;
type Story = StoryObj<typeof TopNavbar>;

export const Default: Story = {
  args: {
    onClick: () => console.log("Bottom navigation bar"),
  },
};
