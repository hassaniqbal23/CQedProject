import type { Meta, StoryObj } from "@storybook/react";

import CountrySelectDropdown from "./countyDropdown";

const meta: Meta<typeof CountrySelectDropdown> = {
  title: "Forms/CountryDropdown",
  component: CountrySelectDropdown,
};

export default meta;
type Story = StoryObj<typeof CountrySelectDropdown>;

export const Default: Story = {
  args: {
    options: [
      {
        name: "Pakistan",
        countryCode: "US",
        flagUrl: "/asserts/flags/pakistanFlagLogo.svg",
      },
      {
        name: "India",
        countryCode: "GB",
        flagUrl: "/asserts/flags/indiaFlagLogo.svg",
      },
      {
        name: "United Kingdom",
        countryCode: "IN",
        flagUrl: "/asserts/flags/UnFlag.svg",
      },
      {
        name: "Sudia Arab",
        countryCode: "CN",
        flagUrl: "/asserts/flags/sudiaFlag.svg",
      },
    ],

    onChange: (country) => console.log("Selected country:", country),
    label: "Select your country",
  },
};
