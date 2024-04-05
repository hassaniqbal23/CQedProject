'use client';
import { FC } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { RiDeleteBinLine } from 'react-icons/ri';
import Image from 'next/image';
interface AlertDelete {
  rowSelectedId: string;
  deleteSelectedItem: (id: any) => void;
  selectedId: string;
  getSelectedItemId: (id: any) => void;
  title: string;
  selectedTitle: string;
}

export const DeleteAlertDialog: FC<AlertDelete> = ({
  rowSelectedId,
  deleteSelectedItem,
  selectedId,
  getSelectedItemId,
  title,
  selectedTitle,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <RiDeleteBinLine
          className="text-3xl mx-3 my-1 cursor-pointer text-[#4A576A] hover:text-[#c00e46]"
          onClick={() => getSelectedItemId(String(selectedId))}
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="justify-center py-6 px-0 mx-0 !max-w-[26rem]">
        <AlertDialogHeader className="items-center">
          <AlertDialogTitle>Are you sure you want to</AlertDialogTitle>
          <AlertDialogTitle>
            Delete this {title} ({selectedTitle})
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogHeader className="items-center">
          <Image
            src="/assets/images/delete.png"
            alt="icon"
            width={291}
            height={185}
          />
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-4">
          <AlertDialogCancel>Cancel this time</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteSelectedItem(rowSelectedId)}
            className="
            text-[13px] sm:text-[13px] md:text-[13px] lg:text-[13px] xl:text-[13px] 
            hover:bg-[#c00e46] bg-[#E01E5A] truncate font-medium"
          >
            Yes Delete the {title}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
