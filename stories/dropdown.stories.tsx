import type { Meta, StoryObj } from '@storybook/react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from '@/components/ui/dropdown-menu/dropdown-menu';
import { Button } from '@/components';
import { ChevronDown } from 'lucide-react';

interface DropdownMenuStoryArgs {
  heading: string;
  title: string;
}

const meta: Meta<DropdownMenuStoryArgs> = {
  title: 'Example/DropdownMenuCheckboxes',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    heading: { control: 'text' },
    title: { control: 'text' },
  },
};

export default meta;

export const Primary: Story<DropdownMenuStoryArgs> = ({ heading, title }) => (
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {heading} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{heading}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem>{title}</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem disabled>{title}</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>{title}</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
);

Primary.args = {
  heading: 'Dropdown Menu',
  title: 'Checkbox Item',
};
