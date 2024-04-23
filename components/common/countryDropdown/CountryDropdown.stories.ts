import type { Meta, StoryObj } from "@storybook/react";

import CountrySelectDropdown from "./CountryDropdown";

const meta: Meta<typeof CountrySelectDropdown> = {
  title: "Forms/CountryDropdown",
  component: CountrySelectDropdown,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],
} satisfies Meta<typeof CountrySelectDropdown>;

export default meta;
type Story = StoryObj<typeof CountrySelectDropdown>;

export const Default: Story = {
  args: {
    options: [
      {
        name: "Pakistan",
        countryCode: "US",
        flagUrl: "/assets/flags/pakistanFlagLogo.svg",
      },
      {
        name: "India",
        countryCode: "GB",
        flagUrl: "/assets/flags/indiaFlagLogo.svg",
      },
      {
        name: "United Kingdom",
        countryCode: "IN",
        flagUrl: "/assets/flags/UnFlag.svg",
      },
      {
        name: "Saudi Arabia",
        countryCode: "CN",
        flagUrl: "/assets/flags/sudiaFlag.svg",
      },
    ],

    onChange: (country) => console.log("Selected country:", country),
    label: "Select your country",
  },
};
