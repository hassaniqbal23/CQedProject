import { LoginCarousel } from './carousel';
import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI/Carousel',
  component: LoginCarousel,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} as Meta<typeof LoginCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Login: Story = {
  render: (args) => {
    return (
      <>
        <LoginCarousel carouselItems={args.carouselItems} />
      </>
    );
  },
  args: {
    carouselItems: [
      {
        title: 'Join the Future',
        description: 'Shaping Global Citizens Through Cultural Intelligence',
        imgPath: '/assets/images/slider1.jpeg',
      },
      {
        title: 'Join the Future',
        description: 'Shaping Global Citizens Through Cultural Intelligence',
        imgPath: '/assets/images/slider2.jpeg',
      },
      {
        title: 'Join the Future',
        description: 'Shaping Global Citizens Through Cultural Intelligence',
        imgPath: '/assets/images/slider3.jpeg',
      },
    ],
  },
};
