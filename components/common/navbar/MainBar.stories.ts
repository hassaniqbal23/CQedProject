import type { Meta, StoryObj } from "@storybook/react";

import Navbar from "./MainBar";

const meta: Meta<typeof Navbar> = {
  title: "Navbar/MainBar",
  component: Navbar,
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  args: {
    // onClick: () => console.log("Bottom navigation bar"),
  },
};
