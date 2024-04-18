'use client';
import React, { forwardRef } from 'react';

import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui';
import Image from 'next/image';
import { IoEllipsisVertical } from 'react-icons/io5';
import { Loader2 } from 'lucide-react';

const Table = forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table
      ref={ref}
      className={cn('w-full caption-bottom text-sm', className)}
      {...props}
    />
  </div>
));
Table.displayName = 'Table';

const TableHeader = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

const TableFooter = forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('bg-primary font-medium text-primary-foreground', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
      className
    )}
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
      'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
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
  <td
    ref={ref}
    className={cn('p-4 align-middle [&:has([role=checkbox])]:pr-0', className)}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-muted-foreground', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

interface DataTableProps {
  columns: {
      label: string;
      key: string,
      render?: (data: any) => React.ReactNode;
  }[];
  data: any[];
  selection?: boolean;
}

const DataTable = (props: DataTableProps) => {
  return (
    <Table className=" w-[1117px] border">
      <TableHeader className="text-center">
        <TableRow className="bg-[#E0E0E0] ">
            {props.selection ? <TableHead>
                <Checkbox id="checkbox" />
            </TableHead> : null}
          {props.columns.map((c, i) => (
            <TableHead key={i} className="text-blue-950 text-[13px] font-semibold text-left dark:text-white">
              {c.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data.map((item, index: number) => (
          <TableRow key={index} >
              {
                  props.selection ? <TableCell
                      className=" text-[#282931] text-[13px] font-normal dark:text-white flex justify-center "
                      key={index}
                  >
                      <Checkbox id="terms" className="bg-[#E0E0E0]" />
                  </TableCell> : <></>
              }
            {props.columns.map((c, i) => (
              <>
                <TableCell
                  className="text-[#282931]  text-[13px] font-normal dark:text-white "
                  key={index}
                >
                  <div className="flex justify-start gap-2 items-center ">
                    {  c.render ? c.render(item)  : item[c.key]   }
                  </div>
                </TableCell>
              </>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
