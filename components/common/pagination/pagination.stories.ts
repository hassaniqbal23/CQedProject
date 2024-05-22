import type { Meta, StoryObj } from '@storybook/react';

import Pagination from './pagination';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    currentPage: 1,
    pageSize: 10,
    totalCount: 100,
    showSelectPage: false,
    onPageChange: (pageNumber) => console.log('Page changed to:', pageNumber),
  },
};
export const CustomPageSize: Story = {
  args: {
    pageSize: 25,
  },
};

export const FirstPage: Story = {
  args: {},
};
