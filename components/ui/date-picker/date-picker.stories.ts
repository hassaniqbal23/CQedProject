import type { Meta, StoryObj } from "@storybook/react";

import { DatePickerDemo } from "@/components/ui/date-picker/date-picker";

const meta: Meta<typeof DatePickerDemo> = {
  title: "Forms/DatePicker",
  component: DatePickerDemo,
};

export default meta;
type Story = StoryObj<typeof DatePickerDemo>;

export const calendar: Story = {
  args: {
    label: "BirthDay",
    variant: "calendar",
  },
};
