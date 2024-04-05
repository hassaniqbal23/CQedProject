import React from 'react';
import { Button } from './ui/button';
import { BsFileEarmarkPdf } from 'react-icons/bs';
import { cn } from '@/lib/utils';

interface PDFExportProps {
  variant?:
    | 'default'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'destructive'
    | 'outline';
  className?: string;
  disable?: boolean;
}

const PdfExport: React.FC<PDFExportProps> = ({
  variant,
  className,
  disable,
}) => {
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
          <span>
            <BsFileEarmarkPdf className="text-foreground text-base mr-1 group-hover/item:text-white" />{' '}
            Download PDF
          </span>
        </Button>
      ) : (
        <Button
          asChild
          variant={variant ? variant : 'secondary'}
          className={cn('cursor-not-allowed', className)}
          disabled={disable}
        >
          <span>
            <BsFileEarmarkPdf className="text-foreground text-base mr-1 group-hover/item:text-white" />{' '}
            Download PDF
          </span>
        </Button>
      )}
    </>
  );
};

export default PdfExport;
