'use client';

import { forwardRef } from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

import { cn } from '@/lib/utils';
import { Separator } from '../separator/separator';
import Image from 'next/image';
import React from 'react';

const ScrollArea = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn('relative overflow-hidden', className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
));
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' &&
        'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' &&
        'h-2.5 border-t border-t-transparent p-[1px]',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

interface IScrollAreaVerticalItems {
  title: string;
  description: string;
  className: string;
}

interface IScrollAreaHorizontalItems {
  caption?: string;
  title?: string;
  className?: string;
  imgPath?: any;
}

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'vertical' | 'horizontal';
  verticalItems?: IScrollAreaVerticalItems[];
  horizontalItems?: IScrollAreaHorizontalItems[];
}

export function ScrollAreaDemo({
  children,
  className,
  variant = 'vertical',
  verticalItems,
  horizontalItems,
}: ScrollAreaProps) {
  const classes = `h-72 w-48 rounded-md border ${className}`;

  return (
    <div className={classes}>
      {variant === 'vertical' && verticalItems && (
        <ScrollArea className="h-72 w-48 rounded-md border">
          <div className="p-4">
            <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
            {verticalItems.map((tag, index) => (
              <React.Fragment key={index}>
                <div className="text-sm">{tag.title}</div>
                {index !== verticalItems.length - 1 && (
                  <Separator className="my-2" />
                )}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      )}
      {variant === 'horizontal' && horizontalItems && (
        <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            {horizontalItems.map((item: IScrollAreaHorizontalItems) => (
              <figure key={item.title} className="shrink-0">
                <div className="overflow-hidden rounded-md">
                  <Image
                    src={item.imgPath}
                    alt={`Photo by ${item.title}`}
                    className="aspect-[3/4] h-fit w-fit object-cover"
                    width={300}
                    height={400}
                  />
                </div>
                <figcaption className="pt-2 text-xs text-muted-foreground">
                  {item.caption}
                  <span className="font-semibold text-foreground">
                    {item.title}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
}

// interface IScrollAreaVerticalItems {
//   title: string;
//   description: string;
//   className: string;
// }

// interface ScrollAreaVerticalProps {
//   ScrollAreaVerticalItems: IScrollAreaVerticalItems[];
// }

// export const ScrollAreaVertical = ({
//   ScrollAreaVerticalItems,
// }: ScrollAreaVerticalProps) => {
//   return (
//     <ScrollArea className="h-72 w-48 rounded-md border">
//       <h4 className="mb-4 text-sm font-medium leading-none"></h4>
//       {ScrollAreaVerticalItems.map((item, index) => (
//         <React.Fragment key={index}>
//           <div className="text-sm">{item.title}</div>
//           {index !== ScrollAreaVerticalItems.length - 1 && (
//             <Separator className="my-2" />
//           )}
//         </React.Fragment>
//       ))}
//     </ScrollArea>
//   );
// };

// interface IScrollAreaHorizontalItems {
//   caption?: string;
//   title?: string;
//   className?: string;
//   imgPath?: any;
// }

// interface ScrollAreaHorizontalProps {
//   ScrollAreaHorizontalItems: IScrollAreaHorizontalItems[];
// }

// export const ScrollAreaHorizontal = ({
//   ScrollAreaHorizontalItems,
// }: ScrollAreaHorizontalProps) => {
//   return (
//     <>
//       <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
//         <div className="flex w-max space-x-4 p-4">
//           {ScrollAreaHorizontalItems.map((item: IScrollAreaHorizontalItems) => (
//             <figure key={item.title} className="shrink-0">
//               <div className="overflow-hidden rounded-md">
//                 <Image
//                   src={item.imgPath}
//                   alt={`Photo by ${item.title}`}
//                   className="aspect-[3/4] h-fit w-fit object-cover"
//                   width={300}
//                   height={400}
//                 />
//               </div>
//               <figcaption className="pt-2 text-xs text-muted-foreground">
//                 {item.caption}
//                 <span className="font-semibold text-foreground">
//                   {item.title}
//                 </span>
//               </figcaption>
//             </figure>
//           ))}
//         </div>
//         <ScrollBar orientation="horizontal" />
//       </ScrollArea>
//     </>
//   );
// };

export { ScrollArea, ScrollBar };
