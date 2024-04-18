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
  columns: { heading: string; dataKey: string }[];
  data: any[];
  actions?: (data: any) => React.ReactNode;
  tableCell?: {
    columnIndex: number;
    element: (tableData: any) => React.ReactNode;
  };
}

const DataTable = (props: DataTableProps) => {
  return (
    <Table className=" w-[1117px] border">
      <TableHeader className="text-center">
        <TableRow className="bg-[#E0E0E0] ">
          <TableHead>
            <Checkbox id="terms" />
          </TableHead>
          {props.columns.map((c, i) => (
            <TableHead className="text-blue-950 text-[13px] font-semibold text-left dark:text-white rounded-t-sm ">
              {c.heading}
            </TableHead>
          ))}
          {props.actions ? (
            <TableHead className="text-blue-950 text-[13px] font-semibold text-left dark:text-white rounded-t-sm ">
              Action
            </TableHead>
          ) : (
            ''
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data.map((item, index: number) => (
          <TableRow>
            <TableCell
              className=" text-[#282931] text-[13px] font-normal dark:text-white flex justify-center "
              key={index}
            >
              <Checkbox id="terms" className="bg-[#E0E0E0]" />
            </TableCell>
            {props.columns.map((c, i) => (
              <>
                <TableCell
                  className="text-[#282931]  text-[13px] font-normal dark:text-white "
                  key={index}
                >
                  <div className="flex justify-start gap-2 items-center ">
                    {props.tableCell && props.tableCell.columnIndex === i ? (
                      props.tableCell.element(item)
                    ) : (
                      <>{item[c.dataKey]}</>
                    )}
                  </div>
                </TableCell>
              </>
            ))}
            {props.actions ? props.actions(item) : ''}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;
