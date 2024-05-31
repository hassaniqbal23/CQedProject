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
} from '@/components/ui';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';

const formSchema = z.object({
  story: z
    .string({
      message: 'Story is required',
    })
    .min(25, {
      message: 'Story should be at least 25 characters',
    }),
});

export interface PublishStoryDialogProps {
  onPublish: (story: string) => void;
  loading?: boolean;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: () => void;
  onClose?: () => void;
}

export const PublishStoryDialog: React.FC<PublishStoryDialogProps> = ({
  onPublish,
  children,
  loading,
  open,
  onOpenChange,
  onClose,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      story: '',
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  const onSubmit = form.handleSubmit((values) => {
    onPublish(values.story);
  });

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="max-w-[500px]">
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex justify-between items-center">
                Write about yourself
                <X className="cursor-pointer" onClick={onClose} />
              </AlertDialogTitle>
            </AlertDialogHeader>

            <FormField
              control={form.control}
              name="story"
              render={({ field }) => (
                <>
                  <div className="">
                    <Textarea
                      placeholder="Tell us about yourself, What makes you smile?"
                      rows={9}
                      {...field}
                    ></Textarea>
                  </div>
                  <FormMessage className="mt-2" />
                </>
              )}
            />
            <AlertDialogFooter className="gap-4">
              <Button loading={loading} type="submit">
                Publish
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
