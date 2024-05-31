import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
  Textarea,
  Form,
  FormField,
  FormMessage,
  Avatar,
  AvatarImage,
  Separator,
} from '@/components/ui';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { Typography } from '../Typography/Typography';
import { useGlobalState } from '@/app/gobalContext/globalContext';

const formSchema = z.object({
  story: z
    .string({
      message: 'Story is required',
    })
    .min(25, {
      message: 'Story should be at least 25 characters',
    }),
});

export interface IPublishStoryViewDialogProps {
  loading?: boolean;
  children?: React.ReactNode;
  open: boolean;
  onOpenChange?: () => void;
  onClose?: () => void;
  onAddFriend?: () => void;
  onReply?: () => void;
  initialValue?: string;
  userInfo?: {
    username: string;
    imageUrl: string;
    userId: number;
    location: { flag: string; name: string };
  };
}

export const PublishStoryViewDialog: React.FC<IPublishStoryViewDialogProps> = ({
  children,
  loading,
  open,
  onOpenChange,
  onClose,
  onAddFriend,
  onReply,
  initialValue,
  userInfo,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      story: initialValue,
    },
  });

  useEffect(() => {
    if (initialValue) {
      form.setValue('story', initialValue);
    }
  }, [initialValue]);

  const { userInformation } = useGlobalState();

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-[600px] max-h-[800] p-0">
        <Form {...form}>
          <form className="space-y-4">
            <AlertDialogHeader className="px-6 pb-1 pt-6">
              <AlertDialogTitle className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="w-14 h-14 rounded-full bg-lightgray ">
                    <AvatarImage
                      height={59}
                      width={59}
                      src={userInfo?.imageUrl}
                      alt="Profile Picture"
                    />
                  </Avatar>
                  <div className="ml-3">
                    <Typography variant="h5" weight="semibold">
                      {userInfo?.username}
                    </Typography>
                    <div className="flex items-center">
                      {userInfo?.location?.flag && (
                        <Image
                          className="mr-2"
                          src={userInfo?.location?.flag || ''}
                          height={30}
                          width={30}
                          alt="view-Story"
                        />
                      )}
                      <Typography variant="h5" weight="regular">
                        {userInfo?.location?.name}
                      </Typography>
                    </div>
                  </div>
                </div>

                <X className="cursor-pointer" onClick={onClose} />
              </AlertDialogTitle>
            </AlertDialogHeader>
            <Separator />
            <FormField
              control={form.control}
              name="story"
              render={({ field }) => (
                <>
                  <div className="px-5">
                    <Textarea
                      className="border-0"
                      readOnly
                      placeholder="Tell us about yourself, What makes you smile?"
                      rows={20}
                      {...field}
                    ></Textarea>
                  </div>
                  <FormMessage className="mt-2" />
                </>
              )}
            />
            <AlertDialogFooter className="gap-4 px-5 py-6">
              <div className="flex items-center">
                {userInformation?.id !== userInfo?.userId && (
                  <>
                    <Button
                      className="rounded-full h-12"
                      size={'md'}
                      variant={'info'}
                      loading={loading}
                      onClick={onAddFriend}
                      type="button"
                    >
                      Add Friend
                    </Button>
                    <Button
                      className="ml-5 rounded-full h-12"
                      size={'md'}
                      variant={'outline'}
                      type="button"
                      onClick={onReply}
                    >
                      Reply
                    </Button>
                  </>
                )}
              </div>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
