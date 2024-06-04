import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';
import { on } from 'events';
import React, { useState } from 'react';

interface DeleteDialogProps {
  title?: string;
  ButtonTrigger?: React.ReactNode;
  description?: string;
  ButtonAction?: string;
  ButtonCancel?: string;
  open?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  onClickOk?: (reportText?: string) => void;
  okLoading?: boolean;
  showTextarea?: boolean;
}

export const ReportClassDialog = ({
  title,
  description,
  ButtonTrigger,
  ButtonAction,
  ButtonCancel,
  onClickOk,
  open,
  onOpen,
  onClose,
  okLoading,
}: DeleteDialogProps) => {
  const [reportText, setReportText] = useState('');

  const handleClickOk = () => {
    onClickOk && onClickOk(reportText);
    setReportText('');
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(e) => {
          if (e) {
            onOpen && onOpen();
          } else {
            onClose && onClose();
          }
        }}
      >
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
          <textarea
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
            rows={4}
            placeholder="Please provide details for reporting"
          />
          <div>
            <Button
              variant={'primary400'}
              loading={okLoading}
              onClick={handleClickOk}
              className="w-full rounded-lg"
            >
              {ButtonAction}
            </Button>
            <Button
              onClick={() => onClose && onClose()}
              className="w-full text-primary-500 bg-white "
            >
              {ButtonCancel}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
