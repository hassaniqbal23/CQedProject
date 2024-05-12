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

interface ReportUserDialogProps {
  Title?: string;
  ButtonTrigger: string;
  Description?: string;
  ButtonAction?: string;
  ButtonCancel?: string;
}

export const ReportUserDialog = ({
  Title,
  Description,
  ButtonTrigger,
  ButtonAction,
  ButtonCancel,
}: ReportUserDialogProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{ButtonTrigger}</Button>
        </DialogTrigger>
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
              <div className="mb-1 text-xl ">{Title}</div>
            </DialogTitle>
            <DialogDescription>
              <div className="text-[#5D5E68] mb-2 w-full text-base">
                {Description}
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex">
            <DialogPrimitive.Close className="w-full ">
              <Button className="w-full text-black bg-white border-black ">
                {ButtonCancel}
              </Button>
            </DialogPrimitive.Close>

            <Button variant={'destructive'} className="w-full rounded-full">
              {ButtonAction}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
