'use client';

import { forwardRef } from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

import { cn } from '@/lib/utils';
import { Button } from '../button/button';
import { Avatar, AvatarFallback, AvatarImage } from '../avatar/avatar';
import { CalendarDays } from 'lucide-react';

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      'z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
      className
    )}
    {...props}
  />
));
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

interface HoverCardDemoProps {
  avatarSrc?: string; // Optional avatar image source
  avatarFallback?: string; // Optional fallback text for avatar
  username?: string;
  description?: string;
  joinedDate?: Date; // Optional joined date
}

export function HoverCardDemo({
  avatarSrc,
  avatarFallback,
  username,
  description,
  joinedDate,
}: HoverCardDemoProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">{username}</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            {avatarSrc && <AvatarImage src={avatarSrc} />}
            {!avatarSrc && <AvatarFallback>{avatarFallback}</AvatarFallback>}
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{username}</h4>
            <p className="text-sm">{description}</p>
            {joinedDate && (
              <div className="flex items-center pt-2">
                <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{' '}
                <span className="text-xs text-muted-foreground">
                  Joined {joinedDate.toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
