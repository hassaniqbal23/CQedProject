import { startConversation } from '@/app/api/chat';
import { useGlobalState } from '@/app/gobalContext/globalContext';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { SquarePen } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import * as z from 'zod';

export interface ICreateChatModalProps {
  onChatCreated?: (conversationId: number) => void;
}

const formSchema = z.object({
  toId: z
    .number({
      message: 'Please select a user to send a message to',
    })
    .int(),
  message: z.string({
    message: 'Please enter a message',
  }),
});

const CreateChatModal = (props: ICreateChatModalProps) => {
  const queryClient = useQueryClient();
  const { myPenpals, userInformation } = useGlobalState();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const { mutate: sendMessage, isLoading: isSendingMessage } = useMutation(
    (formValues: { toId: number; message: string }) =>
      startConversation(formValues.toId, formValues.message),
    {
      onSuccess: (res) => {
        queryClient.refetchQueries('get-all-conversations');
        if (props.onChatCreated) {
          props.onChatCreated(res.data.data.id);
        }
        form.setValue('message', '');
        setOpen(false);
      },
      onError: (error: any) => {},
    }
  );

  const onSubmit = form.handleSubmit((values) => {
    sendMessage(values);
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
              name="toId"
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
                      options={
                        myPenpals?.map((penpal: any) => ({
                          label: penpal.friend?.profile[0]?.fullname,
                          image: penpal.friend?.attachment?.file_path,
                          value: penpal?.friend?.id,
                        })) || []
                      }
                      formatOptionLabel={(option: any) => {
                        return (
                          <div className="flex items-center gap-[3px] ">
                            <Avatar className="items-center">
                              <AvatarImage
                                src={option?.image}
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
                      onChange={(value: any) => {
                        form.setValue('toId', value.value);
                        form.clearErrors('toId');
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
              loading={isSendingMessage}
            >
              Send Message
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateChatModal;
