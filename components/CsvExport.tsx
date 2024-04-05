import React from 'react';
import { CSVLink } from 'react-csv';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { BsFiletypeCsv } from 'react-icons/bs';

interface CsvExportProps {
  data: any[];
  variant?:
    | 'default'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'destructive'
    | 'outline';
  className?: string;
  filename?: string;
  disable?: boolean;
}

const CsvExport: React.FC<CsvExportProps> = ({
  data,
  variant,
  className,
  filename,
  disable,
}) => {
  const csvData: any[] = [...data];
  return (
    <>
      {!disable ? (
        <Button
          asChild
          variant={variant ? variant : 'secondary'}
          className={cn(
            'hover:bg-primary hover:text-white group/item',
            className,
          )}
        >
          <CSVLink
            filename={filename ? filename : 'my-file.csv'}
            data={csvData}
          >
            <BsFiletypeCsv className="text-foreground text-base mr-1 group-hover/item:text-white" />{' '}
            Export to CSV
          </CSVLink>
        </Button>
      ) : (
        <Button
          asChild
          variant={variant ? variant : 'secondary'}
          className={cn('cursor-not-allowed', className)}
        >
          <div>
            <BsFiletypeCsv className="text-foreground text-base mr-1 group-hover/item:text-white" />
            Export to CSV
          </div>
        </Button>
      )}
    </>
  );
};

export default CsvExport;
