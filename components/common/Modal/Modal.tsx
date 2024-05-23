import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator,
} from '@/components/ui';
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  openModalButton?: string | React.ReactNode;
  header?: boolean | React.ReactNode;
  footer?: boolean | React.ReactNode;
  isVisible?: boolean;
  headerTitle?: string;
  headerDescription?: string;
  onOkClick?: () => void;
  showFooterCloseButton?: boolean;
  footerOkButton?: React.ReactNode | string;
  onOpenChange?: () => void;
  isSeperator?: boolean;
}

function Modal({
  children,
  openModalButton,
  header,
  onOkClick,
  footer,
  headerTitle,
  headerDescription,
  showFooterCloseButton = true,
  footerOkButton,
  isVisible,
  onOpenChange,
  isSeperator = true,
}: ModalProps) {
  return (
    <Dialog open={isVisible} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{openModalButton}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {header === true ? (
            <>
              <DialogTitle>{headerTitle}</DialogTitle>
              <DialogDescription>{headerDescription}</DialogDescription>
            </>
          ) : (
            header
          )}
        </DialogHeader>
        {isSeperator && <Separator className="mb-3" />}
        {children}
        {footer === true ? (
          <DialogFooter>
            {showFooterCloseButton && (
              <DialogClose asChild>
                <Button type="button" variant={'ghost'}>
                  Close
                </Button>
              </DialogClose>
            )}
            <DialogClose asChild>
              {typeof footerOkButton === 'string' ? (
                <Button type="button" onClick={onOkClick}>
                  {footerOkButton}
                </Button>
              ) : (
                footerOkButton
              )}
            </DialogClose>
          </DialogFooter>
        ) : (
          footer
        )}
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
