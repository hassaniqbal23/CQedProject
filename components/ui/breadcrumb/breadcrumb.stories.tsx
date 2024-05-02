import type { Meta, StoryObj } from '@storybook/react';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Slash, ChevronDown, Link } from 'lucide-react';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Ui/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

// Breadcrumb items with dynamic labels and links
const breadcrumbItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Components',
    href: '/components',
  },
  {
    label: 'Breadcrumb',
  },
];

export const Default: Story = {
  args: {
    children: (
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.href ? (
              <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
        <BreadcrumbSeparator />
      </BreadcrumbList>
    ),
  },
};
