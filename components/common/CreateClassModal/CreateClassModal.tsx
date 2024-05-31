import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog/dialog';

import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { DropdownMenu, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Label } from '@radix-ui/react-label';
import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react';
import { Input } from '@/components/ui';

interface CreateClassDialogProps {
  Title?: string;
  ButtonTrigger: string;
  Description?: string;
  DropDownTitle?: string;
  DropDownItem?: string;
  ButtonAction?: string;
  ButtonCancel?: string;
}

const formSchema = z.object({
  classgrade: z.string().min(2, {
    message: 'Please select your class.',
  }),
  subject: z.string().min(2, {
    message: 'Please select your subject.',
  }),
});

export const CreateClassDialog = ({
  Title,
  Description,
  ButtonTrigger,
  ButtonAction,
  DropDownTitle,
  DropDownItem,
  ButtonCancel,
}: CreateClassDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      classgrade: '',
      subject: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{ButtonTrigger}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[430px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{Title}</DialogTitle>

            <DialogDescription>{Description}</DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-8">
                <div className="flex flex-col w-92">
                  <div className="mb-4">
                    <FormField
                      control={form.control}
                      name="classgrade"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Class Grade</FormLabel>
                          <FormControl>
                            <Input placeholder="Grade 5th" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="History" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col">
                  <Button type="submit" className="w-full rounded-md">
                    {ButtonAction}
                  </Button>
                  <DialogClose asChild>
                    <Button className="bg-white text-primary-500 ">
                      {ButtonCancel}
                    </Button>
                  </DialogClose>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
