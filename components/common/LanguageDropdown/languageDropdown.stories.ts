import type { Meta, StoryObj } from "@storybook/react";

import { DropdownMenuDemo } from "@/components/common/LanguageDropdown/LanguageDropdown";

const meta: Meta<typeof DropdownMenuDemo> = {
  title: "Forms/Dropdown",
  component: DropdownMenuDemo,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenuDemo>;

export default meta;
type Story = StoryObj<typeof DropdownMenuDemo>;

export const Default: Story = {
  args: {
    options: [
      {
        label: "Pakistan",
        value: "en",
        flagUrl: "/asserts/flags/pakistanFlagLogo.svg",
        altName: "pak",
      },
      {
        label: "Hindi",
        value: "fr",
        flagUrl: "/asserts/flags/indiaFlagLogo.svg",
        altName: "HN",
      },
      {
        label: "English(Uk)",
        value: "es",
        flagUrl: "/asserts/flags/UnFlag.svg",
        altName: "UK",
      },
      {
        label: "English(US)",
        value: "es",
        flagUrl: "/asserts/flags/sudiaFlag.svg",
        altName: "US",
      },
    ],
  },
};
