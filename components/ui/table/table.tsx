'use client';
import React, { forwardRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui';
import Loading from '../button/loading';

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
    key: string;
    render?: (data: any) => React.ReactNode;
  }[];
  data: any[];
  selection?: boolean;
  noDataMessage?: string;
  loading?: boolean;
}

const DataTable = (props: DataTableProps) => {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleHeaderCheckboxChange = () => {
    if (selectedItems.length === props.data.length) {
      // If all items are selected, unselect all
      setSelectedItems([]);
    } else {
      // Otherwise, select all items
      setSelectedItems(props.data.map((_, index) => index));
    }
  };

  const handleCellCheckboxChange = (index: number) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(index)) {
        // If the item is already selected, remove it from the selection
        return prevSelectedItems.filter((itemIndex) => itemIndex !== index);
      } else {
        // Otherwise, add it to the selection
        return [...prevSelectedItems, index];
      }
    });
  };

  return (
    <Table className=" border ">
      <TableHeader className="bg-[#F7F6F6] dark:bg-primary/[0.1]">
        <TableRow>
          {props.selection ? (
            <TableHead colSpan={1} >
              <Checkbox
                id="checkbox-header"
                onCheckedChange={handleHeaderCheckboxChange}
                checked={
                  !props.loading && selectedItems.length === props.data.length
                }
              />
            </TableHead>
          ) : null}
          {props.columns.map((c, i) => (
            <TableHead
              key={i}
              className="text-blue-950 text-[13px] font-semibold  dark:text-white "
            >
              {c.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.loading ? (
          <TableRow>
            <TableCell
              colSpan={props.columns.length + 1}
              className="w-full h-24"
            >
              <div className="w-full flex justify-center">
                <Loading />
              </div>
            </TableCell>
          </TableRow>
        ) : (
          <>
            {props.data.map((item, index: number) => (
              <TableRow key={index}>
                {props.selection && (
                  <TableCell
                    className="text-[#282931] text-[13px] font-normal dark:text-white"
                    key={index}
                    colSpan={1}
                  >
                    <Checkbox
                      id={`checkbox-${index}`}
                      onCheckedChange={() => handleCellCheckboxChange(index)}
                      checked={selectedItems.includes(index)}
                      className="bg-[#E0E0E0]"
                    />
                  </TableCell>
                )}
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
              <TableRow>
                <TableCell colSpan={99} className={'text-center'}>
                  {props.noDataMessage || 'No data'}
                </TableCell>
              </TableRow>
            )}
          </>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
