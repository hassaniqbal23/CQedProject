import type { Meta, StoryObj } from "@storybook/react";
import DatePickerDemo from "./date-picker";

const meta: Meta<typeof DatePickerDemo> = {
  title: "Forms/DatePicker",
  component: DatePickerDemo,
};

export default meta;
type Story = StoryObj<typeof DatePickerDemo>;

export const DatePicker: Story = {
  args: {},
};

export const DatePickerRange: Story = {
  args: {
    mode: "range",
  },
};
