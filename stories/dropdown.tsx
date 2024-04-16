'use client';

import * as React from 'react';
import { DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';

import { Button } from '@/components/ui/button/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu/dropdown-menu';
import { Avatar } from '@/components/ui/avatar/avatar';
import { ChevronDown } from 'lucide-react';

export interface dropdownProps {
  title: string;
  heading: string;
  imageSrc?: string;
  action?: () => void;
}

type Checked = DropdownMenuCheckboxItemProps['checked'];

export function DropdownMenuCheckboxes({ title, heading }: dropdownProps) {
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  const [showPanel, setShowPanel] = React.useState<Checked>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {heading} <ChevronDown />{' '}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{heading}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          {title}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          {title}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          {title}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
