import type { Meta, StoryObj } from "@storybook/react";

import { DropdownMenuDemo } from "@/components/common/LanguageDropdown/LanguageDropdown";

const meta: Meta<typeof DropdownMenuDemo> = {
  title: "Inputs/DropdownMenuDemo",
  component: DropdownMenuDemo,
};

export default meta;
type Story = StoryObj<typeof DropdownMenuDemo>;

export const Default: Story = {
  args: {},
};
