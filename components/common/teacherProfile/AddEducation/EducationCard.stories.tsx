import type { Meta, StoryObj } from '@storybook/react';
import EducationCard from './EducationCard';

const meta: Meta<typeof EducationCard> = {
  title: 'Teachers/EducationCard',
  component: EducationCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EducationCard>;

export const Default: Story = {
  render: (args) => (
    <div>
      <EducationCard {...args} />
    </div>
  ),

  args: {
    educationLevel: "Master's",
    fieldOfStudy: 'Cosmology',
    country: 'United Kingdom',
    institution: 'Harvard University',
    imageUrl: '/graduate.svg',
    startDate: 'dec 2019',
    endDate: 'oct-2024',
  },
};
