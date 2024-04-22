import type { Meta, StoryObj } from '@storybook/react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu/dropdown-menu';
import { Button } from '@/components/ui/button/button';

import { ChevronDown } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar/avatar';
import { Separator } from '../separator/separator';

interface DropdownMenuStoryArgs {
  heading: string;
  title: string;
}

const meta = {
  title: 'Example/DropdownMenuCheckboxes',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render({ heading, title }: any) {
    return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="w-72 text-[#5D5E68] font-medium"
          >
            <Button variant="outline" className="flex justify-between">
              <div>Select your country {heading}</div>
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-72">
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem className="p-0 m-0 pl-4 mb-2 text-[#5D5E68] font-medium">
              <Avatar className="w-[22px] h-[22px] mr-4">
                <AvatarImage src={'/countries/pakistan.svg'} />
              </Avatar>
              Pakistan{title}
            </DropdownMenuCheckboxItem>
            <Separator className="my-2" />
            <DropdownMenuCheckboxItem className="p-0 m-0 pl-4 mb-2 text-[#5D5E68] font-medium">
              <Avatar className="w-[22px] h-[22px] mr-4">
                <AvatarImage src={'/countries/india.svg'} />
              </Avatar>
              India{title}
            </DropdownMenuCheckboxItem>
            <Separator className="my-2" />
            <DropdownMenuCheckboxItem className="p-0 m-0 pl-4 mb-2 text-[#5D5E68] font-medium">
              <Avatar className="w-[22px] h-[22px] mr-4">
                <AvatarImage src={'/countries/uk.svg'} />
              </Avatar>
              United Kingdom{title}
            </DropdownMenuCheckboxItem>
            <Separator className="my-2" />
            <DropdownMenuCheckboxItem className="p-0 m-0 pl-4 text-[#5D5E68] font-medium">
              <Avatar className="w-[22px] h-[22px] mr-4">
                <AvatarImage src={'/countries/saudiaarabia.svg'} />
              </Avatar>
              Saudi Arabia{title}
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem>{title}</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};
