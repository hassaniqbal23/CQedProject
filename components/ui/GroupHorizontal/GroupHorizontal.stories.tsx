import react from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import GroupHorizontal from '@/components/ui/GroupHorizontal/GroupHorizontal';
import culture from '@/public/culture.svg';
import handArt from '@/public/handArt.svg';
import animalRescue from '@/public/animalRescue.svg';
const meta: Meta<typeof GroupHorizontal> = {
  title: 'Ui/GroupHorizontal',
  component: GroupHorizontal,
};

export default meta;
type Story = StoryObj<typeof GroupHorizontal>;

export const Default: Story = {
  render: (args) => (
    <GroupHorizontal
      {...args}
      title="Sharing our cultures."
      image={culture}
      label="5k Members"
      description="Welcome to a place from where your sharing and learn about different cultures from all over the world. "
      buttonOnClick={() => {
        console.log('clicked');
      }}
    />
  ),
};

export const primary: Story = {
  render: (args) => (
    <GroupHorizontal
      {...args}
      title="Animal Rescue Groups."
      image={animalRescue}
      label="5k Members"
      description="Welcome to a place from where your sharing and learn about different cultures from all over the world. "
      buttonOnClick={() => {
        console.log('clicked');
      }}
    />
  ),
};

export const secondry: Story = {
  render: (args) => (
    <GroupHorizontal
      {...args}
      title="Hand Art ."
      image={handArt}
      label="5k Members"
      description="Welcome to a place from where your sharing and learn about different cultures from all over the world. "
      buttonOnClick={() => {
        console.log('clicked');
      }}
    />
  ),
};
