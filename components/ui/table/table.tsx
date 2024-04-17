import React, {forwardRef} from 'react';

import {cn} from '@/lib/utils';
import {Checkbox} from "@/components/ui";
import Image from "next/image";
import {IoEllipsisVertical} from "react-icons/io5";
import {Loader2} from "lucide-react";

const Table = forwardRef<
    HTMLTableElement,
    React.HTMLAttributes<HTMLTableElement>
>(({className, ...props}, ref) => (
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
>(({className, ...props}, ref) => (
    <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
));
TableHeader.displayName = 'TableHeader';

const TableBody = forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({className, ...props}, ref) => (
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
>(({className, ...props}, ref) => (
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
>(({className, ...props}, ref) => (
    <tr
        ref={ref}
        className={cn(
            'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
            className,
        )}
        {...props}
    />
));
TableRow.displayName = 'TableRow';

const TableHead = forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
    <th
        ref={ref}
        className={cn(
            'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
            className,
        )}
        {...props}
    />
));
TableHead.displayName = 'TableHead';

const TableCell = forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({className, ...props}, ref) => (
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
>(({className, ...props}, ref) => (
    <caption
        ref={ref}
        className={cn('mt-4 text-sm text-muted-foreground', className)}
        {...props}
    />
));
TableCaption.displayName = 'TableCaption';


interface DataTableProps {
    columns: string[];
    data: any[];
}

const DataTable = (props: DataTableProps) => {
    return <Table className=" w-[1117px] border">
        <TableHeader className="text-center">
            <TableRow className="bg-[#E0E0E0] ">
                <TableHead>
                    <Checkbox id="terms"/>
                </TableHead>
                <TableHead className="text-blue-950 text-[13px] font-semibold text-left dark:text-white rounded-t-sm">
                    School Name
                </TableHead>
                <TableHead className="text-blue-950 text-[13px] font-semibold dark:text-white">
                    Country
                </TableHead>
                <TableHead className="text-blue-950 text-[13px] font-semibold dark:text-white">
                    Email Address
                </TableHead>
                <TableHead className="text-blue-950 text-[13px] font-semibold dark:text-white ">
                    No of Teachers
                </TableHead>
                <TableHead className="text-blue-950 text-[13px] font-semibold dark:text-white rounded-t-sm">
                    Action
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                props.data.map((schools, index: number) => (
                    <TableRow key={index}>
                        <TableCell className="text-[#282931] text-[13px] font-normal dark:text-white">
                            <Checkbox id="terms" className="bg-[#E0E0E0]"/>
                        </TableCell>
                        <TableCell className="text-[#282931]  text-[13px] font-normal dark:text-white">
                            <div className="flex justify-start gap-2 items-center">
                                <Image
                                    src={schools.ImagePath}
                                    alt={schools.ImagePath}
                                    width={30}
                                    height={30}
                                />
                                {schools?.schoolName}
                            </div>
                        </TableCell>
                        <TableCell className="text-[#282931] text-[13px] font-normal dark:text-white">
                            {schools?.schoolCountry}
                        </TableCell>
                        <TableCell className="text-[#282931]">
                            {schools.schoolEmail}
                        </TableCell>
                        <TableCell className="text-[#282931] text-center">
                            {schools.numberOfTeachers}
                        </TableCell>
                        <TableCell className="text-[#282931]  dark:text-white">
                            <div className="flex flex-start  rounded-full">
                                <IoEllipsisVertical className="cursor-pointer  "/>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
        </TableBody>
    </Table>

}

export {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
    DataTable
};
