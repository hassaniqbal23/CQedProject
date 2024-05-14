import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';
import React from 'react';

interface DeleteDialogProps {
  title?: string;
  ButtonTrigger?: React.ReactNode;
  description?: string;
  ButtonAction?: string;
  ButtonCancel?: string;
  open?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onClickOk?: () => void;
  okLoading?: boolean;
}

export const DeleteClassDialog = ({
  title,
  description,
  ButtonTrigger,
  ButtonAction,
  ButtonCancel,
  onClickOk,
  open,
  onOpen,
  onClose,
  okLoading
}: DeleteDialogProps) => {
  return (
    <>
      <Dialog open={open} onOpenChange={(e) => {
        if (e) {
          onOpen && onOpen();
        } else {
          onClose && onClose();
        }
      }} >
        <DialogTrigger asChild>
          {ButtonTrigger && <Button variant="outline">{ButtonTrigger}</Button>}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <div className="mb-3 text-2xl ">{title}</div>
            </DialogTitle>
            <DialogDescription>
              <div className="text-black mb-4 w-full text-base">
                {description}
              </div>
            </DialogDescription>
          </DialogHeader>
          <div>
            <Button variant={'destructive'} loading={okLoading} onClick={() => onClickOk && onClickOk()} className="w-full rounded-lg">
              {ButtonAction}
            </Button>
            <Button className="w-full text-[#4146B8] bg-white ">
              {ButtonCancel}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
