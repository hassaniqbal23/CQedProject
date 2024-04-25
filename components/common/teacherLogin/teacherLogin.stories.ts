import type { Meta, StoryObj } from "@storybook/react";

import TeacherProfile from "./teacherLogin";

const meta: Meta<typeof TeacherProfile> = {
  title: "TeacherProfile",
  component: TeacherProfile,
};

export default meta;
type Story = StoryObj<typeof TeacherProfile>;

export const Default: Story = {
  args: {
    labal: "country",
  },
};
