import Modal from '@/components/common/Modal/Modal';
import { Typography } from '@/components/common/Typography/Typography';
import {
  Avatar,
  AvatarImage,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  Textarea,
} from '@/components/ui';
import { SelectV2 } from '@/components/ui/select-v2/select-v2';
import { SquarePen } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface CreateChatModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateChatModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm({
    defaultValues: {
      userId: '',
      message: '',
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    // const submit = {
    //   code: token || '',
    //   ...values,
    // };
    // mutate(submit);
  });

  return (
    <Modal
      isVisible={open}
      className="!w-[530px]"
      onOpenChange={() => setOpen(!open)}
      isSeperator={false}
      openModalButton={
        <div className="cursor-pointer">
          <SquarePen className="items-center mt-2 ml-1.5" />
        </div>
      }
      header={
        <>
          <Typography variant="h3" weight="semibold" className="text-center">
            New Message
          </Typography>
        </>
      }
      footer={false}
      onOkClick={() => console.log('ok')}
    >
      <div>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem className="mb-7">
                  <FormLabel>To:</FormLabel>
                  <FormControl>
                    {/* <Select
                      options={}
                      className="font-semibold"
                      onValueChange={(value) => {
                        form.setValue('userId', value);
                      }}
                    /> */}
                    <SelectV2
                      options={[
                        { label: 'Option 1', value: '1' },
                        { label: 'Option 2', value: '2' },
                        { label: 'Option 3', value: '3' },
                      ]}
                      formatOptionLabel={(option: any) => {
                        return (
                          <div className="flex items-center gap-[3px] ">
                            <Avatar className="items-center">
                              <AvatarImage
                                src="/avatar1.svg"
                                className="w-8 h-8"
                              />
                            </Avatar>
                            <Typography
                              variant="h5"
                              weight="medium"
                              className="mr-2"
                            >
                              {option?.label}
                            </Typography>
                          </div>
                        );
                      }}
                      className="font-semibold"
                      classNamePrefix={'select'}
                      value={form.getValues('userId')}
                      onChange={(value: any) => {
                        form.setValue('userId', value);
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="mb-7">
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type your message here..."
                      {...field}
                      className="font-semibold"
                      rows={6}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant={'default'}
              className="w-full mt-4"
              //   loading={isLoading}
              //   disabled={isLoading}
            >
              Continue
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateChatModal;
