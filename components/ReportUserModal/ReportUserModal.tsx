import { Button } from '@/components/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogPrimitive,
} from '@/components/ui/dialog/dialog';
import { CircleAlert } from 'lucide-react';
import React from 'react';

interface ReportUserDialogProps {
  title?: string;
  buttonTrigger: React.ReactNode;
  description?: string;
  buttonOKLabel?: string;
  buttonCancelLabel?: string;
}

export const ReportUserDialog = ({
  title,
  description,
  buttonTrigger,
  buttonOKLabel,
  buttonCancelLabel,
}: ReportUserDialogProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{buttonTrigger}</DialogTrigger>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <div className="bg-[#FEF3F2] w-16 p-3 rounded-full mb-1">
              <div className="bg-[#FEE4E2] w-10 p-2 rounded-full">
                <CircleAlert
                  color="red"
                  className="bg-[#FEE4E2] rounded-full"
                />
              </div>
            </div>
            <DialogTitle>
              <div className="mb-1 text-xl ">{title}</div>
            </DialogTitle>
            <DialogDescription>
              <div className="text-[#5D5E68] mb-2 w-full text-base">
                {description}
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex">
            <DialogPrimitive.Close className="w-full ">
              <Button className="w-full text-black bg-white border-black ">
                {buttonCancelLabel}
              </Button>
            </DialogPrimitive.Close>

            <Button variant={'destructive'} className="w-full rounded-full">
              {buttonOKLabel}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
