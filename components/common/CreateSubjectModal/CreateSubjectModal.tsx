import { Button } from '@/components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog/dialog';

import * as z from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui';

import { Input } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';

interface CreateSubjectDialogProps {
  Title?: string;
  ButtonTrigger: string;
  Description?: string;
  ButtonAction?: string;
  ButtonCancel?: string;
  onClick?: () => void;
}

const formSchema = z.object({
  subject: z.string().min(2, {
    message: 'Please select your subject.',
  }),
});

export const CreateSubjectDialog = ({
  Title,
  Description,
  ButtonTrigger,
  ButtonAction,
  ButtonCancel,
  onClick,
}: CreateSubjectDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
          <Button variant="primary400">
            <Plus size={20}></Plus>
            {ButtonTrigger}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{Title}</DialogTitle>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-8">
                <div className="flex flex-col w-92">
                  <div className="">
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">
                            Subject name{' '}
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="History" {...field} />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <Button type="submit" className="w-full rounded-md">
                    {ButtonAction}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
