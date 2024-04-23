import type { Meta, StoryObj } from "@storybook/react";

import BottomNavbar from "./bottomNavbar";

const meta: Meta<typeof BottomNavbar> = {
  title: "Navbar/BottomNavbar",
  component: BottomNavbar,
};

export default meta;
type Story = StoryObj<typeof BottomNavbar>;

export const Default: Story = {
  args: {
    isBackButton: true,
    onBackButton: () => {
      console.log("Back button")
    },
    onContinue: () => {
      console.log("Continue button")
    }
  },
};
