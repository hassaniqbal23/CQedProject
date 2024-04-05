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
import Image from 'next/image';
import { Button } from '../ui/button';

interface AlertDelete {
  handleDelete: (id: any) => void;
  subTitle: string;
  title: string;
}
export const MultipleDeleteDialog: FC<AlertDelete> = ({
  handleDelete,
  subTitle,
  title,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          className="text-red-500 bg-red-500/20 hover:bg-red-500/30"
        >
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="justify-center py-6 px-0 mx-0 !max-w-[26rem]">
        <AlertDialogHeader className="items-center">
          <AlertDialogTitle>Are you sure want to</AlertDialogTitle>
          <AlertDialogTitle>delete selected {title}</AlertDialogTitle>
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
            onClick={handleDelete}
            className="
            text-[13px] sm:text-[13px] md:text-[13px] lg:text-[13px] xl:text-[13px] 
            hover:bg-[#c00e46] bg-[#E01E5A] truncate font-medium"
          >
            Yes Delete the {subTitle}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
