import type { Meta, StoryObj } from '@storybook/react';

import StudentProfile from './StudentProfile';
import { TabsComponent } from '@/components/ui';
const meta: Meta<typeof StudentProfile> = {
  title: 'UI/Student/StudentProfile',
  component: StudentProfile,
} satisfies Meta<typeof StudentProfile>;

export default meta;
type Story = StoryObj<typeof StudentProfile>;

export const primary: Story = {};
