'use client';
import React, { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button, Skeleton } from '@/components/ui';
import { Typography } from '@/components/common/Typography/Typography';

const Table = forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={cn('w-full text-sm', className)} {...props} />
  </div>
));
Table.displayName = 'Table';

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('bg-[#F7F6F6] text-left', className)}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('', className)} {...props} />
));
TableBody.displayName = 'TableBody';

const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn('bg-white dark:bg-gray-800 mb-4', className)}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

const TableHead = forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-12 px-4 text-left align-middle font-medium text-gray-600 dark:text-gray-400',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn('p-4 align-middle', className)} {...props} />
));
TableCell.displayName = 'TableCell';

const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-gray-500 dark:text-gray-400', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

interface DataTableProps {
  columns: {
    label: string;
    key: string;
    render?: (data: any) => React.ReactNode;
  }[];
  data: any[];
  selection?: boolean;
  noDataMessage?: string;
  loading?: boolean;
}

const DasboardDataTable = (props: DataTableProps) => {
  return (
    <Table className="border-none">
      <TableHeader>
        <TableRow>
          {props.columns.map((c, i) => (
            <TableHead
              key={i}
              className={cn(
                'text-blue-950 text-[15px] font-semibold dark:text-white bg-[#ECEDF8]',
                {
                  'rounded-l-lg': i === 0, // Apply to the first header cell
                  'rounded-r-lg': i === props.columns.length - 1, // Apply to the last header cell
                }
              )}
            >
              {c.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.loading ? (
          <>
            {props.columns.map((item, index) => {
              let currentColumns = Array.from(
                { length: props.columns.length },
                (_, index) => index + 1
              );
              props.selection && currentColumns.push(props.columns.length + 1);
              return (
                <TableRow key={index}>
                  {currentColumns.map((_, subindex) => (
                    <TableCell key={subindex}>
                      <Skeleton className="w-full h-10 bg-accent" />
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </>
        ) : (
          <>
            {props.data.map((item, index: number) => (
              <TableRow key={index}>
                {props.columns.map((c, i) => (
                  <TableCell
                    className="text-[#282931] text-[13px] font-normal dark:text-white"
                    key={`${index}-${i}`}
                  >
                    <div className="">
                      {c.render ? c.render(item) : item[c.key]}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
            {props.data.length === 0 && (
              <TableRow className="">
                <TableCell colSpan={99} className={'text-center'}>
                  <div className="flex flex-col items-center justify-center py-20">
                    <Image
                      src="/Videoconference.svg"
                      alt="icon"
                      width={50}
                      height={50}
                      className="bg-[#ECEDF8] p-3 rounded-lg mb-2"
                    />
                    <Typography
                      variant={'body'}
                      weight={'semibold'}
                      className="text-[#394245]"
                    >
                      Your classroom in CQED
                    </Typography>
                    <Button className="mt-4 px-4 py-2 bg-white text-primary-500 border-primary-500rounded">
                      Create your class
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </>
        )}
      </TableBody>
    </Table>
  );
};

export default DasboardDataTable;
