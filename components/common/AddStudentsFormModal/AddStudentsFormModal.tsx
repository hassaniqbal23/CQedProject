// components/AddStudentsFormModal.tsx
'use client';
import {
  Dropdown,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
  Textarea,
  Label,
} from '@/components/ui';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog/dialog';

import * as z from 'zod';
import { Input } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button/button';
import ChipSelector from '@/components/ui/ChipSelect/ChipSelector';

interface AddStudentModalProps {
  Title?: string;
  ButtonTrigger: string;
  DropDownTitle?: string;
  DropDownItem?: string;
  ButtonAction?: string;
  ButtonCancel?: string;
}

const formSchema = z.object({
  fullname: z.string().min(2, {
    message: 'Fullname must be at least 4 characters.',
  }),
  emailaddress: z
    .string()
    .email()
    .refine((value) => value.trim() !== '', {
      message: 'Please enter your email address.',
    }),
  class: z.string().refine((value) => value.trim() !== '', {
    message: 'Please select your Class.',
  }),
  gender: z.string().refine((value) => value.trim() !== '', {
    message: ' Please select your Gender.',
  }),
  username: z.string().refine((value) => value.trim() !== '', {
    message: ' Please enter your username.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
});

export const AddStudentModal = ({
  Title,
  ButtonTrigger,
  DropDownTitle,
  ButtonAction,
}: AddStudentModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      emailaddress: '',
      class: '',
      gender: '',
      username: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{ButtonTrigger}</Button>
      </DialogTrigger>
      <DialogContent className="w-2/4">
        <DialogHeader>
          <DialogTitle className="text-2xl mb-2">{Title}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 md:gap-6">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FullName</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g example@12" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailaddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g example@12" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <FormControl>
                      <Input placeholder="Select Class" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g example@12" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <h1 className=" font-semibold text-xl">Create Creditials</h1>
            <div className="grid md:grid-cols-2 md:gap-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Create Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Create Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter user password"
                        type="password"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div></div>
            </div>
            <Button type="submit" className="float-right ">
              {ButtonAction}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
