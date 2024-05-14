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

const formSchema = z.object({
  name: z.string().min(5, {
    message: 'Please enter subject name and must be more than 5 characters',
  }),
});

interface CreateSubjectModalProps {
  Title?: string;
  trigger: React.ReactNode;
  Description?: string;
  ButtonAction?: string;
  ButtonCancel?: string;
  onClick?: () => void;
  loading?: boolean;
  onSubmit?: (values: z.infer<typeof formSchema>) => void;
}

export const CreateSubjectModal = ({
  Title,
  trigger,
  ButtonAction,
  loading,
  onSubmit: propsOnSubmit,
}: CreateSubjectModalProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    if (propsOnSubmit) {
      propsOnSubmit(values);
    }
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
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
                      name="name"
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
                  <Button
                    type="submit"
                    className="w-full rounded-md"
                    loading={loading}
                    disabled={loading}
                  >
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
