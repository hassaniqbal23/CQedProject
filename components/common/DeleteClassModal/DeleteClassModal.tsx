import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';

interface DeleteDialogProps {
  Title?: string;
  ButtonTrigger: string;
  Description?: string;
  ButtonAction?: string;
  ButtonCancel?: string;
}

export const DeleteClassDialog = ({
  Title,
  Description,
  ButtonTrigger,
  ButtonAction,
  ButtonCancel,
}: DeleteDialogProps) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{ButtonTrigger}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <div className="mb-3 text-2xl ">{Title}</div>
            </DialogTitle>
            <DialogDescription>
              <div className="text-black mb-4 w-full text-base">
                {Description}
              </div>
            </DialogDescription>
          </DialogHeader>
          <div>
            <Button variant={'destructive'} className="w-full rounded-lg">
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
